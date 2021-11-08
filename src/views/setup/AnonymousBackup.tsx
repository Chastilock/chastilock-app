import React from 'react'
import { Button, Input, Layout } from '@ui-kitten/components'
import { SafeAreaView, ScrollView } from 'react-native'

import { Text, TextType, useTranslation, TopNavigation } from '@chastilock/components'
import { useTrackedState, useDispatch } from '@chastilock/state'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'
import apiActions from '@chastilock/api/actions'

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
      dispatch(apiActions.loginAnon(state.account.temporaryUser?.uuid).execute)
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
