// One process for the stage: Vite (demo deck, dashboard, slide preview, backup deck) + factory API.
//   npm run demo      →  http://localhost:5180/demo/dashboard/   http://localhost:5180/demo/deck/
import fs from 'node:fs';
import { createServer } from 'vite';
import { Factory } from './worker.mjs';
import { ROOT, loadSpecs, shotPath } from './specs.mjs';

const PORT = Number(process.env.DEMO_PORT ?? 5180);
process.env.DEMO_URL ??= `http://localhost:${PORT}`;

const factory = new Factory();

function api() {
  return {
    name: 'factory-api',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res) => {
        const url = new URL(req.url, 'http://x');
        const parts = url.pathname.split('/').filter(Boolean);
        const send = (code, body, type = 'application/json') => {
          res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' });
          res.end(type === 'application/json' ? JSON.stringify(body) : body);
        };
        try {
          if (req.method === 'GET' && parts[0] === 'state') return send(200, publicState());
          if (req.method === 'GET' && parts[0] === 'stream') return stream(req, res);
          if (req.method === 'GET' && parts[0] === 'spec' && parts[1]) {
            const spec = loadSpecs().find((s) => s.id === parts[1]);
            return spec ? send(200, spec.raw, 'text/markdown; charset=utf-8') : send(404, { error: 'no such spec' });
          }
          if (req.method === 'GET' && parts[0] === 'slide' && parts[1]) {
            const html = factory.slideHtml(parts[1]);
            return html ? send(200, html, 'text/html; charset=utf-8') : send(404, { error: 'slide not built' });
          }
          if (req.method === 'GET' && parts[0] === 'shot' && parts[1]) {
            const p = shotPath(parts[1]);
            return fs.existsSync(p) ? send(200, fs.readFileSync(p), 'image/png') : send(404, { error: 'no screenshot' });
          }
          if (req.method === 'GET' && parts[0] === 'activity' && parts[1]) {
            return send(200, factory.state.specs.find((j) => j.id === parts[1])?.activity ?? []);
          }
          if (req.method === 'POST' && parts[0] === 'run' && !parts[1]) return factory.runAll(), send(202, { ok: true });
          if (req.method === 'POST' && parts[0] === 'run' && parts[1]) return factory.runOne(parts[1]), send(202, { ok: true });
          if (req.method === 'POST' && parts[0] === 'stop') return factory.stopAll(), send(200, { ok: true });
          if (req.method === 'POST' && parts[0] === 'reset') return factory.reset(), send(200, { ok: true });
          send(404, { error: 'not found' });
        } catch (e) {
          send(500, { error: e.message });
        }
      });
    },
  };
}

// state without the heavy activity logs
function publicState() {
  const { specs, ...rest } = factory.state;
  return { ...rest, serverTime: new Date().toISOString(), specs: specs.map(({ activity, live, liveMsgId, ...j }) => ({ ...j, usage: addUsage(j.usage, live), lastActivity: activity.at(-1) ?? null })) };
}

const addUsage = (a, b) => (b ? Object.fromEntries(Object.keys(a).map((k) => [k, a[k] + (b[k] ?? 0)])) : a);

const clients = new Set();
function stream(req, res) {
  res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
  res.write(`event: state\ndata: ${JSON.stringify(publicState())}\n\n`);
  clients.add(res);
  req.on('close', () => clients.delete(res));
}
let pending = null;
factory.on('state', () => {
  if (pending) return;
  pending = setTimeout(() => {
    pending = null;
    const data = `event: state\ndata: ${JSON.stringify(publicState())}\n\n`;
    for (const c of clients) c.write(data);
  }, 200);
});
factory.on('event', (ev) => {
  const data = `event: log\ndata: ${JSON.stringify(ev)}\n\n`;
  for (const c of clients) c.write(data);
});

const server = await createServer({
  configFile: false,
  root: ROOT,
  appType: 'mpa',
  logLevel: 'warn',
  server: {
    port: PORT,
    strictPort: true,
    // generated slides are fetched through the API — never trigger page reloads
    watch: { ignored: ['**/demo/runs/**', '**/demo/deck/slides/**', '**/demo/specs/**', '**/demo/shots/**'] },
  },
  plugins: [api()],
});
await server.listen();

const u = process.env.DEMO_URL;
console.log(`
  🏭  AI FACTORY · ${factory.state.model} · concurrency ${factory.state.concurrency}

  Dashboard     ${u}/demo/dashboard/
  Demo deck     ${u}/demo/deck/
  Backup deck   ${u}/
`);

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => {
    await factory.close();
    await server.close();
    process.exit(0);
  });
}
