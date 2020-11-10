import React from 'react';
import { registerRootComponent } from 'expo';

import { StateProvider } from './src/state';
import App from './src/App';

const Root = () => {
  return (
    <StateProvider>
      <App />
    </StateProvider>
  );
}

registerRootComponent(Root);

export default Root;
