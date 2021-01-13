import React, { useEffect } from 'react'
import { StatusBar, Text } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, ThemeType } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { useDispatch, useTrackedState } from '@chastilock/state'
import { initializeAction, StateStatus } from '@chastilock/state/reducer'
import MainNavigator from '@chastilock/views/MainNavigator'
import ConfirmationPopup from '@chastilock/views/common/ConfirmationPopup'
import SetupView from '@chastilock/views/setup/SetupView'

const App = (): React.ReactElement => {
  const state = useTrackedState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (state.status === StateStatus.UNINITIALIZED) {
      dispatch(initializeAction)
    }
  })

  // Check if state is already set up
  if (state.status !== StateStatus.READY) {
    return <Text>Loading</Text>
  }

  const theme: ThemeType = (eva as any)[state.settings.theme]

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={theme}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {state.account.isSignedIn && <MainNavigator />}
        {!state.account.isSignedIn && <SetupView />}
        {state.confirmation.visible && <ConfirmationPopup {...state.confirmation.modalProps} />}
      </ApplicationProvider>
    </>
  )
}

export default App
