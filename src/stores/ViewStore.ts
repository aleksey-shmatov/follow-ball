import { observable, action } from 'mobx';
import { Mode, SELECT, ZOOM_IN, ZOOM_OUT, PAN } from './Model';

class ViewStore {
  @observable zoom = 1;

  @observable mode: Mode = SELECT;

  private modeBeforePan: Mode = SELECT;

  @action
  zoomIn = () => {
    this.zoom = Math.min(5, this.zoom + 0.5);
  }

  @action
  zoomOut = () => {
    this.zoom = Math.max(1, this.zoom - 0.5);
  }

  @action
  toggleZoomIn = () => {
    this.mode = this.mode === ZOOM_IN ? SELECT : ZOOM_IN;
  }

  @action
  toggleZoomOut = () => {
    this.mode = this.mode === ZOOM_OUT ? SELECT : ZOOM_OUT;
  }

  @action
  toggleSelect = () => {
    this.mode = SELECT;
  }

  @action
  togglePan = () => {
    if (this.mode !== PAN) {
      this.modeBeforePan = this.mode;
      this.mode = PAN;
    } else {
      this.mode = this.modeBeforePan;
    }
  }
}

export default ViewStore;
