import { useReducer } from 'react'
import { ActionType } from './reducer'

export type DispatchType = (action: ActionType | DispatchType) => void

const useAsyncReducer = (reducer: any, initialState: any): [any, (action: any) => void] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const dispatchProxy = (action: ActionType | DispatchType): void => {
    if (typeof action === 'function') {
      action(dispatchProxy)
    } else {
      (dispatch as any)(action)
    }
  }

  return [state, dispatchProxy]
}

export default useAsyncReducer
