import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { useDispatch, useTrackedState } from '@chastilock/state'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'
import apiActions from '@chastilock/api/actions'
import { BackButtonAccessory } from '../common/Accessories'

interface RegisterProps {
  onBack: () => void
  onComplete?: () => void
}
export const Register = (props: RegisterProps): React.ReactElement => {
  const dispatch = useDispatch()
  const state = useTrackedState()
  const [translate] = useTranslation()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  const complete = async (): Promise<void> => {
    await dispatch(apiActions.register(email, password, username).execute)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: settingsSelectors.getThemeBackground(state.settings) }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey='setup.register.title' />}
        alignment="center"
        accessoryLeft={() => <BackButtonAccessory onPress={props.onBack} />}
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.register.info" center style={{ marginBottom: 20 }} />

        <Input value={username} onChange={e => setUsername((e.target as any).value)} placeholder={translate('setup.register.username')} />
        <Input value={password} onChange={e => setPassword((e.target as any).value)} textContentType="password" placeholder={translate('setup.register.password')} />
        <Input value={email} onChange={e => setEmail((e.target as any).value)} textContentType="emailAddress" placeholder={translate('setup.register.email')} />

        {state.account.signInError !== undefined && <Text style={{ color: 'red' }}>{`${translate('setup.register.error')}: ${state.account.signInError}`}</Text>}

        <Button style={{ marginTop: 10 }} onPress={complete}>{translate('setup.register.ok')}</Button>
      </View>
    </SafeAreaView>
  )
}

export default Register
