export const SELECT = 'select';
export const ZOOM_IN = 'zoom_in';
export const ZOOM_OUT = 'zoom_out';

export type Mode = typeof SELECT | typeof ZOOM_IN | typeof ZOOM_OUT;

export type VideoStats = {
  width: number,
  height: number,
  duration: number,
  frameCount: number,
  frameRate: number,
};
