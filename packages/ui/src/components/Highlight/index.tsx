import { useMemo } from 'react';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Text from '../Text';
import type { TextProps } from '../Text';

export interface HighlightProps extends TextProps {
  /** 原始文本 */
  children: string;
  /** 要高亮的文本或文本数组 */
  query: string | string[];
}

/**
 * 将文本按查询词拆分为片段
 */
function splitByQuery(text: string, queries: string[]): { text: string; match: boolean }[] {
  if (!queries.length) {
    return [{ text, match: false }];
  }

  const escaped = queries.map((q) => q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.filter(Boolean).map((part) => ({
    text: part,
    match: queries.some((q) => q.toLowerCase() === part.toLowerCase()),
  }));
}

/**
 * 文本高亮组件
 * 高亮显示匹配的查询文本
 */
function Highlight({ children, query, style, ...rest }: HighlightProps) {
  const theme = useTheme<Theme>();
  const chunks = useMemo(() => {
    const queries = (Array.isArray(query) ? query : [query]).filter(Boolean);
    return splitByQuery(children, queries);
  }, [children, query]);

  return (
    <Text style={style} {...rest}>
      {chunks.map((chunk, index) =>
        chunk.match ? (
          <Text key={index} style={{ backgroundColor: theme.colors.highlight }}>
            {chunk.text}
          </Text>
        ) : (
          <Text key={index}>{chunk.text}</Text>
        ),
      )}
    </Text>
  );
}

export default Highlight;
