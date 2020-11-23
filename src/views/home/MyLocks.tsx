import React from 'react'
import { SafeAreaView } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'

const MyLocks = (): React.ReactElement => {
  // const [state, dispatch] = useTracked();
  // console.log(state);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{/* JSON.stringify(state) */}</Text>
      </Layout>
    </SafeAreaView>
  )
}

export default MyLocks
