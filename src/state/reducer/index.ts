import * as Storage from './storage'
import * as ActionTypes from './types'

import settings, { SettingsState } from '@chastilock/state/sections/settings'
import confirmation, { ConfirmationState } from '@chastilock/state/sections/confirmation'

export enum StateStatus {
  UNINITIALIZED = 'uninitialized',
  INITIALIZING = 'initializing',
  READY = 'ready'
}

export interface StateType {
  settings: SettingsState
  status: StateStatus
  confirmation: ConfirmationState
}

export interface ActionType {
  type: string
}

export const reducers = [
  settings,
  confirmation
]

export const initializeAction = async (dispatch: (action: any) => void): Promise<void> => {
  dispatch({ type: ActionTypes.Global.initialize })

  const state = await Storage.load()
  dispatch({ type: ActionTypes.Global.loadState, state })
}

const rootReducer = (state: any = { status: 'initializing' }, action: any = { type: '' }): StateType => {
  const newState: any = {
    status: state.status
  }

  reducers.forEach(reducer => { newState[reducer.reducerName] = reducer(action, state.settings) })

  // Store data
  if (action.type === ActionTypes.Global.initialize) {
    newState.status = StateStatus.INITIALIZING
  }

  // Load data
  if (action.type === ActionTypes.Global.loadState) {
    Object.keys(action.state).forEach((key: string) => {
      newState[key] = action.state[key]
    })
    newState.status = StateStatus.READY
  }
  Storage.store(newState).then(() => {}).catch(e => console.log('Failed to store data', e))

  return newState
}

export default rootReducer
