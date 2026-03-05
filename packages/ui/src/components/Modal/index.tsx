import React, {createContext, useContext, useCallback} from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

/** 弹窗尺寸 */
type ModalSize = 'sm' | 'md' | 'lg' | 'full';

const sizeWidthMap: Record<ModalSize, number | string> = {
  sm: 0.65,
  md: 0.8,
  lg: 0.92,
  full: 1,
};

interface ModalContextValue {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  onClose: () => {},
});

export interface ModalProps {
  /** 是否显示 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 尺寸 */
  size?: ModalSize;
  /** 点击遮罩是否关闭 */
  closeOnOverlay?: boolean;
  /** 动画类型 */
  animationType?: 'none' | 'slide' | 'fade';
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 模态弹窗组件
 * 支持 size: sm, md, lg, full
 * 支持遮罩点击关闭和多种动画类型
 */
function Modal({
  visible,
  onClose,
  size = 'md',
  closeOnOverlay = true,
  animationType = 'fade',
  children,
}: ModalProps) {
  const theme = useTheme<Theme>();
  const screenWidth = Dimensions.get('window').width;

  const handleOverlayPress = useCallback(() => {
    if (closeOnOverlay) {
      onClose();
    }
  }, [closeOnOverlay, onClose]);

  const widthFactor = sizeWidthMap[size];
  const contentWidth =
    typeof widthFactor === 'number' ? screenWidth * widthFactor : screenWidth;

  const isFullScreen = size === 'full';

  return (
    <ModalContext.Provider value={{onClose}}>
      <RNModal
        visible={visible}
        transparent
        animationType={animationType}
        onRequestClose={onClose}
        statusBarTranslucent>
        <Pressable style={styles.overlay} onPress={handleOverlayPress}>
          <Pressable
            style={[
              styles.content,
              {
                width: contentWidth,
                backgroundColor: theme.colors.cardBackground,
                borderRadius: isFullScreen ? 0 : theme.borderRadii.l,
                maxHeight: isFullScreen ? '100%' : '85%',
              },
              isFullScreen && styles.fullScreen,
            ]}>
            {children}
          </Pressable>
        </Pressable>
      </RNModal>
    </ModalContext.Provider>
  );
}

export interface ModalHeaderProps extends BoxProps {
  /** 标题文字 */
  title?: string;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
}

/**
 * 弹窗头部组件
 * 支持标题和关闭按钮
 */
function ModalHeader({
  title,
  showClose = true,
  children,
  ...rest
}: ModalHeaderProps) {
  const {onClose} = useContext(ModalContext);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="m"
      borderBottomWidth={1}
      borderColor="border"
      {...rest}>
      <Box flex={1}>
        {title ? (
          <Text fontWeight="600" fontSize={18}>
            {title}
          </Text>
        ) : (
          children
        )}
      </Box>
      {showClose && (
        <Pressable
          onPress={onClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="关闭">
          <Text fontSize={18} color="textSecondary">
            ✕
          </Text>
        </Pressable>
      )}
    </Box>
  );
}

export interface ModalBodyProps extends BoxProps {}

/**
 * 弹窗内容区组件
 */
function ModalBody({children, ...rest}: ModalBodyProps) {
  return (
    <Box padding="m" flex={1} {...rest}>
      {children}
    </Box>
  );
}

export interface ModalFooterProps extends BoxProps {}

/**
 * 弹窗底部操作栏组件
 */
function ModalFooter({children, ...rest}: ModalFooterProps) {
  return (
    <Box
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center"
      padding="m"
      gap="s"
      borderTopWidth={1}
      borderColor="border"
      {...rest}>
      {children}
    </Box>
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    overflow: 'hidden',
  },
  fullScreen: {
    flex: 1,
  },
});

export {ModalHeader, ModalBody, ModalFooter};
export default Modal;
