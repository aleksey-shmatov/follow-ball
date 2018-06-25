export const SELECT = 'select';
export const ZOOM_IN = 'zoom_in';
export const ZOOM_OUT = 'zoom_out';
export const PAN = 'pan';

export type Mode = typeof SELECT | typeof ZOOM_IN | typeof ZOOM_OUT | typeof PAN;

export type VideoStats = {
  width: number,
  height: number,
  duration: number,
  frameCount: number,
  frameRate: number,
};

export type Circle = {x: number, y: number, r: number};
export type Rect = {x: number, y: number, width: number, height: number};

export const FOUND = 'found';
export const OBSCURED = 'obscured';
export const OUT = 'out';

export type FrameType = typeof FOUND | typeof OBSCURED | typeof OUT;

export type FoundData = {
  readonly type: typeof FOUND,
  readonly area: Circle,
};

export type ObscuredData = {
  readonly type: typeof OBSCURED,
  readonly area: Rect,
};

export const TOP = 'top';
export const LEFT = 'left';
export const RIGHT = 'right';
export const BOTTOM = 'bottom';

export type Direction = typeof TOP | typeof BOTTOM | typeof RIGHT | typeof LEFT;

export type OutData = {
  readonly type: typeof OUT,
  readonly direction: Direction,
};

export type FrameData = FoundData | ObscuredData | OutData;
