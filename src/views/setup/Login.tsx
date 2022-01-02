import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType, useTranslation } from '@chastilock/components'
import { useTrackedState, useDispatch } from '@chastilock/state'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'
import { actions as accountActions } from '@chastilock/state/sections/account'
import * as apiActions from '@chastilock/api/actions'
import { BackButtonAccessory } from '../common/Accessories'
import { actions as confirmActions } from '@chastilock/state/sections/confirmation'

interface LoginProps {
  onBack: () => void
}
export const Login = (props: LoginProps): React.ReactElement => {
  const state = useTrackedState()
  const dispatch = useDispatch()
  const [translate] = useTranslation()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const complete = async (): Promise<void> => {
    try {
      await dispatch(apiActions.login(username, password).execute)
      await dispatch(accountActions.setup())
    } catch (e: any) {
      setError(e.message)
    }
  }

  const forgotPassword = async (): Promise<void> => {
    try {
      await dispatch(apiActions.resetPassword(username).execute)
      dispatch(confirmActions.showConfirmation({
        title: translate('settings.password_reset.title'), // These 2 need translating to german
        text: translate('settings.password_reset.content'), // These 2 need translating to german
        onOk: () => {
        }
      }))
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: settingsSelectors.getThemeBackground(state.settings) }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey='setup.login.title' />}
        alignment="center"
        accessoryLeft={() => <BackButtonAccessory onPress={props.onBack} />}
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text translationKey="setup.login.info" center style={{ marginBottom: 20 }} />

        <Input value={username} onChange={e => setUsername((e.target as any).value)} placeholder={translate('setup.login.username')} />
        <Input value={password} onChange={e => setPassword((e.target as any).value)} textContentType="password" placeholder={translate('setup.login.password')} />

        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}

        <Button style={{ marginTop: 10 }} onPress={complete}>{translate('setup.login.ok')}</Button>
        <Button style={{ marginTop: 10 }} onPress={forgotPassword}>{translate('setup.login.forgotpassword')}</Button>
      </View>
    </SafeAreaView>
  )
  // TODO: German translation for setup.login.forgotpassword needs adding
}

export default Login
