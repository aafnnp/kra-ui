import {execFileSync} from 'node:child_process';

/**
 * 仅检查本次变更涉及的文件格式，避免对历史文件造成大范围格式化改动。
 * - 本地默认对比 HEAD~1...HEAD
 * - CI 可通过 `--base <sha>` 指定对比基线
 */

function parseArgs(argv) {
  const args = {base: null};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--base') {
      args.base = argv[i + 1] ?? null;
      i += 1;
    }
  }
  return args;
}

function runGitDiffNames(base) {
  const range = `${base}...HEAD`;
  const out = execFileSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMRTUB', range],
    {encoding: 'utf8'},
  );
  return out
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function main() {
  const {base} = parseArgs(process.argv.slice(2));
  const diffBase = base ?? 'HEAD~1';

  const allowExt = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.mdx', '.yml', '.yaml']);
  const changed = runGitDiffNames(diffBase).filter((file) => {
    const dot = file.lastIndexOf('.');
    if (dot < 0) return false;
    const ext = file.slice(dot);
    return allowExt.has(ext);
  });

  if (changed.length === 0) {
    // eslint-disable-next-line no-console
    console.log(`[format:check] 未检测到需检查的变更文件（base=${diffBase}）`);
    return;
  }

  execFileSync('npx', ['prettier', '--check', ...changed], {stdio: 'inherit'});
}

main();

