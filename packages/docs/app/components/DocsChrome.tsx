import { Link, NavLink, Outlet } from 'react-router';

import { docsNav } from '~/lib/docs-nav';

type DocsChromeProps = {
  children?: React.ReactNode;
};

/**
 * 文档区顶栏 + 侧栏 + 正文槽位（用于 /guide/*）
 */
export function DocsChrome({ children }: DocsChromeProps) {
  return (
    <div className="docs-shell">
      <header className="docs-header">
        <Link className="docs-brand" to="/">
          NativeUI
        </Link>
        <nav className="docs-nav" aria-label="主导航">
          {docsNav.nav.map((item) => (
            <NavLink key={item.link} to={item.link}>
              {item.text}
            </NavLink>
          ))}
        </nav>
      </header>
      <div className="docs-body">
        <aside className="docs-sidebar" aria-label="侧边栏">
          {docsNav.sidebar.map((section) => (
            <div key={section.text} className="docs-sidebar-section">
              <div className="docs-sidebar-title">{section.text}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.link}
                  to={item.link}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
          ))}
        </aside>
        <main className="docs-main-wrap">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
