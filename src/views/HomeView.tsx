import React from 'react'
import { SafeAreaView } from 'react-native'
import { Icon, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import HomeNavigator from './home/HomeNavigator'

const SettingsIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="settings-outline" />
)

const Home = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const navigateSettings = (): void => {
    navigation.navigate('Settings')
  }

  const SettingsAction = (): React.ReactElement => (
    <TopNavigationAction icon={SettingsIcon} onPress={navigateSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Chastilock"
        alignment="center"
        accessoryRight={SettingsAction}
      />
      <Divider/>
      <HomeNavigator />
    </SafeAreaView>
  )
}

export default Home
