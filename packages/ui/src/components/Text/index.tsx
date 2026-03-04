import {createText} from '@shopify/restyle';
import type {Theme} from '../../theme';

/**
 * 文本组件
 * 支持 textVariants: header, subheader, body, caption, label
 */
const Text = createText<Theme>();

export type TextProps = React.ComponentProps<typeof Text>;
export default Text;
