import React, { useState, useMemo } from 'react'

import { actions as confirmActions } from '@chastilock/state/sections/confirmation'
import { useDispatch } from '@chastilock/state'
import apiActions from '@chastilock/api/actions'
import { useTranslation } from '@chastilock/components'
import SetupSelection from './SetupSelection'
import AnonymousBackup from './AnonymousBackup'
import AnonymousRecover from './AnonymousRecover'
import Login from './Login'

enum SetupState {
  SETUP_SELECTION,
  ANONYMOUS_ACCOUNT_BACKUP,
  SIGN_IN,
  RECOVER
}

const SetupView = (): React.ReactElement | null => {
  const dispatch = useDispatch()
  const [setupState, setSetupState] = useState(SetupState.SETUP_SELECTION)
  const [translate] = useTranslation()

  const createAnonymousAccount = useMemo(() => (): void => {
    dispatch(confirmActions.showConfirmation({
      title: translate('settings.anonymous_warning.title'),
      text: translate('settings.anonymous_warning.content'),
      onOk: () => {
        setSetupState(SetupState.ANONYMOUS_ACCOUNT_BACKUP)
        dispatch(apiActions.createAnonymousAccount.execute)
      }
    }))
  }, [setSetupState])

  const signIn = (): void => {
    setSetupState(SetupState.SIGN_IN)
  }

  const recover = (): void => {
    setSetupState(SetupState.RECOVER)
  }

  const back = (): void => {
    setSetupState(SetupState.SETUP_SELECTION)
  }

  switch (setupState) {
    case SetupState.SETUP_SELECTION:
      return (
        <SetupSelection
          onRegister={() => {}}
          onDirect={createAnonymousAccount}
          onSignIn={signIn}
          onRecover={recover}
        />
      )
    case SetupState.SIGN_IN:
      return <Login onBack={back} />
    case SetupState.ANONYMOUS_ACCOUNT_BACKUP:
      return <AnonymousBackup isInitial />
    case SetupState.RECOVER:
      return <AnonymousRecover onBack={back} />
    default:
      return null
  }
}

export default SetupView
