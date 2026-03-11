import React from 'react';
import {Path, Line, Circle, Polyline, Rect, Polygon} from 'react-native-svg';
import {createIcon} from './index';

// ============================================================
// 导航类图标
// ============================================================

/** 上箭头（V 形） */
export const ChevronUpIcon = createIcon({
  displayName: 'ChevronUpIcon',
  render: () => React.createElement(Polyline, {points: '6 15 12 9 18 15'}),
});

/** 下箭头（V 形） */
export const ChevronDownIcon = createIcon({
  displayName: 'ChevronDownIcon',
  render: () => React.createElement(Polyline, {points: '6 9 12 15 18 9'}),
});

/** 左箭头（V 形） */
export const ChevronLeftIcon = createIcon({
  displayName: 'ChevronLeftIcon',
  render: () => React.createElement(Polyline, {points: '15 18 9 12 15 6'}),
});

/** 右箭头（V 形） */
export const ChevronRightIcon = createIcon({
  displayName: 'ChevronRightIcon',
  render: () => React.createElement(Polyline, {points: '9 18 15 12 9 6'}),
});

/** 左箭头（直线） */
export const ArrowLeftIcon = createIcon({
  displayName: 'ArrowLeftIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '19', y1: '12', x2: '5', y2: '12'}),
      React.createElement(Polyline, {points: '12 19 5 12 12 5'}),
    ),
});

/** 右箭头（直线） */
export const ArrowRightIcon = createIcon({
  displayName: 'ArrowRightIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '5', y1: '12', x2: '19', y2: '12'}),
      React.createElement(Polyline, {points: '12 5 19 12 12 19'}),
    ),
});

/** 上箭头（直线） */
export const ArrowUpIcon = createIcon({
  displayName: 'ArrowUpIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '12', y1: '19', x2: '12', y2: '5'}),
      React.createElement(Polyline, {points: '5 12 12 5 19 12'}),
    ),
});

/** 下箭头（直线） */
export const ArrowDownIcon = createIcon({
  displayName: 'ArrowDownIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '12', y1: '5', x2: '12', y2: '19'}),
      React.createElement(Polyline, {points: '19 12 12 19 5 12'}),
    ),
});

// ============================================================
// 操作类图标
// ============================================================

/** 关闭 / X */
export const CloseIcon = createIcon({
  displayName: 'CloseIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '18', y1: '6', x2: '6', y2: '18'}),
      React.createElement(Line, {x1: '6', y1: '6', x2: '18', y2: '18'}),
    ),
});

/** 对勾 */
export const CheckIcon = createIcon({
  displayName: 'CheckIcon',
  render: () => React.createElement(Polyline, {points: '20 6 9 17 4 12'}),
});

/** 加号 */
export const PlusIcon = createIcon({
  displayName: 'PlusIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '12', y1: '5', x2: '12', y2: '19'}),
      React.createElement(Line, {x1: '5', y1: '12', x2: '19', y2: '12'}),
    ),
});

/** 减号 */
export const MinusIcon = createIcon({
  displayName: 'MinusIcon',
  render: () => React.createElement(Line, {x1: '5', y1: '12', x2: '19', y2: '12'}),
});

/** 搜索 */
export const SearchIcon = createIcon({
  displayName: 'SearchIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Circle, {cx: '11', cy: '11', r: '8'}),
      React.createElement(Line, {x1: '21', y1: '21', x2: '16.65', y2: '16.65'}),
    ),
});

/** 编辑 / 铅笔 */
export const EditIcon = createIcon({
  displayName: 'EditIcon',
  d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'}),
      React.createElement(Path, {d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'}),
    ),
});

/** 删除 / 垃圾桶 */
export const TrashIcon = createIcon({
  displayName: 'TrashIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Polyline, {points: '3 6 5 6 21 6'}),
      React.createElement(Path, {d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'}),
      React.createElement(Line, {x1: '10', y1: '11', x2: '10', y2: '17'}),
      React.createElement(Line, {x1: '14', y1: '11', x2: '14', y2: '17'}),
    ),
});

/** 复制 */
export const CopyIcon = createIcon({
  displayName: 'CopyIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Rect, {x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2'}),
      React.createElement(Path, {d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'}),
    ),
});

// ============================================================
// 状态类图标
// ============================================================

/** 信息（圆圈 i） */
export const InfoIcon = createIcon({
  displayName: 'InfoIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Circle, {cx: '12', cy: '12', r: '10'}),
      React.createElement(Line, {x1: '12', y1: '16', x2: '12', y2: '12'}),
      React.createElement(Line, {x1: '12', y1: '8', x2: '12.01', y2: '8'}),
    ),
});

