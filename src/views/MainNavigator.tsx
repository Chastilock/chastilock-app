import React from 'react'
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './HomeView'
import Settings from './SettingsView'
import { useTrackedState } from '../state'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = (): React.ReactElement => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={Home}/>
    <Screen name='Settings' component={Settings}/>
  </Navigator>
)

const AppNavigator = (): React.ReactElement => {
  const state = useTrackedState()
  const theme = state.settings.theme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <NavigationContainer theme={theme}>
      <HomeNavigator/>
    </NavigationContainer>
  )
}

export default AppNavigator
