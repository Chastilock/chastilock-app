import React from 'react';
import { registerRootComponent } from 'expo';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import MainNavigator from './src/views/MainNavigator';

const Root = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainNavigator />
      </ApplicationProvider>
    </>
  );
}

registerRootComponent(Root);

export default Root;
