import React from 'react'
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { TabBar, Tab } from '@ui-kitten/components'

import MyLoadedLocks from './MyLoadedLocks'
import ManagedLocks from './ManagedLocks'
import MyLocks from './MyLocks'
import { useTranslation } from '@chastilock/components'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const TopTabBar = ({ navigation, state }: MaterialTopTabBarProps): React.ReactElement => {
  const [translate] = useTranslation()

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      style={{ height: 50 }}>
      <Tab title={translate('home.slider.mylocks')} />
      <Tab title={translate('home.slider.managedlocks')} />
      <Tab title={translate('home.slider.locks')} />
    </TabBar>
  )
}

const HomeTabNavigator = (): React.ReactElement => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='MyLoadedLocks' component={MyLoadedLocks} />
    <Screen name='ManagedLocks' component={ManagedLocks}/>
    <Screen name='MyLocks' component={MyLocks}/>
  </Navigator>
)

const HomeNavigator = (): React.ReactElement => (
  <HomeTabNavigator />
)

export default HomeNavigator
