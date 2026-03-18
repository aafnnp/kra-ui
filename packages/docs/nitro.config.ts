import { defineNitroConfig } from 'nitropack/config';

/**
 * Nitro 部署配置
 *
 * 支持多平台部署，通过 NITRO_PRESET 环境变量或 --preset 参数切换：
 * - cloudflare_pages: Cloudflare Pages 部署
 * - vercel_static: Vercel 静态部署
 * - static: 纯静态 SPA 部署（输出到 .output/public）
 * - node_server: Node.js 服务器部署（默认）
 */
export default defineNitroConfig({
  compatibilityDate: '2025-01-01',
  output: {
    dir: '.output',
  },
  publicAssets: [
    {
      dir: '.vitepress/dist',
      baseURL: '/',
      maxAge: 60 * 60 * 24 * 365,
    },
  ],
  // Cloudflare Pages 专用配置
  cloudflare: {
    deployConfig: true,
  },
  // 预渲染首页，确保静态部署可用
  prerender: {
    routes: ['/'],
  },
  serveStatic: true,
});
