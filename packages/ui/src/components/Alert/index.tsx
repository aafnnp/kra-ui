import React, {createContext, useContext, useMemo} from 'react';
import {
  createRestyleComponent,
  createVariant,
  type VariantProps,
} from '@shopify/restyle';
import {Pressable} from 'react-native';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  CloseIcon,
} from '../Icon/icons';

const AlertContainer = createRestyleComponent<
  VariantProps<Theme, 'alertVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'alertVariants'})], Box);

type AlertVariant = 'info' | 'success' | 'warning' | 'error';
type AlertSize = 'sm' | 'md';

type AlertIconRender = boolean | React.ReactNode;

type TextVariant = Exclude<keyof Theme['textVariants'], 'defaults'>;

export interface AlertProps extends BoxProps {
  /** 提示类型 */
  variant?: AlertVariant;
  /**
   * 状态类型（兼容旧版本）
   * @deprecated 请使用 variant
   */
  status?: AlertVariant;
  /** 尺寸 */
  size?: AlertSize;
  /** 标题 */
  title?: React.ReactNode;
  /** 提示内容 */
  message?: React.ReactNode;
  /**
   * 描述（兼容旧版本）
   * @deprecated 请使用 message
   */
  description?: React.ReactNode;
  /**
   * 图标
   * - true：使用内置图标
   * - ReactNode：使用自定义图标
   * - false：隐藏图标
   */
  icon?: AlertIconRender;
  /** 右侧操作区 */
  action?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
}

interface AlertContextValue {
  variant: AlertVariant;
  size: AlertSize;
  titleTextVariant: TextVariant;
  messageTextVariant: TextVariant;
  iconColor: keyof Theme['colors'];
  titleColor: keyof Theme['colors'];
  messageColor: keyof Theme['colors'];
  iconSize: number;
  gap: keyof Theme['spacing'];
  onClose?: () => void;
  closable: boolean;
}

const AlertContext = createContext<AlertContextValue | null>(null);

function useAlertContext() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('Alert compound components must be used within <Alert>');
  }
  return ctx;
}

function DefaultIcon({variant, size, colorKey}: {variant: AlertVariant; size: number; colorKey: keyof Theme['colors']}) {
  switch (variant) {
    case 'success':
      return <CheckCircleIcon size={size} color={colorKey} />;
    case 'warning':
      return <AlertTriangleIcon size={size} color={colorKey} />;
    case 'error':
      return <XCircleIcon size={size} color={colorKey} />;
    case 'info':
    default:
      return <InfoIcon size={size} color={colorKey} />;
  }
}

/**
 * 提示信息组件
 * 支持 variant: info, success, warning, error
 * 支持插槽：Alert.Icon / Alert.Title / Alert.Description / Alert.Action / Alert.Close
 */
