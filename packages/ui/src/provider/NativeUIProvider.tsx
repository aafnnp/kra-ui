import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { theme as defaultTheme, darkTheme } from '../theme';
import type { Theme } from '../theme';
import type { ToastConfig } from '../components/Toast';
import { ToastHost, ToastProvider } from '../components/Toast';

type ColorMode = 'light' | 'dark';

interface ColorModeContextValue {
  /** 当前颜色模式 */
  colorMode: ColorMode;
  /** 切换亮/暗色模式 */
  toggleColorMode: () => void;
  /** 设置指定颜色模式 */
  setColorMode: (mode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextValue>({
  colorMode: 'light',
  toggleColorMode: () => {},
  setColorMode: () => {},
});

/**
 * 获取当前颜色模式及切换方法
 */
export function useColorMode(): ColorModeContextValue {
  return useContext(ColorModeContext);
}

interface NativeUIProviderProps {
  children: React.ReactNode;
  /** 自定义浅色主题，默认使用内置浅色主题 */
  lightTheme?: Theme;
  /** 自定义暗色主题，默认使用内置暗色主题 */
  darkTheme?: Theme;
  /** 初始颜色模式 */
  initialColorMode?: ColorMode;
  /** Toast 全局配置 */
  toastConfig?: ToastConfig;
}

/**
 * NativeUI 根 Provider
 * 封装 Restyle ThemeProvider，提供主题切换能力
 */
export function NativeUIProvider({
  children,
  lightTheme = defaultTheme,
  darkTheme: darkThemeProp = darkTheme,
  initialColorMode = 'light',
  toastConfig,
}: NativeUIProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(initialColorMode);

  const toggleColorMode = useCallback(() => {
    setColorMode(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const contextValue = useMemo(
    () => ({colorMode, toggleColorMode, setColorMode}),
    [colorMode, toggleColorMode],
  );

  const currentTheme = colorMode === 'light' ? lightTheme : darkThemeProp;

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        <ToastProvider config={toastConfig}>
          {children}
          <ToastHost />
        </ToastProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
