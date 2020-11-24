import React, { useReducer } from 'react'
import { createContainer } from 'react-tracked'

import reducer, { ActionType, StateType } from './reducer'

export const initialState = reducer()

const useValue = (): any => useReducer(reducer, initialState)
const {
  Provider,
  useTracked,
  useTrackedState,
  useUpdate: useDispatch
}: {
  Provider: React.FC
  useTracked: () => [StateType, (action: ActionType) => void]
  useTrackedState: () => StateType
  useUpdate: () => (action: ActionType) => void
} = createContainer(useValue)

interface StateProviderProps { children?: React.ReactElement }
export const StateProvider = (props: StateProviderProps): React.ReactElement => (
  <Provider>
    {props.children}
  </Provider>
)

export { useTracked, useTrackedState, useDispatch }
