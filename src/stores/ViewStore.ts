import { observable, action } from 'mobx';
import { Mode, SELECT, ZOOM_IN, ZOOM_OUT } from './Model';

class ViewStore {

  @observable zoom = 1;

  @observable mode: Mode = SELECT;

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
}

export default ViewStore;
