import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'
import { useTracked } from '@chastilock/state'
import apiActions from '@chastilock/api/actions'
import { BackButtonAccessory } from '../common/Accessories'

interface AnonymousRecoverProps {
  onBack: () => void
  onComplete?: () => void
}
export const AnonymousRecover = (props: AnonymousRecoverProps): React.ReactElement => {
  const [state, dispatch] = useTracked()
  const [translate] = useTranslation()
  const [uuid, setUuid] = React.useState('')
  const [error, setError] = React.useState('')

  const complete = async (): Promise<void> => {
    try {
      await dispatch(apiActions.loginAnon(uuid).execute)

      if (props.onComplete !== undefined) {
        props.onComplete()
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: settingsSelectors.getThemeBackground(state.settings) }}>
      <TopNavigation
        title={translate('setup.recover.title')}
        alignment="center"
        accessoryLeft={() => <BackButtonAccessory onPress={props.onBack} />}
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.recover.title" category={TextType.HEADING4} center />
        <Text translationKey="setup.recover.info" center />

        <Text translationKey="setup.recover.your_id" category={TextType.HEADING4} center />
        <Input value={uuid} onChange={e => setUuid((e.target as any).value)} placeholder={translate('setup.recover.your_id.placeholder')} />

        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}

        <Button style={{ marginTop: 10 }} onPress={complete}>{translate('setup.recover.ok')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default AnonymousRecover
