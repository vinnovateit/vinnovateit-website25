// Runs the Next.js CLI, disabling Node's built-in Web Storage only on Node
// versions that have it (Node 25+ exposes a broken global `localStorage`
// without --localstorage-file, which crashes SSR). Older Node versions
// (e.g. Node 24 on Cloudflare's build image) reject the flag outright.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const flags = process.allowedNodeEnvironmentFlags;
const supportsWebStorageFlag =
  flags.has("--no-webstorage") || flags.has("--webstorage");

const env = { ...process.env };
if (supportsWebStorageFlag && !/--no-webstorage/.test(env.NODE_OPTIONS ?? "")) {
  env.NODE_OPTIONS = `${env.NODE_OPTIONS ?? ""} --no-webstorage`.trim();
}

const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], {
  stdio: "inherit",
  env,
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
