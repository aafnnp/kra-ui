/**
 * 未匹配路径：返回 404 状态码（由根 ErrorBoundary 展示）
 */
export async function loader() {
  throw new Response('页面未找到', { status: 404 });
}

export default function NotFoundRoute() {
  return null;
}
