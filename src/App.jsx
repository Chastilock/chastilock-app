import React, { memo } from 'react';
import { StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { useTrackedState } from './state';
import MainNavigator from './views/MainNavigator';

const App = () => {
  const state = useTrackedState();

  return (
    <>
    <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva[state.settings.theme]}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <MainNavigator />
      </ApplicationProvider>
    </>
  );
}

export default App;