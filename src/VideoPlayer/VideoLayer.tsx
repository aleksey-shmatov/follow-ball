import * as React from 'react';
import { observer } from 'mobx-react';
import VideoStore from 'stores/VideoStore';
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
  videoStore: VideoStore,
};

const FRAME_RATE = 29.98;

@observer
class VideoLayer extends React.Component<Props> {
  video: HTMLVideoElement;

  setVideo = (video: HTMLVideoElement) => {
    this.video = video;
  }

  handleDurationChange = () => {
    this.props.videoStore.loadVideo({
      width: this.video.videoWidth,
      height: this.video.videoHeight,
      duration: this.video.duration,
      frameCount: Math.floor(this.video.duration * FRAME_RATE),
      frameRate: FRAME_RATE,
    });
  }

  render() {
    const currentFrame = this.props.videoStore.currentFrame;
    if (this.video) {
      this.video.currentTime = currentFrame / FRAME_RATE;
    }
    return (
      <video width="100%" ref={this.setVideo} onDurationChange={this.handleDurationChange}>
        <source src={this.props.source} type="video/mp4"/>
      </video>);
  }
}

export default VideoLayer;
