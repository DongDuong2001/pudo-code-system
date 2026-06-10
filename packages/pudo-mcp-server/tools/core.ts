import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

export type PudoOptions = {
  tools: string[];
  project: string;
  strictness: string;
};

export type PudoApi = {
  TOOL_NAMES: string[];
  PROJECT_TYPES: string[];
  STRICTNESS: string[];
  templates(options: PudoOptions): Record<string, string>;
  writeFiles(
    files: Record<string, string>,
    args: { dryRun: boolean; force: boolean }
  ): string[];
  evaluateProject(): Array<{ name: string; pass: boolean; fix: string }>;
  evaluateScore(): Record<string, unknown>;
  evaluateDoctor(): Array<{ severity: string; issue: string; fix: string }>;
};

export function resolveProjectRoot(): string {
  const requestedRoot = process.env.PUDO_PROJECT_ROOT || process.cwd();
  return fs.realpathSync(path.resolve(requestedRoot));
}

export function resolveWithinRoot(root: string, relativePath: string): string {
  const target = path.resolve(root, relativePath);
  const relative = path.relative(root, target);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Path escapes repository boundary: ${relativePath}`);
  }

  return target;
}

export function requireWriteApproval(confirmWrite: boolean | undefined): void {
  if (!confirmWrite) {
    throw new Error("Write operation requires confirmWrite: true.");
  }
}

function findPudoPackageRoot(): string {
  if (process.env.PUDO_PACKAGE_ROOT) {
    return fs.realpathSync(path.resolve(process.env.PUDO_PACKAGE_ROOT));
  }

  let current = path.dirname(fileURLToPath(import.meta.url));
  while (true) {
    const manifestPath = path.join(current, "package.json");
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
        if (manifest.name === "pudo-code-system") return current;
      } catch {
        // Continue walking until the root PUDO package is found.
      }
    }

    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  throw new Error("Unable to locate the pudo-code-system package root.");
}

export function loadPudoApi(): PudoApi {
  const packageRoot = findPudoPackageRoot();
  const require = createRequire(import.meta.url);
  return require(path.join(packageRoot, "src", "cli.js")) as PudoApi;
}

export function jsonToolResult(data: Record<string, unknown>) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: data
  };
}

export function isSensitivePath(relativePath: string): boolean {
  const normalized = relativePath.replaceAll("\\", "/").toLowerCase();
  return [
    ".env",
    "secrets",
    "credentials",
    ".git/",
    "node_modules/",
    "dist/",
    "build/"
  ].some((blocked) => normalized === blocked || normalized.includes(blocked));
}
