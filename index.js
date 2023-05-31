import createBareServer from '@tomphttp/bare-server-node';
import express from 'express';
import http from 'node:http';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import os from 'os';
import sass from 'sass';
import cluster from 'cluster';
import chalk from 'chalk';
import createLogger from 'progress-estimator';
import { createProxyMiddleware } from 'http-proxy-middleware';
const __dirname = path.resolve();
const settings = YAML.parse(fs.readFileSync(path.join(__dirname, '/config/settings.yml'), 'utf8'));

let rubyPort = process.argv.find((arg) => arg.startsWith('--ruby-port')).split('=')[1] || 9292;
let nodePort = process.argv.find((arg) => arg.startsWith('--node-port')).split('=')[1] || 9293;
const logger = createLogger()
async function compileSCSS() {
    fs.readdirSync(path.join(__dirname, '/src/public/sass')).forEach((file) => {
        if (file.endsWith('.scss')) {
        let test = sass.compile(path.join(__dirname, `/src/public/sass/${file}`));
            fs.writeFileSync(path.join(__dirname, `/src/public/css/${file.replace('.scss', '.css')}`), test.css);
        }
    });
}
await logger(compileSCSS(), 'Compiling SCSS');
const httpServer = http.createServer();
const app = express();

app.use('/', createProxyMiddleware({
    target: `http://localhost:${rubyPort}/`,
    changeOrigin: false,
    logLevel: 'silent',
}));

const bareServer = createBareServer('/bare/');

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		app(req, res);
	}
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
	console.log(chalk.blue(`Server listening on port ${settings.port}, With PID: ${process.pid}`));
});

httpServer.listen({
	port: settings.port,
});

