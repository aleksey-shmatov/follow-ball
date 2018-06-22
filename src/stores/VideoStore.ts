import { observable, action, computed } from 'mobx';
import { VideoStats } from './Model';

class VideoStore {
  @observable currentFrame = 0;

  @observable.shallow stats: VideoStats = {
    width: 0,
    height: 0,
    duration: 0,
    frameCount: 0,
    frameRate: 0,
  };

  @action
  loadVideo = (stats: VideoStats) => {
    this.stats = stats;
  }

  @computed
  get hasNextFrame() {
    return this.currentFrame < this.stats.frameCount - 1;
  }

  @computed
  get hasPrevFrame() {
    return this.currentFrame > 0;
  }

  @action goToFrame = (frame: number) => {
    this.currentFrame = frame;
  }

  @action
  nextFrame = () => {
    this.currentFrame = Math.min(Math.max(this.stats.frameCount - 1, 0), this.currentFrame + 1);
  }

  @action
  prevFrame = () => {
    this.currentFrame = Math.max(0, this.currentFrame - 1);
  }

}

export default VideoStore;
