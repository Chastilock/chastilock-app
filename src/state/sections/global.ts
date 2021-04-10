import { ActionType } from '@chastilock/state/reducer'
import apiActions from '@chastilock/api/actions'

export interface GlobalState {
  connectionError: string
}

export const initialState: GlobalState = {
  connectionError: ''
}

const globalReducer = (action: ActionType, state: GlobalState = initialState): GlobalState => {
  switch (action.type) {
    case apiActions.checkStatus().KEY_ERROR:
      return {
        ...state,
        connectionError: action.error.message
      }
  }
  return state
}
globalReducer.reducerName = 'global'

export default globalReducer
