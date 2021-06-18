import React from 'react'
import { TopNavigation, Divider, Button } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

import { Text, TextType } from '@chastilock/components'

export interface SetupSelectionProps {
  onRegister: () => void
  onDirect: () => void
  onSignIn: () => void
  onRecover: () => void
}
const SetupSelection = (props: SetupSelectionProps): React.ReactElement => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category={TextType.HEADING6} translationKey='main.title' />}
        alignment="center"
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>Welcome to Chastilock!</Text>
        <Text style={{ textAlign: 'center' }}>Happy to have you on board! If you want, you can either sign in, sign up or continue directly into the app! (You can still connect to an account later).</Text>

        <Button style={{ marginTop: 20 }} onPress={props.onRegister}>Register a new account</Button>
        <Button style={{ marginTop: 10 }} onPress={props.onDirect}>Take me directly to the app</Button>
        <Button style={{ marginTop: 10 }} onPress={props.onSignIn}>Sign in</Button>
        <Button style={{ marginTop: 10 }} onPress={props.onRecover}>Recover using an user id</Button>
      </View>
    </SafeAreaView>
  )
}

export default SetupSelection
