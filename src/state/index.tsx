import React from 'react'
import { createContainer } from 'react-tracked'

import useAsyncReducer from './useAsyncReducer'
import reducer, { ActionType, StateStatus, StateType } from './reducer'

export const initialState = {
  status: StateStatus.UNINITIALIZED
}

const useValue = (): any => useAsyncReducer(reducer, initialState)
const {
  Provider,
  useTracked,
  useTrackedState,
  useUpdate: useDispatch
}: {
  Provider: React.FC
  useTracked: () => [StateType, (action: ActionType) => void]
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
