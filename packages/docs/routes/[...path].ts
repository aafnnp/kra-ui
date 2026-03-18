import { defineEventHandler, sendRedirect } from 'h3';

/**
 * 通配路由处理器
 * 将未匹配静态资源的请求重定向到首页，支持 SPA 路由回退
 */
export default defineEventHandler((event) => {
  return sendRedirect(event, '/', 302);
});
