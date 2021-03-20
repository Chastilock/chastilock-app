import React from 'react'
import { View } from 'react-native'
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './HomeView'
import Settings from './SettingsView'
import CreateLock from './CreateEditLockView'
import { useTrackedState } from '@chastilock/state'

const { Navigator, Screen } = createStackNavigator()

interface HomeNavigatorProps {
  backgroundColor: string
}
const HomeNavigator = (props: HomeNavigatorProps): React.ReactElement => (
  <View style={{ flex: 1, backgroundColor: props.backgroundColor }}>
    <Navigator headerMode='none' mode='modal'>
      <Screen name='Home' component={Home}/>
      <Screen name='Settings' component={Settings}/>
      <Screen name='CreateLock' component={CreateLock}/>
    </Navigator>
  </View>
)

const AppNavigator = (): React.ReactElement => {
  const state = useTrackedState()
  const theme = state.settings.theme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <NavigationContainer theme={theme}>
      <HomeNavigator backgroundColor={state.settings.theme === 'dark' ? '#222B45' : '#FFFFFF'} />
    </NavigationContainer>
  )
}

export default AppNavigator
