import React, { memo, useEffect } from 'react'
import { StatusBar, Text, Platform, ScrollView, View } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, ThemeType } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useFonts } from 'expo-font'

import { useDispatch, useTrackedState } from '@chastilock/state'
import { initializeAction, StateStatus, StateType } from '@chastilock/state/reducer'
import { actions as confirmationActions } from '@chastilock/state/sections/confirmation'
import { actions as accountActions } from '@chastilock/state/sections/account'
import apiActions from '@chastilock/api/actions'
import MainNavigator from '@chastilock/views/MainNavigator'
import ConfirmationPopup, { ConfirmationPopupProps } from '@chastilock/views/common/ConfirmationPopup'
import SetupView from '@chastilock/views/setup/SetupView'
import customMapping from './mapping.json'
import { useTranslation } from './components'
import { selectors as settingsSelectors } from '@chastilock/state/sections/settings'

interface AppContentProps {
  isSetUp: boolean
  modalProps: ConfirmationPopupProps
  modalVisible: boolean
}
const AppContent = memo((props: AppContentProps): React.ReactElement => {
  const state = useTrackedState()

  return (
    <ScrollView style={{ backgroundColor: settingsSelectors.getThemeBackground(state.settings) }} contentContainerStyle={{ minHeight: '100%' }} >
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {props.isSetUp && <View style={{ flex: 1 }}><MainNavigator /></View>}
      {!props.isSetUp && <SetupView />}
      <ConfirmationPopup {...props.modalProps} isVisible={props.modalVisible} />
    </ScrollView>
  )
})

const App = (): React.ReactElement | null => {
  const state = useTrackedState()
  const dispatch = useDispatch()
  const [translate] = useTranslation()

  useEffect(() => {
    if (state.status === StateStatus.UNINITIALIZED) {
      dispatch(initializeAction).then((result: StateType) => {
        // Only check status if a token is available
        if (!(result.account?.token === undefined || result.account?.token === null)) {
          apiActions.checkStatus(parseInt(result.account?.user?.userId ?? '0'), result.account?.token).execute(dispatch).catch(() => {
            // If an error happens here, we are going to sign the user off
            dispatch(accountActions.signOut())
            setTimeout(() => {
              dispatch(confirmationActions.closeConfirmation())
            }, 0)
          })
        } else {
          // Fake that the check was successful
          dispatch({
            type: apiActions.checkStatus().KEY_RECEIVE
          })
        }
      })
    }
  }, [state.status])

  useEffect(() => {
    if (state.status === StateStatus.NETWORK_ERROR) {
      dispatch(confirmationActions.showConfirmation({
        title: translate('general.connection_failed.title'),
        text: `${translate('general.connection_failed.text')}\n\n${state.global.connectionError}`,
        isForced: true
      }))
    } else if (state.status === StateStatus.CONNECTING) {
      dispatch(confirmationActions.showConfirmation({
        title: translate('general.connecting.title'),
        isForced: true
      }))
    } else {
      dispatch(confirmationActions.closeConfirmation())
    }
  }, [state.status, state.global?.connectionError])

  const [loaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    /* '$text-font-family': require('./assets/fonts/OpenSans-Regular.ttf'), */
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (Platform.OS !== 'web' && !loaded) {
    return null
  }

  // Check if state is already set up
  if (state.status === StateStatus.UNINITIALIZED || state.status === StateStatus.INITIALIZING) {
    return <Text>Loading</Text>
  }

  const theme: ThemeType = (eva as any)[state.settings.theme]

  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider customMapping={customMapping} theme={theme} {...eva}>
        <AppContent isSetUp={state.account.isSetUp} modalProps={state.confirmation.modalProps} modalVisible={state.confirmation.visible} />
      </ApplicationProvider>
    </>
  )
}

export default App
