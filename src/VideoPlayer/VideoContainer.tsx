import * as React from 'react';
import { observer } from 'mobx-react';
import VideoLayer from './VideoLayer';
import { ZOOM_IN, ZOOM_OUT, SELECT, PAN, FOUND, OBSCURED } from 'stores/Model';
import VideoStore from 'stores/VideoStore';
import ViewStore from 'stores/ViewStore';
import ReactResizeDetector from 'react-resize-detector';
import GraphicsLayer from './GraphicsLayer';

type Props = {
  videoStore: VideoStore,
  viewStore: ViewStore,
};

type Point = {
  x: number,
  y: number,
};

const cursors = {
  [SELECT]: 'default',
  [ZOOM_IN]: 'zoom-in',
  [ZOOM_OUT]: 'zoom-out',
  [PAN]: 'all-scroll',
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

  handleMouseDown = (event: React.MouseEvent) => {
    this.startPoint = { x: event.clientX, y: event.clientY };
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    if (this.props.viewStore.mode === PAN) {
      this.startScroll = { x: this.videoContainer.scrollLeft, y: this.videoContainer.scrollTop };
    }
  }

  handleSelect = (event: MouseEvent, commit: boolean = false) => {
    if (this.props.viewStore.mode === SELECT) {
      const rect = this.videoPane.getBoundingClientRect();
      let point = this.clipPoint({x: event.clientX, y: event.clientY}, rect);
      let delta = {x: point.x - this.startPoint.x, y: point.y - this.startPoint.y};
      if (delta.x === 0 && delta.y === 0 && commit) {
        // Point
        point = this.transformPoint(point, rect);
        this.props.videoStore.setFrameData({
          type: FOUND,
          area: {
            x: point.x,
            y: point.y,
            r: 100,
          },
        });
        if (commit) {
          this.props.videoStore.nextFrame();
        }
      } else {
        // Rect
        const startPoint = this.transformPoint(this.startPoint, rect);
        point = this.transformPoint(point, rect);
        delta = { x: point.x - startPoint.x, y: point.y - startPoint.y};
        if (delta.x < 0) {
          delta.x = -delta.x;
          startPoint.x = startPoint.x - delta.x;
        }
        if (delta.y < 0 ) {
          delta.y = -delta.y;
          startPoint.y = startPoint.y - delta.y;
        }
        this.props.videoStore.setFrameData({
          type: OBSCURED,
          area: {
            x: startPoint.x,
            y: startPoint.y,
            width: delta.x,
            height: delta.y,
          },
        });
        if (commit) {
          this.props.videoStore.nextFrame();
        }
      }
    }
  }

  handleMouseMove = (event: MouseEvent) => {
    if (this.props.viewStore.mode === PAN) {
      this.videoContainer.scrollLeft = this.startScroll.x + event.clientX - this.startPoint.x;
      this.videoContainer.scrollTop = this.startScroll.y + event.clientY - this.startPoint.y;
    }
    this.handleSelect(event);
  }

  clipPoint = (point: Point, rect: ClientRect) => {
    const x = Math.min(Math.max(point.x, rect.left), rect.right);
    const y = Math.min(Math.max(point.y, rect.top), rect.bottom);
    return { x, y };
  }

  transformPoint = (point: Point, rect: ClientRect ) => {
    const x = ((point.x - rect.left) / rect.width) * this.props.videoStore.stats.width;
    const y = ((point.y - rect.top) / rect.height) * this.props.videoStore.stats.height;
    return { x, y };
  }

  handleMouseUp = (event: MouseEvent) => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    this.handleSelect(event, true);
    if (this.props.viewStore.mode === ZOOM_IN || this.props.viewStore.mode === ZOOM_OUT) {
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
        this.newScroll = { x, y};
        this.setState({
          zoom: zoom,
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.newScroll) {
      this.videoContainer.scrollLeft = this.newScroll.x;
      this.videoContainer.scrollTop = this.newScroll.y;
    }
    this.newScroll = null;
  }

  handleResize = () => {
    // Do nothing
  }

  renderGraphics = (width: number, height: number) =>
    <GraphicsLayer width={width} height={height} videoStore={this.props.videoStore} />

  render() {
    const { mode, zoom } = this.props.viewStore;
    const cursor = cursors[mode];
    return (
      <div ref={this.setVideoContainer} className="video-container">
        <div
          ref={this.setVideoPane}
          style={{cursor, width: `${zoom * 100}%`}}
          onMouseDown={this.handleMouseDown}
        >
          <VideoLayer
            videoStore={this.props.videoStore}
            source="./classification_test_video.mp4"
          />
          <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.handleResize}>
            {this.renderGraphics}
          </ReactResizeDetector>
        </div>
      </div>);
  }
}

export default VideoContainer;
