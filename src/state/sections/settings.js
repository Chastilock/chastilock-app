import types from '../reducer/types';

export const initialState = {
  theme: 'dark',
  publicStats: false
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SETTINGS.CHANGE_THEME:
      return {
        ...state,
        theme: action.newTheme
      }
    case types.SETTINGS.SET_SHOW_PUBLIC_STATS:
      return {
        ...state,
        publicStats: action.publicStats
      }
  }
  return state;
};

export const actions = {
  changeTheme: newTheme => ({
    type: types.SETTINGS.CHANGE_THEME,
    newTheme
  }),
  setPublicStats: publicStats => ({
    type: types.SETTINGS.SET_SHOW_PUBLIC_STATS,
    publicStats
  })
}

export default settingsReducer;