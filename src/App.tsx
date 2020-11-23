import React from 'react'
import { StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, ThemeType } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { useTrackedState } from './state'
import MainNavigator from './views/MainNavigator'

const App = (): React.ReactElement => {
  const state = useTrackedState()

  const theme: ThemeType = (eva as any)[state.settings.theme]

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={theme}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <MainNavigator />
      </ApplicationProvider>
    </>
  )
}

export default App
