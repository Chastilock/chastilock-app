import React from 'React'
import { TopNavigation, Divider, Text, Button } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { actions as confirmActions } from '@chastilock/state/sections/confirmation'
import { useDispatch } from '@chastilock/state'

const SetupView = (): React.ReactElement => {
  const dispatch = useDispatch()

  const createAnonymousAccount = (): void => {
    dispatch(confirmActions.showConfirmation({
      title: 'Anonymous account',
      text: 'An anonymous account will be created for you. You should really back up your unique id that is presented to you next (preferably in cloud storage). You can also always upgrade the account later on.',
      onOk: () => console.log('Hi!')
    }))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title="Chastilock"
        alignment="center"
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>Welcome to Chastilock!</Text>
        <Text style={{ textAlign: 'center' }}>Happy to have you on board! If you want, you can either sign in, sign up or continue directly into the app! (You can still connect to an account later).</Text>

        <Button style={{ marginTop: 20 }}>Register a new account</Button>
        <Button style={{ marginTop: 10 }} onPress={createAnonymousAccount}>Take me directly to the app</Button>
        <Button style={{ marginTop: 10 }}>Sign in</Button>
        <Button style={{ marginTop: 10 }}>Recover using an user id</Button>
      </View>
    </SafeAreaView>
  )
}

export default SetupView
