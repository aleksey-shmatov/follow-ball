import * as React from 'react';
import VideoLayer, { VideoStats } from './VideoLayer';
import InfoPanel from './InfoPanel/index';
import './video-player.scss';

const SELECT = 'select';
const ZOOM_IN = 'zoom_in';
const ZOOM_OUT = 'zoom_out';

type Mode = typeof SELECT | typeof ZOOM_IN | typeof ZOOM_OUT;

type State = {
  stats: VideoStats,
  currentFrame: number,
  zoom: number,
  mode: Mode,
};

class VideoPlayer extends React.Component<{}, State> {
  state = {
    stats: {
      width: 0,
      height: 0,
      duration: 0,
      frameCount: 0,
      frameRate: 0,
    },
    currentFrame: 0,
    zoom: 1,
    mode: SELECT as Mode,
  };

  videoPane: HTMLElement;
  videoContainer: HTMLElement;
  
  newScroll: {x: number, y: number} | null = null;

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

  handleInit = (stats: VideoStats) => {
    this.setState({
      stats,
    });
  }

  handlePrev = () => {
    const newFrame = Math.max(this.state.currentFrame - 1, 0);
    this.setState({
      currentFrame: newFrame,
    });
  }

  handleNext = () => {
    const newFrame = Math.min(this.state.currentFrame + 1, this.state.stats.frameCount);
    this.setState({
      currentFrame: newFrame,
    });
  }

  handleKeydown = (e: KeyboardEvent) => {
    // B - key
    if (e.keyCode === 66) {
      this.handlePrev();
    }
    // Spacebar
    if (e.keyCode === 32) {
      this.handleNext();
    }
    // B - key
    if (e.keyCode === 66) {
      this.handlePrev();
    }
    // Z - key
    if (e.keyCode === 90) {
      this.setState({
        mode: this.state.mode === ZOOM_IN ? SELECT : ZOOM_IN,
      });
    }
    // X - key
    if (e.keyCode === 88) {
      this.setState({
        mode: this.state.mode === ZOOM_OUT ? SELECT : ZOOM_OUT,
      });
    }
    // S - key
    if (e.keyCode === 83) {
      this.setState({
        mode: SELECT,
      });
    }
  }

  handleChange = (newFrame: number) => {
    this.setState({
      currentFrame: newFrame,
    });
  }

  handleClick = (event: React.MouseEvent) => {
    let zoom = this.state.zoom;
    if (this.state.mode === ZOOM_IN) {
      zoom = Math.min(5, this.state.zoom + 0.5);
    } else if (this.state.mode === ZOOM_OUT) {
      zoom = Math.max(1, this.state.zoom - 0.5);
    }
    if (zoom !== this.state.zoom) {
      const rect = this.videoPane.getBoundingClientRect();
      const x = -rect.left + (event.clientX - rect.left) * (zoom - this.state.zoom) / this.state.zoom;
      const y = -rect.top + (event.clientY - rect.top) * (zoom - this.state.zoom) / this.state.zoom;
      // Need to scroll to keep x, y at same position
      this.setState({
        zoom: zoom,
      });
      this.newScroll = { x, y};
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  componentDidUpdate() {
    if (this.newScroll) {
      this.videoContainer.scrollLeft = this.newScroll.x;
      this.videoContainer.scrollTop = this.newScroll.y;
    }
  }

  render() {
    const { currentFrame, stats, mode, zoom } = this.state;
    let cursor = 'default';
    if (mode === ZOOM_IN) {
      cursor = 'zoom-in';
    }
    if (mode === ZOOM_OUT) {
      cursor = 'zoom-out';
    }
    return (
      <div>
        <div ref={this.setVideoContainer} className="video-container">
          <div ref={this.setVideoPane} style={{cursor, width: `${zoom * 100}%`}} onClick={this.handleClick}>
            <VideoLayer
              zoom={this.state.zoom}
              currentFrame={currentFrame}
              source="./classification_test_video.mp4"
              onInit={this.handleInit}
            />
          </div>
        </div>
        <InfoPanel
          stats={stats}
          currentFrame={currentFrame}
          onChange={this.handleChange}
        />
      </div>);
  }
}

export default VideoPlayer;
