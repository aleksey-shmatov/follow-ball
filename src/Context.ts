import * as React from 'react';
import VideoStore from 'stores/VideoStore';
import ViewStore from 'stores/ViewStore';

export const defaultValue = {
  video: new VideoStore(),
  view: new ViewStore(),
};

const Context = React.createContext(defaultValue);

export default Context;
