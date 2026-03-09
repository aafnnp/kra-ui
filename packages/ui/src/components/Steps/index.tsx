import React, {useCallback, useMemo} from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

/** 步骤状态 */
type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/** 步骤方向 */
type StepOrientation = 'horizontal' | 'vertical';

/** 步骤尺寸 */
type StepSize = 'sm' | 'md' | 'lg';

/** 尺寸配置映射 */
const SIZE_CONFIG: Record<StepSize, {circle: number; fontSize: number; titleSize: number; descSize: number}> = {
  sm: {circle: 24, fontSize: 12, titleSize: 12, descSize: 10},
  md: {circle: 32, fontSize: 14, titleSize: 14, descSize: 12},
  lg: {circle: 40, fontSize: 18, titleSize: 16, descSize: 14},
};

/**
 * 步骤条数据项
 * @description 每一步的配置信息
 */
export interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 自定义图标，替换默认序号/对勾 */
  icon?: React.ReactNode;
  /** 手动指定步骤状态，不传则根据 current 自动推断 */
  status?: StepStatus;
}

/**
 * Steps 步骤条组件 Props
 * @description 引导用户按照流程完成任务的导航条
 */
export interface StepsProps extends BoxProps {
  /** 当前步骤索引（从 0 开始） */
  current?: number;
  /** 布局方向 */
  orientation?: StepOrientation;
  /** 点击步骤的回调，传入后步骤可点击 */
  onChange?: (index: number) => void;
  /** 步骤数据列表 */
  items: StepItem[];
  /** 尺寸 */
  size?: StepSize;
}

/**
 * 根据 current 索引推断步骤状态
 */
function resolveStatus(index: number, current: number, itemStatus?: StepStatus): StepStatus {
  if (itemStatus) return itemStatus;
  if (index < current) return 'finish';
  if (index === current) return 'process';
  return 'wait';
}

/** 单个步骤的圆圈指示器 */
function StepIndicator({
  index,
  status,
  size,
  icon,
}: {
  index: number;
  status: StepStatus;
  size: StepSize;
  icon?: React.ReactNode;
}) {
  const theme = useTheme<Theme>();
  const config = SIZE_CONFIG[size];

  const {bgColor, borderColor, contentColor} = useMemo(() => {
    switch (status) {
      case 'finish':
        return {
          bgColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          contentColor: theme.colors.textInverse,
        };
      case 'process':
        return {
          bgColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          contentColor: theme.colors.textInverse,
        };
      case 'error':
        return {
          bgColor: theme.colors.transparent,
          borderColor: theme.colors.error,
          contentColor: theme.colors.error,
        };
      default:
        return {
          bgColor: theme.colors.transparent,
          borderColor: theme.colors.border,
          contentColor: theme.colors.textMuted,
        };
    }
  }, [status, theme]);

  const defaultContent = status === 'finish' ? '✓' : String(index + 1);

  return (
    <Box
      width={config.circle}
      height={config.circle}
      borderRadius="full"
      borderWidth={2}
      alignItems="center"
      justifyContent="center"
      style={{backgroundColor: bgColor, borderColor}}
    >
      {icon ?? (
        <Text style={{fontSize: config.fontSize, color: contentColor, fontWeight: '600'}}>
          {defaultContent}
        </Text>
      )}
    </Box>
  );
}

/** 步骤间连接线 */
function StepConnector({
  status,
  orientation,
  size,
}: {
  status: 'finish' | 'pending';
  orientation: StepOrientation;
  size: StepSize;
}) {
  const isFinish = status === 'finish';

  if (orientation === 'horizontal') {
    return (
      <Box
        height={2}
        marginHorizontal="xs"
        backgroundColor={isFinish ? 'primary' : 'border'}
      />
    );
  }

  return (
    <Box
      width={2}
      flex={1}
      minHeight={24}
      marginVertical="xs"
      backgroundColor={isFinish ? 'primary' : 'border'}
    />
  );
}

/**
 * Steps 步骤条组件
 * @description 引导用户按照流程完成任务的导航条，支持水平/垂直方向、自定义图标、点击跳转和错误状态
 */
