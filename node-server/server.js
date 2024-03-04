import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyHttpProxy from '@fastify/http-proxy';
import { fileURLToPath } from 'node:url';
import { createBareServer } from '@tomphttp/bare-server-node';
import createRammerhead from "rammerhead/src/server/index.js";
import { createServer } from 'http';
import fs from 'fs'
import YAML from 'yaml';
import path from 'path';
const __dirname = path.resolve();
const settings = YAML.parse(fs.readFileSync(path.join(__dirname, '/config/settings.yml'), 'utf8'));
import chalk from 'chalk';
import compile from './compile.js';
import getLatestRelease from './version.js';
import wisp from 'wisp-server-node';
import fastifyCaching from '@fastify/caching';
let rubyPort = process.argv.find((arg) => arg.startsWith('--ruby-port')).split('=')[1] || 9292;
let nodePort = process.argv.find((arg) => arg.startsWith('--node-port')).split('=')[1] || 9293;

const latestRelease = await getLatestRelease();
const bare = createBareServer('/bare/');
const rh = createRammerhead();
const rammerheadScopes = [ "/rammerhead.js", "/hammerhead.js", "/transport-worker.js", "/task.js", "/iframe-task.js", "/worker-hammerhead.js", "/messaging", "/sessionexists", "/deletesession", "/newsession", "/editsession", "/needpassword", "/syncLocalStorage", "/api/shuffleDict", "/mainport" ];
const rammerheadSession = /^\/[a-z0-9]{32}/;
function shouldRouteRh(req) {
  const url = new URL(req.url, "http://0.0.0.0");
  return (rammerheadScopes.includes(url.pathname) || rammerheadSession.test(url.pathname));
}
function routeRhRequest(req, res) { rh.emit("request", req, res) }
function routeRhUpgrade(req, socket, head) { rh.emit("upgrade", req, socket, head) }
console.log(chalk.red('Compiling...'))
compile();

const proxyHandler = (handler, opts) => {
    return createServer().on('request', (req, res) => {
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
    .register(fastifyHttpProxy, {
        upstream: 'https://rawcdn.githack.com',
        prefix: '/gms/',
        http2: false,
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
app.get('/version', (req, res) => {
    res.send({ version: latestRelease });
});
app.get('/health', async (req, res) => {
    let resp = await fetch(`http://localhost:${rubyPort}/rubyHealth`);
    if (resp.status === 200) {
        res.send({ status: 'ok' });
    }
    else {
        res.send({ status: 'error' });
    }
});

app.listen({ port: nodePort, host: '0.0.0.0' });
console.log(chalk.green(`Server listening on port ${chalk.red(nodePort)}`));
