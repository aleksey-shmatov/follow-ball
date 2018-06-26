import * as React from 'react';
import { observer } from 'mobx-react';
import VideoStore from 'stores/VideoStore';
import { Circle, Rect, FOUND, OBSCURED } from 'stores/Model';
import './graphics-layer.scss';

type Props = {
  videoStore: VideoStore,
  width: number,
  height: number,
};

@observer
class GraphicsLayer extends React.Component<Props> {
  renderCross = (x: number, y: number) => {
    const CROSS_R = 5;
    return (
      <g className="center-cross">
        <line className="outer-line" x1={x - CROSS_R} x2={x + CROSS_R} y1={y} y2={y} />
        <line className="outer-line" x1={x} x2={x} y1={y - CROSS_R} y2={y + CROSS_R} />
        <line className="inner-line" x1={x - CROSS_R} x2={x + CROSS_R} y1={y} y2={y} />
        <line className="inner-line" x1={x} x2={x} y1={y - CROSS_R} y2={y + CROSS_R} />
      </g>
    );
  }

  renderFound = (circle: Circle, prev: boolean) => {
    const scale = this.props.width / this.props.videoStore.stats.width;
    const x = circle.x * scale;
    const y = circle.y * scale;
    return (
      <g className="found-marker">
        <circle className="outer-circle" cx={x} cy={y} r={circle.r * scale}/>
        <circle className={`inner-circle ${prev ? 'prev' : ''}`} cx={x} cy={y} r={circle.r * scale}/>
        {!prev && this.renderCross(x, y)}
      </g>
    );
  }

  renderObscured = (rect: Rect, prev: boolean) => {
    const scale = this.props.width / this.props.videoStore.stats.width;
    const x = (rect.x + rect.width * 0.5) * scale;
    const y = (rect.y + rect.height * 0.5) * scale;
    return (
      <g className="obscured-marker">
        <rect
          className="outer-rect"
          x={rect.x * scale}
          y={rect.y * scale}
          width={rect.width * scale}
          height={rect.height * scale}
        />
        <rect
          className={`inner-rect ${prev ? 'prev' : ''}`}
          x={rect.x * scale}
          y={rect.y * scale}
          width={rect.width * scale}
          height={rect.height * scale}
        />
        {!prev && this.renderCross(x, y)}
      </g>
    );
  }

  render() {
    let frameData = this.props.videoStore.frameData;
    let prev = false;
    if (!frameData) {
      frameData = this.props.videoStore.prevFrameData;
      prev = true;
    }
    let content = null;
    if (frameData) {
      if (frameData.type === FOUND) {
        content = this.renderFound(frameData.area, prev);
      }
      if (frameData.type === OBSCURED) {
        content = this.renderObscured(frameData.area, prev);
      }
    }
    return (
      <svg className="graphics-layer" width={this.props.width} height={this.props.height}>
        {content}
      </svg>);
  }
}

export default GraphicsLayer;
