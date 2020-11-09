import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';

import MyLocks from './MyLocks';
import ManagedLocks from './ManagedLocks';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='USERS'/>
    <Tab title='ORDERS'/>
  </TabBar>
);

const HomeTabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='MyLocks' component={MyLocks}/>
    <Screen name='ManagedLocks' component={ManagedLocks}/>
  </Navigator>
);

const HomeNavigator = () => (
  <HomeTabNavigator />
);

export default HomeNavigator;
