import createBareServer from '@tomphttp/bare-server-node';
import http from 'node:http';
import cluster from 'cluster';
import { cpus } from 'os';
import YAML from 'yaml';
import fs from 'fs';
import path from 'node:path';
const __dirname = path.resolve();

const file = fs.readFileSync(__dirname + '/config/settings.yml', 'utf8');
const settings = YAML.parse(file);
    
let numCPUs = cpus().length || 1;
process.argv.forEach(function (val, index, array) {
    if (val.includes('--cpu-count')) {
        numCPUs = val.split('=')[1];
    }
});
if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork();
    });
} else {
    const httpServer = http.createServer();
    const bareServer = createBareServer('/');
    httpServer.on('request', (req, res) => {
	    if (bareServer.shouldRoute(req)) {
		    bareServer.routeRequest(req, res);
	    } else {
		    res.writeHead(400);
		    res.end('Not found.');
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
	    console.log('Bare Server Online with id ' + cluster.worker.id);
    });

    httpServer.listen({
        port: settings.barePort,
    });
}
