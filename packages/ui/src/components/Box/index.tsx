import {createBox} from '@shopify/restyle';
import type {Theme} from '../../theme';

/**
 * 基础布局容器
 * 支持所有 Restyle 布局属性：backgroundColor, spacing, border, shadow, position 等
 */
const Box = createBox<Theme>();

export type BoxProps = React.ComponentProps<typeof Box>;
export default Box;
