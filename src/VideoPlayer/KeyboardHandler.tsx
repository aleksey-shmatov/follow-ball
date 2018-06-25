import * as React from 'react';
import VideoStore from '../stores/VideoStore';
import ViewStore from '../stores/ViewStore';
import { PAN, SELECT, OUT, Direction, TOP, BOTTOM, LEFT, RIGHT } from 'stores/Model';

type Props = {
  videoStore: VideoStore,
  viewStore: ViewStore,
};

class KeyboardHandler extends React.Component<Props> {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  }

  handleKeydown = (e: KeyboardEvent) => {
    if (this.props.viewStore.mode === PAN) {
      return;
    }
    // B - key
    if (e.keyCode === 66) {
      this.props.videoStore.prevFrame();
    }
    // Spacebar
    if (e.keyCode === 32) {
      if (!this.props.videoStore.frameData && this.props.videoStore.prevFrameData) {
        this.props.videoStore.setFrameData(this.props.videoStore.prevFrameData);
      }
      this.props.videoStore.nextFrame();
    }
    // Z - key
    if (e.keyCode === 90) {
      this.props.viewStore.toggleZoomIn();
    }
    // X - key
    if (e.keyCode === 88) {
      this.props.viewStore.toggleZoomOut();
    }
    // S - key
    if (e.keyCode === 83) {
      this.props.viewStore.toggleSelect();
    }
    // Shift
    if (e.keyCode === 16) {
      this.props.viewStore.togglePan();
    }

    if (this.props.viewStore.mode === SELECT) {
      // Top
      if (e.keyCode === 38) {
        this.setOut(TOP);
        e.preventDefault();
      }
      // Down
      if (e.keyCode === 40) {
        this.setOut(BOTTOM);
        e.preventDefault();
      }
      // Left
      if (e.keyCode === 37) {
        this.setOut(LEFT);
        e.preventDefault();
      }
      // Top
      if (e.keyCode === 39) {
        this.setOut(RIGHT);
        e.preventDefault();
      }
    }
  }

  setOut = (direction: Direction) => {
    this.props.videoStore.setFrameData({
      type: OUT,
      direction,
    });
    this.props.videoStore.nextFrame();
  }

  handleKeyup = (e: KeyboardEvent) => {
    // Shift
    if (e.keyCode === 16) {
      this.props.viewStore.togglePan();
    }
  }

  render() {
    return null;
  }
}

export default KeyboardHandler;
