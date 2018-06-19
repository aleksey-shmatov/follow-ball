import * as React from 'react';
import './video-player.scss';

type State = {
  duration: number,
  frameCount: number,
  currentFrame: number,
};

const FRAME_RATE = 29.98;

class VideoPlayer extends React.Component<{}, State> {
  state = {
    duration: 0,
    frameCount: 0,
    currentFrame: 0,
  };

  video: HTMLVideoElement;

  setVideo = (video: HTMLVideoElement) => {
    this.video = video;
  }

  handleDurationChange = () => {
    this.setState({
      duration: this.video.duration,
      frameCount: Math.floor(this.video.duration * FRAME_RATE),
    });
  }

  handlePrev = () => {
    const newFrame = Math.max(this.state.currentFrame - 1, 0);
    this.setState({
      currentFrame: newFrame,
    });

  }

  handleNext = () => {
    const newFrame = Math.min(this.state.currentFrame + 1, this.state.frameCount);
    this.setState({
      currentFrame: newFrame,
    });
  }

  handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.keyCode);
    if (e.keyCode === 37) {
      this.handlePrev();
    }
    if (e.keyCode === 39) {
      this.handleNext();
    }
  }

  render() {
    const { currentFrame, frameCount, duration } = this.state;
    const currentTime = currentFrame / FRAME_RATE;
    if (this.video) {
      this.video.currentTime = currentFrame / FRAME_RATE;
    }
    return (
      <div tabIndex={0} onKeyDown={this.handleKeydown}>
        <video ref={this.setVideo} onDurationChange={this.handleDurationChange} width="100%">
          <source src="./classification_test_video.mp4" type="video/mp4"/>
        </video>
        <div className="control-bar">
          <button disabled={currentFrame === 0} onClick={this.handlePrev}>{'<'}</button>
          <button disabled={currentFrame === frameCount} onClick={this.handleNext}>{'>'}</button>
        </div>
        <div className="stats">
          <span>Frames: {`${currentFrame}:${frameCount}`}</span>
          <span>Time: {`${currentTime.toFixed(3)}:${duration.toFixed(3)}`}</span>
        </div>
      </div>);
  }
}

export default VideoPlayer;
