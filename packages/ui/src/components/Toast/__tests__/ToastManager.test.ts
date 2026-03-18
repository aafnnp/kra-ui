import {
    createToastItem,
    findDedupTarget,
    getVisibleToasts,
    toastReducer,
    type ToastState,
} from '../ToastManager';

describe('ToastManager', () => {
  const createDeps = () => {
    let now = 0;
    let id = 0;
    return {
      deps: {
        now: () => now,
        generateId: () => `t_${++id}`,
      },
      setNow: (v: number) => {
        now = v;
      },
    };
  };

  test('toastReducer: add/dismiss/clearAll', () => {
    const state: ToastState = {toasts: []};
    const next = toastReducer(state, {
      type: 'ADD',
      item: {
        id: '1',
        createdAt: 0,
        message: 'a',
        status: 'info',
        placement: 'top',
        duration: 3000,
        closable: true,
      },
    });
    expect(next.toasts).toHaveLength(1);

    const dismissed = toastReducer(next, {type: 'DISMISS', id: '1'});
    expect(dismissed.toasts).toHaveLength(0);

    const cleared = toastReducer(
      {toasts: [{...next.toasts[0], id: '2'}]},
      {type: 'CLEAR_ALL'},
    );
    expect(cleared.toasts).toHaveLength(0);
  });

  test('getVisibleToasts: maxVisible=3 per placement, FIFO by createdAt', () => {
    const toasts = [
      {id: '1', createdAt: 1, message: 'a', status: 'info', placement: 'top', duration: 1, closable: true},
      {id: '2', createdAt: 2, message: 'b', status: 'info', placement: 'top', duration: 1, closable: true},
      {id: '3', createdAt: 3, message: 'c', status: 'info', placement: 'top', duration: 1, closable: true},
      {id: '4', createdAt: 4, message: 'd', status: 'info', placement: 'top', duration: 1, closable: true},
      {id: '5', createdAt: 5, message: 'e', status: 'info', placement: 'bottom', duration: 1, closable: true},
    ] as const;

    const topVisible = getVisibleToasts([...toasts] as any, 'top', {maxVisible: 3});
    expect(topVisible.map(t => t.id)).toEqual(['1', '2', '3']);

    const bottomVisible = getVisibleToasts([...toasts] as any, 'bottom', {maxVisible: 3});
    expect(bottomVisible.map(t => t.id)).toEqual(['5']);
  });

  test('findDedupTarget: dedup within interval by status+message', () => {
    const {deps, setNow} = createDeps();
    setNow(1000);
    const item1 = createToastItem({message: 'same', status: 'success'}, {dedupInterval: 1000}, deps);
    const item2 = createToastItem({message: 'diff', status: 'success'}, {dedupInterval: 1000}, deps);

    setNow(1500);
    const target = findDedupTarget([item1, item2], {message: 'same', status: 'success'}, {dedupInterval: 1000}, 1500);
    expect(target?.id).toBe(item1.id);

    const none = findDedupTarget([item1], {message: 'same', status: 'error'}, {dedupInterval: 1000}, 1500);
    expect(none).toBeUndefined();
  });

  test('findDedupTarget: disabled dedup returns undefined', () => {
    const {deps, setNow} = createDeps();
    setNow(1000);
    const item1 = createToastItem({message: 'same', status: 'success'}, {enableDedup: false}, deps);
    const target = findDedupTarget([item1], {message: 'same', status: 'success'}, {enableDedup: false}, 1100);
    expect(target).toBeUndefined();
  });
});

