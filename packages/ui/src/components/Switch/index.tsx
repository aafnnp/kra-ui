import React from 'react';
import {Switch as RNSwitch, type SwitchProps as RNSwitchProps} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

export interface SwitchProps extends RNSwitchProps {
  /** 标签文字 */
  label?: string;
  /** 容器属性 */
  containerProps?: BoxProps;
}

/**
 * 开关组件
 * 自动适配主题颜色
 */
function Switch({label, containerProps, ...rest}: SwitchProps) {
  const theme = useTheme<Theme>();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...containerProps}>
      {label && (
        <Text variant="body" marginRight="s">
          {label}
        </Text>
      )}
      <RNSwitch
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primary,
        }}
        thumbColor={theme.colors.textInverse}
        ios_backgroundColor={theme.colors.border}
        {...rest}
      />
    </Box>
  );
}

export default Switch;
