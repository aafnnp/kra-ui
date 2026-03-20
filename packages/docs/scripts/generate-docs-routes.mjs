#!/usr/bin/env node
/**
 * 扫描 content 下全部 .md，在 app/routes 下生成文档路由模块（Markdown ?raw + MarkdownPage）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { markdownRelPathToRouteId } from './path-to-route.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(__dirname, '..');
const contentDir = path.join(pkgRoot, 'content');
const routesDir = path.join(pkgRoot, 'app', 'routes');

const BANNER = `// 本文件由 scripts/generate-docs-routes.mjs 自动生成，请勿手改\n`;

/**
 * @param {string} dir
 * @param {string} base
 * @param {string[]} out
 */
function walkMarkdown(dir, base, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMarkdown(p, base, out);
    else if (ent.name.endsWith('.md')) out.push(path.relative(base, p).replace(/\\/g, '/'));
  }
  return out;
}

/** 移除此前生成的路由文件 */
function removeGeneratedRoutes() {
  if (!fs.existsSync(routesDir)) return;
  for (const f of fs.readdirSync(routesDir)) {
    if (!f.endsWith('.tsx')) continue;
    const fp = path.join(routesDir, f);
    const head = fs.readFileSync(fp, 'utf8').slice(0, 120);
    if (head.includes('generate-docs-routes.mjs 自动生成')) {
      fs.unlinkSync(fp);
    }
  }
}

function main() {
  removeGeneratedRoutes();
  if (process.argv.includes('--clean-only')) {
    console.log('generate-docs-routes: cleaned generated routes only');
    return;
  }
  const mds = walkMarkdown(contentDir, contentDir).filter((rel) => rel !== 'index.md');
  for (const rel of mds) {
    const routeId = markdownRelPathToRouteId(rel);
    const routeFile = `${routeId}.tsx`;
    const importPath = `../../content/${rel}`;
    const body = `${BANNER}import { MarkdownPage } from "~/components/MarkdownPage";
import source from "${importPath}?raw";

export default function GeneratedDocPage() {
  return <MarkdownPage markdown={source} />;
}
`;
    fs.writeFileSync(path.join(routesDir, routeFile), body, 'utf8');
  }
  console.log(`generate-docs-routes: wrote ${mds.length} route(s)`);
}

main();
