import React from 'react'
import { createContainer } from 'react-tracked'

import useAsyncReducer from './useAsyncReducer'
import reducer, { ActionType, StateStatus, StateType } from './reducer'
import { notifyOnChange, sendInit } from './reducer/devTools'
import { Global } from './types'

export const initialState = {
  status: StateStatus.UNINITIALIZED
}

sendInit(initialState)

const useValue = (): [any, (action: any) => void] => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState)

  notifyOnChange((newState) => {
    dispatch({
      type: Global.internalSetState,
      newState
    })
  })

  return [state, dispatch]
}
const {
  Provider,
  useTracked,
  useTrackedState,
  useUpdate: useDispatch
}: {
  Provider: React.FC
  useTracked: () => [StateType, (action: any) => void]
  useTrackedState: () => StateType
  useUpdate: () => (action: any) => void
} = createContainer(useValue)

interface StateProviderProps { children?: React.ReactElement }
export const StateProvider = (props: StateProviderProps): React.ReactElement => (
  <Provider>
    {props.children}
  </Provider>
)

export { useTracked, useTrackedState, useDispatch }
