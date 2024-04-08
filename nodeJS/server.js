import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyHttpProxy from '@fastify/http-proxy';
import { createBareServer } from '@tomphttp/bare-server-node';
import createRammerhead from "@rubynetwork/rammerhead/src/server/index.js";
import { createServer } from 'http';
import path from 'path';
const __dirname = path.resolve();
import chalk from 'chalk';
import wisp from 'wisp-server-node';
import fastifyCaching from '@fastify/caching';
let nodePort = process.argv.find((arg) => arg.startsWith('--node-port')).split('=')[1] || 9294;
const bare = createBareServer('/bare/');
const rh = createRammerhead();
const rammerheadScopes = [ "/rammerhead.js", "/hammerhead.js", "/transport-worker.js", "/task.js", "/iframe-task.js", "/worker-hammerhead.js", "/messaging", "/sessionexists", "/deletesession", "/newsession", "/editsession", "/needpassword", "/syncLocalStorage", "/api/shuffleDict", "/mainport" ];
const rammerheadSession = /^\/[a-z0-9]{32}/;
function shouldRouteRh(req) {
  const url = new URL(req.url, "http://0.0.0.0");
  return (rammerheadScopes.includes(url.pathname) || rammerheadSession.test(url.pathname))
}
function routeRhRequest(req, res) { rh.emit("request", req, res) }
function routeRhUpgrade(req, socket, head) { rh.emit("upgrade", req, socket, head) }

const proxyHandler = (handler, opts) => {
    return createServer().on('request', (req, res) => {
        if (req.url.startsWith('/rammer')) {
            req.url = req.url.replace('/rammer', '');
        }
        if (bare.shouldRoute(req)) {
            bare.routeRequest(req, res);
        }
        else if (shouldRouteRh(req)) {
            routeRhRequest(req, res);
        }
        else {
            handler(req, res);
        }
    })
    .on('upgrade', (req, socket, head) => {
        if (req.url.startsWith('/rammer')) {
            req.url = req.url.replace('/rammer', '');
        }
        if (bare.shouldRoute(req)) {
            bare.routeUpgrade(req, socket, head);
        }
        else if (shouldRouteRh(req)) {
            routeRhUpgrade(req, socket, head);
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
    .register(fastifyMiddie)

app.listen({ port: nodePort, host: '0.0.0.0' });
console.log(chalk.green(`NodeJS Server listening on port ${chalk.red(nodePort)}`));
