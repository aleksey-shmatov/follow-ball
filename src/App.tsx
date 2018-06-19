import * as React from 'react';
import VideoPlayer from './VideoPlayer';
import { hot } from 'react-hot-loader';

class App extends React.Component<{}> {
  render() {
    return <VideoPlayer/>;
  }
}

declare let module: { hot: any };

export default hot(module)(App);
