import settings from '../sections/settings';

const initialState = {};

const reducers = {
  settings
};

const rootReducer = (state = initialState, action = { type: '' }) => {
  const newState = {};

  Object.keys(reducers).forEach(key => {
    newState[key] = reducers[key](state[key], action);
  });

  return newState;
};

export default rootReducer;
