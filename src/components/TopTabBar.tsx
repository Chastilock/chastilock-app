import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const UsersScreen = (): React.ReactElement => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
)

const OrdersScreen = (): React.ReactElement => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
)

interface TopTabBarProps { navigation: any, state: any }
const TopTabBar = (props: TopTabBarProps): React.ReactElement => (
  <TabBar
    selectedIndex={props.state.index}
    onSelect={index => props.navigation.navigate(props.state.routeNames[index])}>
    <Tab title='USERS'/>
    <Tab title='ORDERS'/>
  </TabBar>
)

const TabNavigator = (): React.ReactElement => (
  <NavigationContainer>
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='Users' component={UsersScreen}/>
      <Screen name='Orders' component={OrdersScreen}/>
    </Navigator>
  </NavigationContainer>
)

export default TabNavigator