function Steps({
  current = 0,
  orientation = 'horizontal',
  onChange,
  items,
  size = 'md',
  ...rest
}: StepsProps) {
  const isHorizontal = orientation === 'horizontal';

  const handlePress = useCallback(
    (index: number) => {
      onChange?.(index);
    },
    [onChange],
  );

  const resolvedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        resolvedStatus: resolveStatus(index, current, item.status),
      })),
    [items, current],
  );

  if (isHorizontal) {
    return (
      <Box flexDirection="row" alignItems="flex-start" {...rest}>
        {resolvedItems.map((item, index) => (
          <React.Fragment key={index}>
            <HorizontalStep
              index={index}
              item={item}
              status={item.resolvedStatus}
              size={size}
              isClickable={!!onChange}
              onPress={handlePress}
            />
            {index < resolvedItems.length - 1 && (
              <Box
                flex={1}
                justifyContent="center"
                style={{height: SIZE_CONFIG[size].circle}}
              >
                <StepConnector
                  status={item.resolvedStatus === 'finish' ? 'finish' : 'pending'}
                  orientation="horizontal"
                  size={size}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    );
  }

  return (
    <Box {...rest}>
      {resolvedItems.map((item, index) => (
        <React.Fragment key={index}>
          <VerticalStep
            index={index}
            item={item}
            status={item.resolvedStatus}
            size={size}
            isClickable={!!onChange}
            onPress={handlePress}
            isLast={index === resolvedItems.length - 1}
          />
        </React.Fragment>
      ))}
    </Box>
  );
}

/** 水平布局下的单个步骤 */
function HorizontalStep({
  index,
  item,
  status,
  size,
  isClickable,
  onPress,
}: {
  index: number;
  item: StepItem;
  status: StepStatus;
  size: StepSize;
  isClickable: boolean;
  onPress: (index: number) => void;
}) {
  const config = SIZE_CONFIG[size];
  const isActive = status === 'process' || status === 'finish';

  const content = (
    <Box alignItems="center" minWidth={config.circle * 2}>
      <StepIndicator index={index} status={status} size={size} icon={item.icon} />
      <Text
        marginTop="xs"
        style={{
          fontSize: config.titleSize,
          fontWeight: isActive ? '600' : '400',
        }}
        color={status === 'error' ? 'error' : isActive ? 'textPrimary' : 'textMuted'}
        textAlign="center"
      >
        {item.title}
      </Text>
      {item.description && (
        <Text
          marginTop="xs"
          style={{fontSize: config.descSize}}
          color={status === 'error' ? 'error' : 'textSecondary'}
          textAlign="center"
        >
          {item.description}
        </Text>
      )}
    </Box>
  );

  if (isClickable) {
    return (
      <Pressable
        onPress={() => onPress(index)}
        accessibilityRole="button"
        accessibilityLabel={`步骤 ${index + 1}: ${item.title}`}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

/** 垂直布局下的单个步骤 */
function VerticalStep({
  index,
  item,
  status,
  size,
  isClickable,
  onPress,
  isLast,
}: {
  index: number;
  item: StepItem;
  status: StepStatus;
  size: StepSize;
  isClickable: boolean;
  onPress: (index: number) => void;
  isLast: boolean;
}) {
  const config = SIZE_CONFIG[size];
  const isActive = status === 'process' || status === 'finish';

  const stepRow = (
    <Box flexDirection="row" alignItems="flex-start">
      <Box alignItems="center">
        <StepIndicator index={index} status={status} size={size} icon={item.icon} />
        {!isLast && (
          <StepConnector
            status={status === 'finish' ? 'finish' : 'pending'}
            orientation="vertical"
            size={size}
          />
        )}
      </Box>
      <Box flex={1} marginLeft="s" paddingBottom={isLast ? '0' : 'l'}>
        <Text
          style={{
            fontSize: config.titleSize,
            fontWeight: isActive ? '600' : '400',
            lineHeight: config.circle,
          }}
          color={status === 'error' ? 'error' : isActive ? 'textPrimary' : 'textMuted'}
        >
          {item.title}
        </Text>
        {item.description && (
          <Text
            marginTop="xs"
            style={{fontSize: config.descSize}}
            color={status === 'error' ? 'error' : 'textSecondary'}
          >
            {item.description}
          </Text>
        )}
      </Box>
    </Box>
  );

  if (isClickable) {
    return (
      <Pressable
        onPress={() => onPress(index)}
        accessibilityRole="button"
        accessibilityLabel={`步骤 ${index + 1}: ${item.title}`}
      >
        {stepRow}
      </Pressable>
    );
  }

  return stepRow;
}

export default Steps;
