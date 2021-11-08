import React from 'react'
import { SafeAreaView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { useTrackedState, useDispatch } from '@chastilock/state'
import loadCreatedLocks from '@chastilock/api/actions/loadCreatedLocks'
import { actions as createdLockActions, CreatedLock } from '@chastilock/state/sections/createdlock'
import CreatedLockView from './lock/CreatedLockView'

const MyLocks = ({ navigation }: MaterialTopTabBarProps): React.ReactElement => {
  const state = useTrackedState()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!state.createdLock.isLoaded) {
      dispatch(loadCreatedLocks().execute).then((locks: CreatedLock[]) => {
        dispatch(createdLockActions.set(locks))
      })
    }
  }, [state.createdLock.isLoaded])

  const editLock = (lock: CreatedLock): void => {
    navigation.navigate('CreateLock', {
      lock
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, padding: 10 }}>
        {state.createdLock.locks.map(lock => <CreatedLockView createdLock={lock} editLock={editLock} />)}
      </Layout>
    </SafeAreaView>
  )
}

export default MyLocks
