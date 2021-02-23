import React from 'react'
import { TopNavigation, Divider, Button, Input } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, useTranslation } from '@chastilock/components'
import { useDispatch } from '@chastilock/state'
import apiActions from '@chastilock/api/actions'
import { BackButtonAccessory } from '../common/Accessories'

interface LoginProps {
  onBack: () => void
}
export const Login = (props: LoginProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [translate] = useTranslation()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const complete = async (): Promise<void> => {
    try {
      await dispatch(apiActions.login(username, password).execute)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title={translate('setup.login.title')}
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
      </View>
    </SafeAreaView>
  )
}

export default Login
