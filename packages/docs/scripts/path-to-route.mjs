/**
 * 将 content 目录下的相对路径转为 React Router flat routes 文件名（不含扩展名）
 * @param {string} relPath 例如 guide/getting-started.md
 * @returns {string} 例如 guide.getting-started
 */
export function markdownRelPathToRouteId(relPath) {
  const noMd = relPath.replace(/\.md$/i, '');
  return noMd.replace(/\//g, '.');
}
