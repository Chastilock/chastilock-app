import React from 'react'
import { createContainer } from 'react-tracked'

import useAsyncReducer, { DispatchType } from './useAsyncReducer'
import reducer, { ActionType, StateStatus, StateType } from './reducer'
import { notifyOnChange, sendInit } from './reducer/devTools'
import { Global } from './types'

export const initialState = {
  status: StateStatus.UNINITIALIZED
}

sendInit(initialState)

const useValue = (): [any, (action: any) => void | Promise<void>] => {
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
  useTrackedState,
  useUpdate
}: {
  Provider: React.FC
  useTrackedState: () => StateType
  useUpdate: () => (action: any) => void | Promise<void>
} = createContainer<any, (action: any) => void | Promise<void>, any>(useValue)

interface StateProviderProps { children?: React.ReactElement }
export const StateProvider = (props: StateProviderProps): React.ReactElement => (
  <Provider>
    {props.children}
  </Provider>
)

const useDispatch = (): (action: any) => any => {
  const dispatch = useUpdate()

  const dispatchProxy = React.useMemo(() => (action: ActionType | DispatchType): void => {
    if (typeof action === 'function') {
      return action(dispatchProxy)
    } else {
      return (dispatch as any)(action)
    }
  }, [dispatch])

  return dispatchProxy
}

export { useTrackedState, useDispatch }
