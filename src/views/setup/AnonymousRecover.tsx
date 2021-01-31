import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'
import apiActions from '@chastilock/api/actions'
import { BackButtonAccessory } from '../common/Accessories'

interface AnonymousRecoverProps {
  onBack: () => void
}
export const AnonymousRecover = (props: AnonymousRecoverProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [translate] = useTranslation()
  const [uuid, setUuid] = React.useState('')

  const complete = (): void => {
    dispatch(apiActions.loginAnon(uuid).execute)
    // dispatch(accountActions.signIn(state.account.temporaryUser as User))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title="Chastilock - Recover"
        alignment="center"
        accessoryLeft={() => <BackButtonAccessory onPress={props.onBack} />}
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.backup.title" category={TextType.HEADING4} center />
        <Text translationKey="setup.backup.info" center />
        <Text translationKey="setup.backup.info_upgrade_later" center />
        <Text translationKey="setup.backup.info_screenshot" center />

        <Text translationKey="setup.backup.your_id" category={TextType.HEADING4} center />
        <Input value={uuid} onChange={e => setUuid((e.target as any).value)} placeholder='Chastilock user id' />

        <Button style={{ marginTop: 10 }} onPress={complete}>{translate('setup.backup.ok')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default AnonymousRecover
