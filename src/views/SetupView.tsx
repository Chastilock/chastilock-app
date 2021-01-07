import React from 'React'
import { TopNavigation, Divider, Text } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native'

const SetupView = (): React.ReactElement => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222B45' }}>
      <TopNavigation
        title="Chastilock"
        alignment="center"
      />
      <Divider/>
      <Text>Welcome to Chastilock!</Text>
    </SafeAreaView>
  )
}

export default SetupView
