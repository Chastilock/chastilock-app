import settings, { SettingsState } from '@chastilock/state/sections/settings'

export interface StateType {
  settings: SettingsState
}

export interface ActionType {
  type: string
}

const reducers = [
  settings
]

const rootReducer = (state: any = {}, action: ActionType = { type: '' }): StateType => {
  const newState: any = {}

  reducers.forEach(reducer => { newState[reducer.reducerName] = reducer(action, state.settings) })

  /* Object.keys(reducers).forEach(key => {
    newState[key] = reducers[key](action, state[key])
  }) */

  return newState
}

export default rootReducer
