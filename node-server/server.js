import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyHttpProxy from '@fastify/http-proxy';
import { fileURLToPath } from 'node:url';
import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'http';
import fs from 'fs'
import YAML from 'yaml';
import path from 'path';
const __dirname = path.resolve();
const settings = YAML.parse(fs.readFileSync(path.join(__dirname, '/config/settings.yml'), 'utf8'));
import chalk from 'chalk';
import compile from './compile.js';
let rubyPort = process.argv.find((arg) => arg.startsWith('--ruby-port')).split('=')[1] || 9292;
let nodePort = process.argv.find((arg) => arg.startsWith('--node-port')).split('=')[1] || 9293;

const bareServer = createBareServer('/bare/');
console.log(chalk.red('Compiling...'))
compile();

const bareHandler = (handler, opts) => {
    return createServer().on('request', (req, res) => {
        bareServer.shouldRoute(req) ? bareServer.routeRequest(req, res) : handler(req, res);
    })
    .on('upgrade', (req, socket, head) => {
        if ( bareServer.shouldRoute(req) ) {
            bareServer.routeUpgrade(req, socket, head);
        }
    });
};

const app = Fastify({ logger: false, serverFactory: bareHandler })
await app 
    .register(fastifyHttpProxy, {
        upstream: 'http://localhost:9292',
        prefix: '/',
        http2: false,
        replyOptions: {
            rewriteRequestHeaders: (originalReq, headers) => {
                headers['host'] = originalReq.headers['host'];
                headers['origin'] = originalReq.headers['origin'];
                return headers;
            }
        }
    })
    .register(fastifyMiddie)
app.get('/search=:query', async (req, res) => {
    const { query } = req.params;
    try {
        const resp = await fetch(`https://search.brave.com/api/suggest?q=${query}&format=json`).then((res) => res.json());
        res.send(resp);
    }
    catch (err) {
        reply.code(500).send({ error: "Internal Server Error" });
    }
});

app.listen({ port: nodePort, host: '0.0.0.0' });
console.log(chalk.green(`Server listening on port ${chalk.red(nodePort)}`));
