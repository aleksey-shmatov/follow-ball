import * as React from 'react';
import './video-player.scss';

export type VideoStats = {
  width: number,
  height: number,
  duration: number,
  frameCount: number,
  frameRate: number,
};

type Props = {
  source: string,
  currentFrame: number,
  onInit: (stats: VideoStats) => void,
  zoom: number,
};

const FRAME_RATE = 29.98;

class VideoLayer extends React.Component<Props> {
  video: HTMLVideoElement;

  setVideo = (video: HTMLVideoElement) => {
    this.video = video;
  }

  handleDurationChange = () => {
    this.props.onInit({
      width: this.video.videoWidth,
      height: this.video.videoHeight,
      duration: this.video.duration,
      frameCount: Math.floor(this.video.duration * FRAME_RATE),
      frameRate: FRAME_RATE,
    });
  }

  render() {
    if (this.video) {
      const { currentFrame } = this.props;
      this.video.currentTime = currentFrame / FRAME_RATE;
    }
    return (
      <video width={`100%`} ref={this.setVideo} onDurationChange={this.handleDurationChange}>
        <source src="./classification_test_video.mp4" type="video/mp4"/>
      </video>);
  }
}

export default VideoLayer;
