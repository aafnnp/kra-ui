#!/usr/bin/env node
/**
 * 校验 docs-nav.json 中的 link 是否都有对应的路由模块
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { markdownRelPathToRouteId } from './path-to-route.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(__dirname, '..');
const navPath = path.join(pkgRoot, 'app', 'lib', 'docs-nav.json');
const routesDir = path.join(pkgRoot, 'app', 'routes');
const contentDir = path.join(pkgRoot, 'content');

/**
 * @param {string} link 如 /guide/getting-started
 */
function linkToRouteFile(link) {
  if (link === '/') return '_index.tsx';
  const trimmed = link.replace(/^\//, '');
  const id = trimmed.replace(/\//g, '.');
  return `${id}.tsx`;
}

function main() {
  const raw = JSON.parse(fs.readFileSync(navPath, 'utf8'));
  const links = new Set();
  for (const n of raw.nav) links.add(n.link);
  for (const s of raw.sidebar) {
    for (const it of s.items) links.add(it.link);
  }

  const errors = [];
  for (const link of links) {
    if (link === '/') continue;
    const file = linkToRouteFile(link);
    const fp = path.join(routesDir, file);
    if (!fs.existsSync(fp)) {
      errors.push(`死链: ${link} -> 缺少 ${file}`);
    }
  }

  /** 校验 content 下每个 md（除 index）都有路由 */
  function walkMd(dir, base, out = []) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walkMd(p, base, out);
      else if (ent.name.endsWith('.md')) out.push(path.relative(base, p).replace(/\\/g, '/'));
    }
    return out;
  }

  const mds = walkMd(contentDir, contentDir).filter((r) => r !== 'index.md');
  for (const rel of mds) {
    const id = markdownRelPathToRouteId(rel);
    const fp = path.join(routesDir, `${id}.tsx`);
    if (!fs.existsSync(fp)) {
      errors.push(`内容未挂载: content/${rel} -> 缺少 ${id}.tsx（请先 pnpm run generate）`);
    }
  }

  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log('validate-docs-nav: OK');
}

main();
