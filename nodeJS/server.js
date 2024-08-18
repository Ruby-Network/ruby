import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyHttpProxy from '@fastify/http-proxy';
import { createBareServer } from '@tomphttp/bare-server-node';
import { createRammerhead, shouldRouteRh, routeRhRequest, routeRhUpgrade } from "@rubynetwork/rammerhead";
import { createServer } from 'http';
import path from 'path';
const __dirname = path.resolve();
import chalk from 'chalk';
import wisp from 'wisp-server-node';
import fastifyCaching from '@fastify/caching';
let nodePort = process.argv.find((arg) => arg.startsWith('--node-port')).split('=')[1] || 9294;
const bare = createBareServer('/bare/');
const rh = createRammerhead({
    reverseProxy: true,
    disableHttp2: false,
    disableLocalStorageSync: false,
    logLevel: 'debug'
});

const proxyHandler = (handler, opts) => {
    return createServer().on('request', (req, res) => {
        if (bare.shouldRoute(req)) {
            bare.routeRequest(req, res);
        }
        else if (shouldRouteRh(req)) {
            routeRhRequest(rh, req, res);
        }
        else {
            handler(req, res);
        }
    })
    .on('upgrade', (req, socket, head) => {
        if (bare.shouldRoute(req)) {
            bare.routeUpgrade(req, socket, head);
        }
        else if (shouldRouteRh(req)) {
            routeRhUpgrade(rh, req, socket, head);
        }
        else if (req.url.endsWith('/wisp/')) {
            wisp.routeRequest(req, socket, head);
        }
    });
};

const app = Fastify({ logger: false, serverFactory: proxyHandler })
await app
    .register(fastifyCaching, {
        privacy: fastifyCaching.privacy.NOCACHE
    })
    .register(fastifyHttpProxy, {
        upstream: 'http://localhost:9293',
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
    .register(fastifyHttpProxy, {
        upstream: 'https://rawcdn.githack.com',
        prefix: '/gms/',
        http2: false,
    })
    .register(fastifyMiddie)

app.listen({ port: nodePort, host: '0.0.0.0' });
console.log(chalk.green(`NodeJS Server listening on port ${chalk.red(nodePort)}`));
