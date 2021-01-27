import React, { useState, useMemo } from 'react'

import { actions as confirmActions } from '@chastilock/state/sections/confirmation'
import { useDispatch } from '@chastilock/state'
import apiActions from '@chastilock/api/actions'
import SetupSelection from './SetupSelection'
import AnonymousBackup from './AnonymousBackup'

enum SetupState {
  SETUP_SELECTION,
  ANONYMOUS_ACCOUNT_BACKUP,
  SIGN_IN,
  RECOVER
}

const SetupView = (): React.ReactElement | null => {
  const dispatch = useDispatch()
  const [setupState, setSetupState] = useState(SetupState.SETUP_SELECTION)

  const createAnonymousAccount = useMemo(() => (): void => {
    dispatch(confirmActions.showConfirmation({
      title: 'Anonymous account',
      text: 'An anonymous account will be created for you. You should really back up your unique id that is presented to you next (preferably in cloud storage). You can also always upgrade the account later on.',
      onOk: () => {
        setSetupState(SetupState.ANONYMOUS_ACCOUNT_BACKUP)
        dispatch(apiActions.createAnonymousAccount)
      }
    }))
  }, [setSetupState])

  switch (setupState) {
    case SetupState.SETUP_SELECTION:
      return (
        <SetupSelection
          onRegister={() => {}}
          onDirect={createAnonymousAccount}
          onSignIn={() => {}}
          onRecover={() => {}}
        />
      )
    case SetupState.ANONYMOUS_ACCOUNT_BACKUP:
      return <AnonymousBackup />
    default:
      return null
  }
}

export default SetupView
