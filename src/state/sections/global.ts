import { ActionType } from '@chastilock/state/reducer'
import apiActions from '@chastilock/api/actions'

export interface GlobalState {
  isConnected: boolean
  connectionError: string
}

export const initialState: GlobalState = {
  isConnected: false,
  connectionError: ''
}

const globalReducer = (action: ActionType, state: GlobalState = initialState): GlobalState => {
  switch (action.type) {
    case apiActions.checkStatus().KEY_RECEIVE:
      return {
        ...state,
        isConnected: true
      }
    case apiActions.checkStatus().KEY_ERROR:
      return {
        ...state,
        isConnected: false,
        connectionError: action.error.message
      }
  }
  return state
}
globalReducer.reducerName = 'global'

export default globalReducer
