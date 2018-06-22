import * as React from 'react';
import VideoPlayer from './VideoPlayer';
import { hot } from 'react-hot-loader';
import './app.scss';
import Context, { defaultValue } from 'Context';

class App extends React.Component<{}> {
  render() {
    return (
      <Context.Provider value={defaultValue}>
        <VideoPlayer/>
      </Context.Provider>);
  }
}

declare let module: { hot: any };

export default hot(module)(App);
