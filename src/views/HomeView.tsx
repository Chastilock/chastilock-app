import React from 'react'
import { SafeAreaView } from 'react-native'
import { Icon, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import HomeNavigator from './home/HomeNavigator'

const SettingsIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="settings-outline" />
)

const PlusIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="plus-outline" />
)

const Home = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const navigateSettings = (): void => {
    navigation.navigate('Settings')
  }

  const navigateCreateLock = (): void => {
    navigation.navigate('CreateLock')
  }

  const SettingsAction = (): React.ReactElement => (
    <TopNavigationAction icon={SettingsIcon} onPress={navigateSettings} />
  )

  const CreateLockAction = (): React.ReactElement => (
    <TopNavigationAction icon={PlusIcon} onPress={navigateCreateLock} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Chastilock"
        alignment="center"
        accessoryLeft={CreateLockAction}
        accessoryRight={SettingsAction}
      />
      <Divider/>
      <HomeNavigator />
    </SafeAreaView>
  )
}

export default Home
