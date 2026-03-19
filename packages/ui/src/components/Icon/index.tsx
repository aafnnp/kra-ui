import React, { useMemo } from 'react';
import { useTheme } from '@shopify/restyle';
import Svg, { Path, G, Circle, Line, Polyline, Rect, Polygon } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import type { Theme } from '../../theme';

/** 预设尺寸映射 */
const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/** 图标尺寸，支持预设名称或数值 */
type IconSize = keyof typeof sizeMap | number;

export interface IconProps {
  /** 尺寸，支持预设名称或数值 */
  size?: IconSize;
  /** 主题色键名 */
  color?: keyof Theme['colors'];
  /** SVG viewBox */
  viewBox?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 填充模式 */
  fill?: 'none' | 'currentColor';
  /** 自定义 SVG 组件 */
  as?: React.ComponentType<SvgProps>;
  /** SVG 子元素 */
  children?: React.ReactNode;
  /** 无障碍标签 */
  accessibilityLabel?: string;
}

/**
 * 解析尺寸值
 */
function resolveSize(size: IconSize): number {
  return typeof size === 'number' ? size : sizeMap[size];
}

/**
 * 图标基础组件
 * @description 基于 react-native-svg 的通用图标容器，支持主题色、预设尺寸和自定义 SVG
 */
function Icon({
  size = 'lg',
  color = 'textPrimary',
  viewBox = '0 0 24 24',
  strokeWidth = 2,
  fill = 'none',
  as: CustomSvg,
  children,
  accessibilityLabel,
}: IconProps) {
  const theme = useTheme<Theme>();
  const resolvedSize = resolveSize(size);
  const resolvedColor = theme.colors[color] as string;
  const resolvedFill = fill === 'currentColor' ? resolvedColor : 'none';

  if (CustomSvg) {
    return (
      <CustomSvg
        width={resolvedSize}
        height={resolvedSize}
        color={resolvedColor}
        accessibilityLabel={accessibilityLabel}
      />
    );
  }

  return (
    <Svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox={viewBox}
      fill={resolvedFill}
      stroke={resolvedColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Svg>
  );
}

/** 单条路径配置 */
interface PathConfig {
  /** SVG path data */
  d: string;
  /** 独立填充色 */
  fill?: string;
  /** 独立描边色 */
  stroke?: string;
}

/**
 * createIcon 工厂函数选项
 */
export interface CreateIconOptions {
  /** 组件显示名称 */
  displayName?: string;
  /** SVG viewBox */
  viewBox?: string;
  /** 单条路径的 path data（与 paths 二选一） */
  d?: string;
  /** 多条路径配置（与 d 二选一） */
  paths?: PathConfig[];
  /** 默认属性覆盖 */
  defaultProps?: Partial<IconProps>;
  /** 自定义 SVG 子元素渲染（用于复杂图标） */
  render?: (color: string) => React.ReactNode;
}

/**
 * 图标工厂函数
 * @description 通过 SVG path data 快速创建图标组件，类似 Chakra UI 的 createIcon
 */
function createIcon(options: CreateIconOptions): React.FC<IconProps> {
  const {
    displayName = 'CustomIcon',
    viewBox = '0 0 24 24',
    d,
    paths,
    defaultProps,
    render,
  } = options;

  const IconComponent: React.FC<IconProps> = (props) => {
    const merged = { ...defaultProps, ...props };
    const theme = useTheme<Theme>();
    const resolvedColor = theme.colors[merged.color ?? 'textPrimary'] as string;

    const children = useMemo(() => {
      if (render) {
        return render(resolvedColor);
      }
      if (d) {
        return <Path d={d} />;
      }
      if (paths) {
        return paths.map((p, i) => <Path key={i} d={p.d} fill={p.fill} stroke={p.stroke} />);
      }
      return null;
    }, [resolvedColor]);

    return (
      <Icon viewBox={viewBox} {...merged}>
        {children}
      </Icon>
    );
  };

  IconComponent.displayName = displayName;
  return IconComponent;
}

export { createIcon, Path, G, Circle, Line, Polyline, Rect, Polygon };
export default Icon;
