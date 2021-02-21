import React from 'react'
import { ActionType } from './reducer'

export type DispatchType = (action: ActionType | DispatchType) => void

const useAsyncReducer = (reducer: any, initialState: any): [any, (action: any) => void] => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return [state, dispatch]
}

export default useAsyncReducer
