import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Text } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { actions } from '@chastilock/state/sections/settings'
import { useTracked } from '@chastilock/state'

const CloseIcon = (props: any): React.ReactElement => (
  <Icon {...props} name="close-outline" />
)

interface FormGroupProps {
  text: string
  children?: React.ReactElement
}
const FormGroup = (props: FormGroupProps): React.ReactElement => (
  <View style={styles.formGroup}>
    <Text>{props.text}</Text>
    <View>{props.children}</View>
  </View>
)

interface SettingsGroupProps {
  title: string
  children?: React.ReactElement
}
const SettingsGroup = (props: SettingsGroupProps): React.ReactElement => (
  <View>
    <Text category="s1">{props.title}</Text>
    {props.children}
  </View>
)

const SettingsView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const [state, dispatch] = useTracked()

  const updateTheme = (isDark: boolean): void => {
    dispatch(actions.changeTheme(isDark ? 'dark' : 'light'))
  }
  const updateShowPublicStats = (showPublicStats: boolean): void => {
    dispatch(actions.setPublicStats(showPublicStats))
  }

  const closeSettings = (): void => {
    navigation.goBack()
  }

  const CloseAction = (): React.ReactElement => (
    <TopNavigationAction icon={CloseIcon} onPress={closeSettings} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Chastilock - Settings'
        alignment='center'
        accessoryRight={CloseAction}
      />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 }}>
        <SettingsGroup title="Appearance">
          <FormGroup text="Dark mode">
            <Toggle checked={state.settings.theme === 'dark'} onChange={updateTheme} />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="Account">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="Notifications">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="Security">
          <FormGroup text="Username">
            <Toggle />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="Privacy">
          <FormGroup text="Show public stats on my profile">
            <Toggle checked={state.settings.publicStats} onChange={updateShowPublicStats} />
          </FormGroup>
        </SettingsGroup>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  }
})

export default SettingsView
