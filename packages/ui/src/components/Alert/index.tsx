import React from 'react';
import {
  createRestyleComponent,
  createVariant,
  type VariantProps,
} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

const AlertContainer = createRestyleComponent<
  VariantProps<Theme, 'alertVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'alertVariants'})], Box);

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

const statusColorMap: Record<AlertStatus, keyof Theme['colors']> = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export interface AlertProps extends BoxProps {
  /** 状态类型 */
  status?: AlertStatus;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
}

/**
 * 提示信息组件
 * 支持 status: info, success, warning, error
 */
function Alert({
  status = 'info',
  title,
  description,
  children,
  ...rest
}: AlertProps) {
  const textColor = statusColorMap[status];

  return (
    <AlertContainer variant={status} {...rest}>
      <Box flex={1}>
        {title && (
          <Text fontWeight="600" color={textColor}>
            {title}
          </Text>
        )}
        {description && (
          <Text fontSize={14} color={textColor} marginTop="xs">
            {description}
          </Text>
        )}
        {children}
      </Box>
    </AlertContainer>
  );
}

export default Alert;
