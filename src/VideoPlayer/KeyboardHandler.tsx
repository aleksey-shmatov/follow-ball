import * as React from 'react';
import VideoStore from '../stores/VideoStore';
import ViewStore from '../stores/ViewStore';

type Props = {
  videoStore: VideoStore,
  viewStore: ViewStore,
};

class KeyboardHandler extends React.Component<Props> {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e: KeyboardEvent) => {
    // B - key
    if (e.keyCode === 66) {
      this.props.videoStore.prevFrame();
    }
    // Spacebar
    if (e.keyCode === 32) {
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
  }

  render() {
    return null;
  }
}

export default KeyboardHandler;
