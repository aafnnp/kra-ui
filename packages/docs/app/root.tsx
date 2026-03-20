import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';

import appStyles from '~/styles/app.css?url';

/**
 * 文档站根组件：HTML 外壳与全局资源
 */
export default function Root() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: appStyles }];
}

/**
 * 根级错误边界，避免白屏
 */
export function ErrorBoundary() {
  const error = useRouteError();
  let message = '未知错误';
  let status = 500;
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <title>出错了</title>
        <Links />
      </head>
      <body className="docs-error">
        <h1>{status}</h1>
        <p>{message}</p>
      </body>
    </html>
  );
}
