import raw from "./docs-nav.json";

export type NavItem = { text: string; link: string };
export type SidebarSection = { text: string; items: NavItem[] };

/**
 * 文档站顶栏与侧栏配置（单一数据源）
 */
export const docsNav = raw as { nav: NavItem[]; sidebar: SidebarSection[] };
