import { ActionType } from 'state/reducer'
import { Settings } from 'state/reducer/types'

export interface SettingsState {
  theme: string
  publicStats: boolean
}

export const initialState: SettingsState = {
  theme: 'dark',
  publicStats: false
}

const settingsReducer = (action: ActionType, state: SettingsState = initialState): SettingsState => {
  switch (action.type) {
    case Settings.changeTheme:
      return {
        ...state,
        theme: (action as ChangeThemeAction).newTheme
      }
    case Settings.setShowPublicStats:
      return {
        ...state,
        publicStats: (action as SetPublicStatsAction).publicStats
      }
  }
  return state
}
settingsReducer.reducerName = 'settings'

interface ChangeThemeAction {
  type: Settings
  newTheme: string
}

interface SetPublicStatsAction {
  type: Settings
  publicStats: boolean
}

export const actions = {
  changeTheme: (newTheme: string): ChangeThemeAction => ({
    type: Settings.changeTheme,
    newTheme
  }),
  setPublicStats: (publicStats: boolean): SetPublicStatsAction => ({
    type: Settings.setShowPublicStats,
    publicStats
  })
}

export default settingsReducer
