import type { MetaFunction } from 'react-router';

import { MarkdownPage } from '~/components/MarkdownPage';
import homeMarkdown from '../../content/index.md?raw';

export const meta: MetaFunction = () => [
  { title: 'NativeUI' },
  { name: 'description', content: '基于 @shopify/restyle 的 React Native UI 组件库' },
];

/**
 * 首页
 */
export default function HomeRoute() {
  return (
    <div className="docs-home">
      <MarkdownPage markdown={homeMarkdown} />
    </div>
  );
}
