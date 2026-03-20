import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import remarkGfm from 'remark-gfm';

type MarkdownPageProps = {
  /** Markdown 源文本 */
  markdown: string;
};

/**
 * 去掉 VitePress 遗留的 YAML frontmatter（--- ... ---）
 */
function stripYamlFrontmatter(source: string): string {
  const trimmed = source.trimStart();
  if (!trimmed.startsWith('---')) return source;
  const end = trimmed.indexOf('\n---', 3);
  if (end === -1) return source;
  return trimmed.slice(end + 4).trimStart();
}

/**
 * 将 Markdown 渲染为文档正文（GFM）
 */
export function MarkdownPage({ markdown }: MarkdownPageProps) {
  const body = stripYamlFrontmatter(markdown);
  return (
    <article className="docs-main">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith('/')) {
              return <Link to={href}>{children}</Link>;
            }
            return (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </article>
  );
}
