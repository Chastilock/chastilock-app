import React, { memo, useEffect } from 'react'
import { StatusBar, Text } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, ThemeType } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useFonts } from 'expo-font'

import { useDispatch, useTrackedState } from '@chastilock/state'
import { initializeAction, StateStatus } from '@chastilock/state/reducer'
import MainNavigator from '@chastilock/views/MainNavigator'
import ConfirmationPopup, { ConfirmationPopupProps } from '@chastilock/views/common/ConfirmationPopup'
import SetupView from '@chastilock/views/setup/SetupView'
import mapping from './mapping.json'

interface AppContentProps {
  isSignedIn: boolean
  modalProps: ConfirmationPopupProps
  modalVisible: boolean
}
const AppContent = memo((props: AppContentProps): React.ReactElement => {
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {props.isSignedIn && <MainNavigator />}
      {!props.isSignedIn && <SetupView />}
      <ConfirmationPopup {...props.modalProps} isVisible={props.modalVisible} />
    </>
  )
})

const App = (): React.ReactElement | null => {
  const state = useTrackedState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (state.status === StateStatus.UNINITIALIZED) {
      dispatch(initializeAction)
    }
  })

  const [loaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    '$text-font-family': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (window === undefined && !loaded) {
    return null
  }

  // Check if state is already set up
  if (state.status !== StateStatus.READY) {
    return <Text>Loading</Text>
  }

  const theme: ThemeType = (eva as any)[state.settings.theme]

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider customMapping={mapping} theme={theme} {...eva}>
        <AppContent isSignedIn={state.account.isSignedIn} modalProps={state.confirmation.modalProps} modalVisible={state.confirmation.visible} />
      </ApplicationProvider>
    </>
  )
}

export default App
