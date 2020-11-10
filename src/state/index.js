import React, { createContext, useContext, useReducer } from 'react';
import { createContainer } from 'react-tracked';

import reducer from './reducer';

export const initialState = reducer();

const useValue = () => useReducer(reducer, initialState);
const { Provider, useTracked, useTrackedState, useUpdate: useDispatch, useSelector } = createContainer(useValue);

export const StateProvider = ({ children }) =>(
  <Provider>
    {children}
  </Provider>
);

export { useTracked, useTrackedState, useDispatch, useSelector };