/** 成功（圆圈对勾） */
export const CheckCircleIcon = createIcon({
  displayName: 'CheckCircleIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14'}),
      React.createElement(Polyline, {points: '22 4 12 14.01 9 11.01'}),
    ),
});

/** 警告（三角感叹号） */
export const AlertTriangleIcon = createIcon({
  displayName: 'AlertTriangleIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'}),
      React.createElement(Line, {x1: '12', y1: '9', x2: '12', y2: '13'}),
      React.createElement(Line, {x1: '12', y1: '17', x2: '12.01', y2: '17'}),
    ),
});

/** 错误（圆圈 X） */
export const XCircleIcon = createIcon({
  displayName: 'XCircleIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Circle, {cx: '12', cy: '12', r: '10'}),
      React.createElement(Line, {x1: '15', y1: '9', x2: '9', y2: '15'}),
      React.createElement(Line, {x1: '9', y1: '9', x2: '15', y2: '15'}),
    ),
});

// ============================================================
// UI 类图标
// ============================================================

/** 菜单（三横线） */
export const MenuIcon = createIcon({
  displayName: 'MenuIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Line, {x1: '3', y1: '12', x2: '21', y2: '12'}),
      React.createElement(Line, {x1: '3', y1: '6', x2: '21', y2: '6'}),
      React.createElement(Line, {x1: '3', y1: '18', x2: '21', y2: '18'}),
    ),
});

/** 更多（水平三点） */
export const MoreHorizontalIcon = createIcon({
  displayName: 'MoreHorizontalIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Circle, {cx: '12', cy: '12', r: '1'}),
      React.createElement(Circle, {cx: '19', cy: '12', r: '1'}),
      React.createElement(Circle, {cx: '5', cy: '12', r: '1'}),
    ),
});

/** 更多（垂直三点） */
export const MoreVerticalIcon = createIcon({
  displayName: 'MoreVerticalIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Circle, {cx: '12', cy: '12', r: '1'}),
      React.createElement(Circle, {cx: '12', cy: '5', r: '1'}),
      React.createElement(Circle, {cx: '12', cy: '19', r: '1'}),
    ),
});

/** 眼睛（可见） */
export const EyeIcon = createIcon({
  displayName: 'EyeIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'}),
      React.createElement(Circle, {cx: '12', cy: '12', r: '3'}),
    ),
});

/** 眼睛关闭（不可见） */
export const EyeOffIcon = createIcon({
  displayName: 'EyeOffIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'}),
      React.createElement(Line, {x1: '1', y1: '1', x2: '23', y2: '23'}),
    ),
});

/** 心形 */
export const HeartIcon = createIcon({
  displayName: 'HeartIcon',
  d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
});

/** 星形 */
export const StarIcon = createIcon({
  displayName: 'StarIcon',
  render: () =>
    React.createElement(Polygon, {
      points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
    }),
});

/** 设置 / 齿轮 */
export const SettingsIcon = createIcon({
  displayName: 'SettingsIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Circle, {cx: '12', cy: '12', r: '3'}),
      React.createElement(Path, {d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'}),
    ),
});

/** 主页 */
export const HomeIcon = createIcon({
  displayName: 'HomeIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'}),
      React.createElement(Polyline, {points: '9 22 9 12 15 12 15 22'}),
    ),
});

/** 用户 */
export const UserIcon = createIcon({
  displayName: 'UserIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'}),
      React.createElement(Circle, {cx: '12', cy: '7', r: '4'}),
    ),
});

/** 刷新 */
export const RefreshIcon = createIcon({
  displayName: 'RefreshIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Polyline, {points: '23 4 23 10 17 10'}),
      React.createElement(Polyline, {points: '1 20 1 14 7 14'}),
      React.createElement(Path, {d: 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'}),
    ),
});

/** 下载 */
export const DownloadIcon = createIcon({
  displayName: 'DownloadIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'}),
      React.createElement(Polyline, {points: '7 10 12 15 17 10'}),
      React.createElement(Line, {x1: '12', y1: '15', x2: '12', y2: '3'}),
    ),
});

/** 分享 / 外部链接 */
export const ExternalLinkIcon = createIcon({
  displayName: 'ExternalLinkIcon',
  render: () =>
    React.createElement(React.Fragment, null,
      React.createElement(Path, {d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'}),
      React.createElement(Polyline, {points: '15 3 21 3 21 9'}),
      React.createElement(Line, {x1: '10', y1: '14', x2: '21', y2: '3'}),
    ),
});
