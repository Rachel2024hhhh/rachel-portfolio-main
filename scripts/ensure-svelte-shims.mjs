import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "node_modules", "svelte2tsx");
const targetDir = path.join(projectRoot, "node_modules", ".svelte2tsx-language-server-files");

const files = ["svelte-native-jsx.d.ts", "svelte-shims-v4.d.ts"];

if (!existsSync(sourceDir)) {
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });

for (const file of files) {
  const source = path.join(sourceDir, file);
  const target = path.join(targetDir, file);

  if (existsSync(source)) {
    copyFileSync(source, target);
  }
}
