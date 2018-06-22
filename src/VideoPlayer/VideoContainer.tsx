import * as React from 'react';
import { observer } from 'mobx-react';
import VideoLayer from './VideoLayer';
import { ZOOM_IN, ZOOM_OUT } from 'stores/Model';
import VideoStore from 'stores/VideoStore';
import ViewStore from 'stores/ViewStore';

type Props = {
  videoStore: VideoStore,
  viewStore: ViewStore,
};

type Point = {
  x: number,
  y: number,
};

@observer
class VideoContainer extends React.Component<Props> {
  videoPane: HTMLElement;
  videoContainer: HTMLElement;
  newScroll: Point | null = null;
  startScroll: Point;
  startPoint: Point;

  setVideoPane = (el: HTMLElement | null) => {
    if (el) {
      this.videoPane = el;
    }
  }

  setVideoContainer = (el: HTMLElement | null) => {
    if (el) {
      this.videoContainer = el;
    }
  }

  handleClick = (event: React.MouseEvent) => {
    const { zoom, mode} = this.props.viewStore;
    if (mode === ZOOM_IN) {
      this.props.viewStore.zoomIn();
    } else if (mode === ZOOM_OUT) {
      this.props.viewStore.zoomOut();
    }
    const newZoom = this.props.viewStore.zoom;
    if (newZoom !== zoom) {
      const rect = this.videoPane.getBoundingClientRect();
      const x = -rect.left + (event.clientX - rect.left) * (newZoom - zoom) / zoom;
      const y = -rect.top + (event.clientY - rect.top) * (newZoom - zoom) / zoom;
      // Need to scroll to keep x, y at same position
      this.setState({
        zoom: zoom,
      });
      this.newScroll = { x, y};
    }
  }

  handleMouseDown = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      this.startScroll = { x: this.videoContainer.scrollLeft, y: this.videoContainer.scrollTop };
      this.startPoint = { x: event.clientX, y: event.clientY };
      window.addEventListener('mousemove', this.handlePan);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  handlePan = (event: MouseEvent) => {
    this.videoContainer.scrollLeft = this.startScroll.x + event.clientX - this.startPoint.x;
    this.videoContainer.scrollTop = this.startScroll.y + event.clientY - this.startPoint.y;
  }

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handlePan);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  componentDidUpdate() {
    if (this.newScroll) {
      this.videoContainer.scrollLeft = this.newScroll.x;
      this.videoContainer.scrollTop = this.newScroll.y;
    }
  }

  render() {
    const { mode, zoom } = this.props.viewStore;
    let cursor = 'default';
    if (mode === ZOOM_IN) {
      cursor = 'zoom-in';
    }
    if (mode === ZOOM_OUT) {
      cursor = 'zoom-out';
    }
    return (
      <div ref={this.setVideoContainer} className="video-container">
        <div
          ref={this.setVideoPane}
          style={{cursor, width: `${zoom * 100}%`}}
          onMouseDown={this.handleMouseDown}
          onClick={this.handleClick}
        >
          <VideoLayer
            videoStore={this.props.videoStore}
            source="./classification_test_video.mp4"
          />
        </div>
      </div>);
  }
}

export default VideoContainer;