function Alert({
  variant,
  status,
  size = 'md',
  title,
  message,
  description,
  icon = true,
  action,
  closable = false,
  onClose,
  children,
  ...rest
}: AlertProps) {
  const resolvedVariant: AlertVariant = (variant ?? status ?? 'info') as AlertVariant;
  const resolvedMessage = message ?? description;

  const iconColor: keyof Theme['colors'] = useMemo(() => {
    switch (resolvedVariant) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
      default:
        return 'primary';
    }
  }, [resolvedVariant]);

  const sizeToken = useMemo(() => {
    // Theme 在运行时由 Restyle Provider 注入，这里通过 Box/Text 的 token 使用即可；
    // token 名称固定为 theme.alertSizes.sm/md（在主题中已同步添加）
    const fallback = {
      paddingX: (size === 'sm' ? 's' : 'm') as keyof Theme['spacing'],
      paddingY: (size === 'sm' ? 's' : 'm') as keyof Theme['spacing'],
      gap: 's' as keyof Theme['spacing'],
      iconSize: size === 'sm' ? 16 : 18,
      radius: 'm' as keyof Theme['borderRadii'],
      titleTextVariant: 'label' as TextVariant,
      messageTextVariant: (size === 'sm' ? 'caption' : 'body') as TextVariant,
    };
    return fallback;
  }, [size]);

  const ctxValue: AlertContextValue = useMemo(
    () => ({
      variant: resolvedVariant,
      size,
      titleTextVariant: sizeToken.titleTextVariant,
      messageTextVariant: sizeToken.messageTextVariant,
      iconColor,
      titleColor: iconColor,
      messageColor: iconColor,
      iconSize: sizeToken.iconSize,
      gap: sizeToken.gap,
      onClose,
      closable,
    }),
    [closable, iconColor, onClose, resolvedVariant, size, sizeToken],
  );

  return (
    <AlertContext.Provider value={ctxValue}>
      <AlertContainer
        variant={resolvedVariant}
        paddingHorizontal={sizeToken.paddingX}
        paddingVertical={sizeToken.paddingY}
        borderRadius={sizeToken.radius}
        {...rest}
        accessibilityRole="alert"
      >
        {children ? (
          children
        ) : (
          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            gap={sizeToken.gap}
          >
            {icon ? (
              <Box>
                {typeof icon === 'boolean' ? (
                  <DefaultIcon
                    variant={resolvedVariant}
                    size={sizeToken.iconSize}
                    colorKey={iconColor}
                  />
                ) : (
                  icon
                )}
              </Box>
            ) : null}

            <Box flex={1}>
              {title ? (
                <Text
                  variant={sizeToken.titleTextVariant}
                  fontWeight="600"
                  color={iconColor}
                >
                  {title}
                </Text>
              ) : null}

              {resolvedMessage ? (
                <Text
                  variant={sizeToken.messageTextVariant}
                  color={iconColor}
                  marginTop={title ? 'xs' : undefined}
                >
                  {resolvedMessage}
                </Text>
              ) : null}
            </Box>

            {action ? <Box>{action}</Box> : null}

            {closable ? (
              <Pressable
                onPress={onClose}
                accessibilityLabel="关闭提示"
                hitSlop={8}
              >
                <CloseIcon size={sizeToken.iconSize} color={iconColor} />
              </Pressable>
            ) : null}
          </Box>
        )}
      </AlertContainer>
    </AlertContext.Provider>
  );
}

function AlertIcon({children}: {children?: React.ReactNode}) {
  const {variant, iconColor, iconSize} = useAlertContext();
  if (children === null) return null;
  return (
    <Box>
      {children ? (
        children
      ) : (
        <DefaultIcon
          variant={variant}
          size={iconSize}
          colorKey={iconColor}
        />
      )}
    </Box>
  );
}

function AlertTitle({children}: {children?: React.ReactNode}) {
  const {titleTextVariant, titleColor} = useAlertContext();
  if (!children) return null;
  return (
    <Text
      variant={titleTextVariant}
      fontWeight="600"
      color={titleColor}
    >
      {children}
    </Text>
  );
}

function AlertDescription({children}: {children?: React.ReactNode}) {
  const {messageTextVariant, messageColor} = useAlertContext();
  if (!children) return null;
  return (
    <Text
      variant={messageTextVariant}
      color={messageColor}
    >
      {children}
    </Text>
  );
}

function AlertAction({children}: {children?: React.ReactNode}) {
  if (!children) return null;
  return <Box>{children}</Box>;
}

function AlertClose() {
  const {closable, onClose, iconColor, iconSize} = useAlertContext();
  if (!closable) return null;
  return (
    <Pressable
      onPress={onClose}
      accessibilityLabel="关闭提示"
      hitSlop={8}
    >
      <CloseIcon size={iconSize} color={iconColor} />
    </Pressable>
  );
}

type AlertComponent = React.FC<AlertProps> & {
  Icon: typeof AlertIcon;
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
  Action: typeof AlertAction;
  Close: typeof AlertClose;
};

const AlertWithSlots = Alert as unknown as AlertComponent;
AlertWithSlots.Icon = AlertIcon;
AlertWithSlots.Title = AlertTitle;
AlertWithSlots.Description = AlertDescription;
AlertWithSlots.Action = AlertAction;
AlertWithSlots.Close = AlertClose;

export default AlertWithSlots;
