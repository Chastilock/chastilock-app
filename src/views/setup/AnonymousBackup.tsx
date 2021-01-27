import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { useTracked } from '@chastilock/state'
import { actions as accountActions, User } from '@chastilock/state/sections/account'

const AnonymousBackup = (): React.ReactElement => {
  const [state, dispatch] = useTracked()
  const [translator] = useTranslation()

  const complete = (): void => {
    dispatch(accountActions.signIn(state.account.temporaryUser as User))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title="Chastilock - Backup"
        alignment="center"
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.backup.title" category={TextType.HEADING4} center />
        <Text translationKey="setup.backup.info" center />
        <Text translationKey="setup.backup.info_upgrade_later" center />
        <Text translationKey="setup.backup.info_screenshot" center />

        <Text translationKey="setup.backup.your_id" category={TextType.HEADING4} center />
        <Input value={state.account.temporaryUser?.uuid} />

        <Button style={{ marginTop: 10 }} onPress={complete}>{translator('setup.backup.ok')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default AnonymousBackup
