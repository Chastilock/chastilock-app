import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Divider, Layout, Icon, TopNavigation, TopNavigationAction, Toggle, Button } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { actions } from '@chastilock/state/sections/settings'
import { actions as accountActions, selectors as accountSelectors } from '@chastilock/state/sections/account'
import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
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
    <Text translationKey={props.text} />
    <View>{props.children}</View>
  </View>
)

const FormButton = (props: any): React.ReactElement => (
  <View style={{ ...styles.formGroup, marginVertical: 10 }}>
    <Button {...props} style={{ flex: 1 }} />
  </View>
)

interface SettingsGroupProps {
  title: string
  children?: React.ReactElement | React.ReactElement[]
}
const SettingsGroup = (props: SettingsGroupProps): React.ReactElement => (
  <View>
    <Text category={TextType.HEADING5} translationKey={props.title} />
    {props.children}
  </View>
)

const SettingsView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const [state, dispatch] = useTracked()
  const [translator] = useTranslation()

  const toggleTheme = (): void => {
    dispatch(actions.changeTheme(state.settings.theme !== 'dark' ? 'dark' : 'light'))
  }
  const updateShowPublicStats = (showPublicStats: boolean): void => {
    dispatch(actions.setPublicStats(showPublicStats))
  }

  const signOut = (): void => {
    if (accountSelectors.isAnonymous(state.account)) {
      dispatch(confirmationActions.showConfirmation({
        title: translator('settings.confirm.logout_anonymous.title'),
        text: translator('settings.confirm.logout_anonymous.content'),
        onOk: () => {
          dispatch(accountActions.signOut())
        }
      }))
    } else {
      dispatch(accountActions.signOut())
    }
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
        title={() => <Text category={TextType.HEADING6}>Chastilock - Settings</Text>}
        alignment='center'
        accessoryRight={CloseAction}
      />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 }}>
        <SettingsGroup title="settings.appearance">
          <FormGroup text="settings.appearance.dark_mode">
            <Toggle checked={state.settings.theme === 'dark'} onChange={() => toggleTheme()} />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="settings.account">
          <FormGroup text="settings.account.username">
            <Toggle />
          </FormGroup>
          <FormButton onPress={signOut} appearance='outline'>
            Sign out
          </FormButton>
        </SettingsGroup>
        <SettingsGroup title="settings.notifications">
          <FormGroup text="settings.account.username">
            <Toggle />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="settings.security">
          <FormGroup text="settings.account.username">
            <Toggle />
          </FormGroup>
        </SettingsGroup>
        <SettingsGroup title="settings.privacy">
          <FormGroup text="settings.privacy.show_public_stats">
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
    height: 40,
    width: '100%'
  }
})

export default SettingsView
