import React from 'react'
import { TopNavigation, Divider, Text, Button } from '@ui-kitten/components'
import { SafeAreaView, View } from 'react-native'

export interface AnonymousBackupProps {
  onOkay: () => void
}
const AnonymousBackup = (props: AnonymousBackupProps): React.ReactElement => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title="Chastilock - Backup"
        alignment="center"
      />
      <Divider/>
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>Anonymous Account: Backup</Text>
        <Text style={{ textAlign: 'center' }}>We allow the creation of anonymous accounts. Those are just accounts, that are only identified by you by a random key.
        There is no automatic recovery option available, therefore you will need to make sure on your own that you back up your user id in a safe space.</Text>
        <Text style={{ textAlign: 'center' }}>You can also always upgrade your account later on by adding an email or connecting it to a social account.</Text>
        <Text style={{ textAlign: 'center' }}>We also recommend to take a screenshot of your code. You can also always show this page again in the app settings.</Text>

        <Button style={{ marginTop: 10 }} onPress={props.onOkay}>Okay!</Button>
      </View>
    </SafeAreaView>
  )
}

export default AnonymousBackup
