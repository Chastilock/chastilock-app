import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider, Layout, TopNavigation, Toggle, Input } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { Text, TextType, useTranslation, FormButton, FormGroup, TitleGroup } from '@chastilock/components'
import { actions } from '@chastilock/state/sections/settings'
import { actions as accountActions, selectors as accountSelectors } from '@chastilock/state/sections/account'
import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { useTracked } from '@chastilock/state'
import AnonymousBackup from './setup/AnonymousBackup'
import Register from './setup/Register'
import CkMigration from './setup/CkMigration'
import { CloseButtonAccessory } from './common/Accessories'

const SettingsView = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const [state, dispatch] = useTracked()
  const [translator] = useTranslation()
  const [isShowingBackup, setShowBackup] = React.useState(false)
  const [isShowingUpgrade, setShowUpgrade] = React.useState(false)
  const [isShowingCkMigration, setShowCkMigration] = React.useState(false)

  // Settings
  const [name, setName] = React.useState(state.account.user?.username)

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

  const showBackup = (): void => {
    setShowBackup(true)
  }

  const showUpgrade = (): void => {
    setShowUpgrade(true)
  }

  const showCkMigrate = (): void => {
    setShowCkMigration(true)
  }

  const closeSettings = (): void => {
    navigation.goBack()
  }

  if (isShowingBackup) {
    return <AnonymousBackup onClose={() => setShowBackup(false)} />
  }

  if (isShowingUpgrade) {
    return <Register onComplete={() => setShowUpgrade(false)} onBack={() => setShowUpgrade(false)} />
  }

  if (isShowingCkMigration) {
    return <CkMigration onOk={() => setShowCkMigration(false)} onBack={() => setShowCkMigration(false)} />
  }

  const isAnonymous = accountSelectors.isAnonymous(state.account)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6}>Chastilock - Settings</Text>}
        alignment='center'
        accessoryRight={() => <CloseButtonAccessory onPress={closeSettings} />}
      />
      <Divider/>
      <Layout style={{ flex: 1, padding: 20 }}>
        <TitleGroup title="settings.appearance">
          <FormGroup text="settings.appearance.dark_mode">
            <Toggle checked={state.settings.theme === 'dark'} onChange={() => toggleTheme()} />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="settings.account">
          <FormGroup text="settings.account.username">
            <Input value={name} disabled={isAnonymous} placeholder='Only available on regular' onChange={e => setName((e.target as any).value)} />
          </FormGroup>
          <FormGroup text="settings.account.type">
            <Text category={TextType.SUBTITLE1} translationKey="settings.account.type.anonymous" />
          </FormGroup>
          <FormButton onPress={showBackup} appearance='outline'>
            {translator('settings.account.show_user_id')}
          </FormButton>
          <FormButton onPress={showCkMigrate} appearance='outline'>
            {translator('settings.account.ck_migrate')}
          </FormButton>
          <FormButton onPress={showUpgrade} appearance='outline'>
            {translator('settings.account.upgrade')}
          </FormButton>
          <FormButton onPress={signOut} appearance='outline'>
            {translator('settings.account.sign_out')}
          </FormButton>
        </TitleGroup>
        <TitleGroup title="settings.notifications">
          <FormGroup text="settings.account.username">
            <Toggle />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="settings.security">
          <FormGroup text="settings.account.username">
            <Toggle />
          </FormGroup>
        </TitleGroup>
        <TitleGroup title="settings.privacy">
          <FormGroup text="settings.privacy.show_public_stats">
            <Toggle checked={state.settings.publicStats} onChange={updateShowPublicStats} />
          </FormGroup>
        </TitleGroup>
      </Layout>
    </SafeAreaView>
  )
}

export default SettingsView
