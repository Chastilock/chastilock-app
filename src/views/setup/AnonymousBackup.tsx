import React from 'react'
import { Button, Input, Layout } from '@ui-kitten/components'
import { SafeAreaView, ScrollView } from 'react-native'

import { Text, TextType, useTranslation, TopNavigation } from '@chastilock/components'
import { useTrackedState, useDispatch } from '@chastilock/state'
import { actions as accountActions, User } from '@chastilock/state/sections/account'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'

export interface AnonymousBackupProps {
  isInitial?: boolean
  onClose?: () => void
}
export const AnonymousBackup = (props: AnonymousBackupProps): React.ReactElement => {
  const state = useTrackedState()
  const dispatch = useDispatch()
  const [translate] = useTranslation()

  const complete = (): void => {
    if (props.isInitial === true) {
      dispatch(accountActions.signIn(state.account.temporaryUser as User))
    }
    props.onClose?.()
  }

  return (
    <SafeAreaView style={{ backgroundColor: settingsSelectors.getThemeBackground(state.settings) }}>
      <TopNavigation title='setup.backup.title' />
      <ScrollView>
        <Layout style={{ flex: 1, padding: 20, marginBottom: 50 }}>
          <Text translationKey="setup.backup.title" category={TextType.HEADING4} center />
          <Text translationKey="setup.backup.info" center />
          <Text translationKey="setup.backup.info_upgrade_later" center />
          <Text translationKey="setup.backup.info_screenshot" center />

          <Text translationKey="setup.backup.your_id" category={TextType.HEADING4} center />
          <Input value={props.isInitial === true ? state.account.temporaryUser?.uuid : state.account.user?.uuid} />

          <Button style={{ marginTop: 10 }} onPress={complete}>{translate('setup.backup.ok')}</Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AnonymousBackup
