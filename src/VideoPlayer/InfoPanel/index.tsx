import * as React from 'react';
import VideoStore from 'stores/VideoStore';
import { observer } from 'mobx-react';
import './info-panel.scss';
import { OUT, FOUND, FrameData } from 'stores/Model';

type Props = {
  videoStore: VideoStore,
};

@observer
class InfoPanel extends React.Component<Props> {
  handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrame = Math.round(parseFloat(e.currentTarget.value) - 1);
    this.props.videoStore.goToFrame(newFrame);
  }

  getFrameDataLabel = (frameData: FrameData | null) => {
    let frameState = 'Not found';
    if (frameData) {
      if (frameData.type === OUT) {
        frameState = `Out ${frameData.direction}`;
      } else if (frameData.type === FOUND) {
        frameState = 'Found';
      } else {
        frameState = 'Obscured';
      }
    }
    return frameState;
  }

  render() {
    const { currentFrame, stats, nextFrame, frameData, prevFrameData,
      prevFrame, hasNextFrame, hasPrevFrame} = this.props.videoStore;
    const currentTime = (stats.frameRate !== 0)  ? currentFrame / stats.frameRate : 0;
    return (
      <div className="info-panel">
        <div className="control-bar">
          <button disabled={!hasPrevFrame} onClick={prevFrame}>{'<'}</button>
          <input
            type="range"
            value={currentFrame + 1}
            min="1"
            max={stats.frameCount}
            onChange={this.handleSeek}
          />
          <button disabled={!hasNextFrame} onClick={nextFrame}>{'>'}</button>
        </div>
        <div className="stats">
          <span>Frame: <strong>{currentFrame + 1}</strong> : {stats.frameCount}</span>
          <span className="spacer"/>
          <span>Time: {`${currentTime.toFixed(3)} : ${stats.duration.toFixed(3)}`}</span>
        </div>
        <div className="stats">
          <span>State: {this.getFrameDataLabel(frameData)}</span>
          <span className="spacer"/>
          {currentFrame > 0 && <span>Prev: {this.getFrameDataLabel(prevFrameData)}</span>}
        </div>
      </div>);
  }
}

export default InfoPanel;
