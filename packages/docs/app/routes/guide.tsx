import { Outlet } from 'react-router';

import { DocsChrome } from '~/components/DocsChrome';

/**
 * /guide 段布局：顶栏 + 侧栏 + 子路由
 */
export default function GuideLayoutRoute() {
  return (
    <DocsChrome>
      <Outlet />
    </DocsChrome>
  );
}
