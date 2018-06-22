import * as React from 'react';
import VideoContainer from './VideoContainer';
import InfoPanel from './InfoPanel/index';
import Context from '../Context';
import './video-player.scss';
import KeyboardHandler from './KeyboardHandler';

class VideoPlayer extends React.Component<{}> {

  render() {
    return (
      <Context.Consumer>
        {(stores) => (<div>
          <KeyboardHandler videoStore={stores.video} viewStore={stores.view} />
          <VideoContainer videoStore={stores.video} viewStore={stores.view} />
          <InfoPanel
            videoStore={stores.video}
          />
        </div>)
      }
      </Context.Consumer>);
  }
}

export default VideoPlayer;
