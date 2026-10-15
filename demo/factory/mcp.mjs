// Minimal stdio MCP server exposing the factory gate as the builder agents' only executable tool.
// Builders get no Bash at all — they can read, write their one slide file, and call verify_slide.
import readline from 'node:readline';
import { verifySlide } from './verify.mjs';

const TOOL = {
  name: 'verify_slide',
  description:
    'Factory gate: renders the slide headless (Playwright, 1920×1080) and checks structure, overflow, clipped text, console errors and the required phrases from the spec. Returns PASS/FAIL with problems and the screenshot path (open it with the Read tool).',
  inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'two-digit slide id, e.g. "07"' } }, required: ['id'] },
};

const send = (msg) => process.stdout.write(JSON.stringify({ jsonrpc: '2.0', ...msg }) + '\n');

async function handle(req) {
  switch (req.method) {
    case 'initialize':
      return { protocolVersion: req.params?.protocolVersion ?? '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'factory', version: '1.0.0' } };
    case 'ping':
      return {};
    case 'tools/list':
      return { tools: [TOOL] };
    case 'tools/call': {
      const id = String(req.params?.arguments?.id ?? '').padStart(2, '0');
      const res = await verifySlide(id);
      const text = res.ok
        ? `✅ PASS slide ${id} (${res.stats.elements} elements checked, ${res.stats.required} required phrases present)`
        : `❌ FAIL slide ${id}\n${res.problems.map((p) => `- ${p}`).join('\n')}`;
      return { content: [{ type: 'text', text: res.shot ? `${text}\nscreenshot: ${res.shot}` : text }], isError: false };
    }
    default:
      throw Object.assign(new Error(`method not found: ${req.method}`), { code: -32601 });
  }
}

readline.createInterface({ input: process.stdin }).on('line', async (line) => {
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return;
  }
  if (req.id === undefined) return; // notification
  try {
    send({ id: req.id, result: await handle(req) });
  } catch (e) {
    send({ id: req.id, error: { code: e.code ?? -32603, message: e.message } });
  }
});
