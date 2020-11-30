import React from 'react'
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { TabBar, Tab } from '@ui-kitten/components'

import MyLocks from './MyLocks'
import ManagedLocks from './ManagedLocks'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const TopTabBar = ({ navigation, state }: MaterialTopTabBarProps): React.ReactElement => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={{ height: 50 }}>
    <Tab title='MY LOCKS'/>
    <Tab title='MANAGED LOCKS'/>
  </TabBar>
)

const HomeTabNavigator = (): React.ReactElement => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='MyLocks' component={MyLocks}/>
    <Screen name='ManagedLocks' component={ManagedLocks}/>
  </Navigator>
)

const HomeNavigator = (): React.ReactElement => (
  <HomeTabNavigator />
)

export default HomeNavigator
