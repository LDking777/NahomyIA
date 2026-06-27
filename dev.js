import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)));

function log(prefix, data) {
  for (const line of data.toString().split("\n").filter(Boolean)) {
    process.stdout.write(`${prefix} ${line}\n`);
  }
}

const be = spawn("python", ["-u", "-m", "src.main"], {
  cwd: resolve(root, "packages/server"),
  stdio: ["ignore", "pipe", "pipe"],
});

const fe = spawn("npm", ["run", "dev"], {
  cwd: resolve(root, "packages/client"),
  stdio: ["ignore", "pipe", "pipe"],
  shell: true,
});

be.stdout.on("data", (d) => log("\x1b[36m[server]\x1b[0m", d));
be.stderr.on("data", (d) => log("\x1b[36m[server]\x1b[0m", d));
be.on("error", (e) => log("\x1b[36m[server]\x1b[0m \x1b[31m✗\x1b[0m", e.message));
be.on("close", (c) => {
  log("\x1b[36m[server]\x1b[0m \x1b[31m✗" + (c ? ` exited ${c}` : " done") + "\x1b[0m", "");
  if (!fe.killed) fe.kill();
});

fe.stdout.on("data", (d) => log("\x1b[32m[client]\x1b[0m", d));
fe.stderr.on("data", (d) => log("\x1b[32m[client]\x1b[0m", d));
fe.on("error", (e) => log("\x1b[32m[client]\x1b[0m \x1b[31m✗\x1b[0m", e.message));
fe.on("close", (c) => {
  log("\x1b[32m[client]\x1b[0m \x1b[31m✗" + (c ? ` exited ${c}` : " done") + "\x1b[0m", "");
  if (!be.killed) be.kill();
});

console.log("\x1b[33m⚡ C2 IA — servidores iniciados\x1b[0m\n");

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    for (const p of [be, fe]) { if (!p.killed) p.kill(); }
    process.exit(0);
  });
}
