import React from 'react'
import { SafeAreaView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { useTrackedState } from '@chastilock/state'

const MyLocks = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const state = useTrackedState()
  // const dispatch = useDispatch()

  React.useEffect(() => {
    if (!state.createdLock.isLoaded) {
      // dispatch()
    }
  }, [state.createdLock.isLoaded])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, padding: 10 }}>
      </Layout>
    </SafeAreaView>
  )
}

export default MyLocks
