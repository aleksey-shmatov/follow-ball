import * as React from 'react';
import { VideoStats } from '../VideoLayer';
import './info-panel.scss';

type Props = {
  stats: VideoStats,
  currentFrame: number,
  onChange: (newFrame: number) => void,
};

class InfoPanel extends React.Component<Props> {
  handlePrev = () => {
    const newFrame = Math.max(this.props.currentFrame - 1, 0);
    this.props.onChange(newFrame);
  }

  handleNext = () => {
    const newFrame = Math.min(this.props.currentFrame + 1, this.props.stats.frameCount);
    this.props.onChange(newFrame);
  }

  handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrame = Math.round(parseFloat(e.currentTarget.value) - 1);
    this.props.onChange(newFrame);
  }

  render() {
    const { currentFrame, stats } = this.props;
    const currentTime = (stats.frameRate !== 0)  ? currentFrame / stats.frameRate : 0;
    return (
      <div className="info-panel">
        <div className="control-bar">
          <button disabled={currentFrame === 0} onClick={this.handlePrev}>{'<'}</button>
          <input
            type="range"
            value={currentFrame + 1}
            min="1"
            max={stats.frameCount}
            onChange={this.handleSeek}
          />
          <button disabled={currentFrame + 1 >= stats.frameCount} onClick={this.handleNext}>{'>'}</button>
        </div>
        <div className="stats">
          <span>Frame: <strong>{currentFrame + 1}</strong> : {stats.frameCount}</span>
          <span className="spacer"/>
          <span>Time: {`${currentTime.toFixed(3)} : ${stats.duration.toFixed(3)}`}</span>
        </div>
      </div>);
  }
}

export default InfoPanel;
