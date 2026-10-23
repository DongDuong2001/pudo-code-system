// Copies the root PUDO engine (CLI + playbooks) into dist/pudo so the published package is self-contained.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..", "..");
const target = path.resolve(here, "..", "dist", "pudo");

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(path.join(repoRoot, "src"), path.join(target, "src"), { recursive: true });
fs.cpSync(path.join(repoRoot, "playbooks"), path.join(target, "playbooks"), { recursive: true });
// cli.js is CommonJS; this manifest stops the parent "type": "module" from applying.
fs.writeFileSync(
  path.join(target, "package.json"),
  JSON.stringify({ name: "@dongduong2001/pudo-code-system", private: true, type: "commonjs" }, null, 2) + "\n"
);
