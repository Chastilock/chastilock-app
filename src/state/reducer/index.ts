import * as Storage from './storage'
import * as ActionTypes from '../types'

import settings, { SettingsState } from '@chastilock/state/sections/settings'
import confirmation, { ConfirmationState } from '@chastilock/state/sections/confirmation'
import account, { AccountState } from '@chastilock/state/sections/account'
import i18n, { I18nState, actions as i18nActions } from '@chastilock/state/sections/i18n'
import global, { GlobalState } from '../sections/global'
import { sendAction } from './devTools'
import apiActions from '@chastilock/api/actions'

export enum StateStatus {
  UNINITIALIZED = 'uninitialized',
  INITIALIZING = 'initializing',
  CONNECTING = 'connecting',
  READY = 'ready',
  NETWORK_ERROR = 'network_error'
}

export interface StateType {
  settings: SettingsState
  status: StateStatus
  confirmation: ConfirmationState
  account: AccountState
  i18n: I18nState
  global: GlobalState
}

export interface ActionType {
  type: string
  [name: string]: any
}

export const reducers = [
  settings,
  confirmation,
  account,
  i18n,
  global
]

export const initializeAction = async (dispatch: (action: any) => void): Promise<void> => {
  dispatch({ type: ActionTypes.Global.initialize })

  const state = await Storage.load()
  dispatch({ type: ActionTypes.Global.loadState, state })
  dispatch(i18nActions.initialLoad())
}

const rootReducer = (state: any = { status: 'initializing' }, action: any = { type: '' }): StateType => {
  const newState: any = {
    status: state.status
  }

  // Set internal state
  if (action.type === ActionTypes.Global.internalSetState) {
    return action.newState
  }

  reducers.forEach(reducer => { newState[reducer.reducerName] = reducer(action, state[reducer.reducerName]) })

  // Store data
  if (action.type === ActionTypes.Global.initialize) {
    newState.status = StateStatus.INITIALIZING
  }

  // Load data
  if (action.type === ActionTypes.Global.loadState) {
    Object.keys(action.state).forEach((key: string) => {
      newState[key] = action.state[key]
    })
    newState.status = StateStatus.CONNECTING
  }
  Storage.store(newState).then(() => {}).catch(e => console.log('Failed to store data', e))

  // After network is connected
  if (action.type === apiActions.checkStatus().KEY_RECEIVE) {
    newState.status = StateStatus.READY
  }
  // When network connection fails
  if (action.type === apiActions.checkStatus().KEY_ERROR) {
    newState.status = StateStatus.NETWORK_ERROR
  }

  // Send to dev tools
  if (action.type !== ActionTypes.Global.internalSetState) {
    sendAction(action, newState)
  }

  return newState
}

export default rootReducer
