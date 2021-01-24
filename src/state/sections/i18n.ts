import { ActionType } from '@chastilock/state/reducer'
import { I18n } from '@chastilock/state/types'

export interface I18nState {
  translations: {
    [name: string]: string
  }
  language: string
}

export const AVAILABLE_LANGUAGES = [
  'English GB',
  'German'
]

export const DEFAULT_LANGUAGE = 'English GB'
export const initialState: I18nState = {
  translations: {},
  language: DEFAULT_LANGUAGE
}

export const getLanguageFileName = (language: string): string =>
  language.replaceAll(' ', '_').toLowerCase()

const i18nReducer = (action: ActionType, state: I18nState = initialState): I18nState => {
  let newLanguage: string
  switch (action.type) {
    case I18n.setLanguage:
      newLanguage = (action as SetLanguageAction).language
      return {
        language: newLanguage,
        translations: require('../../assets/translations/' + getLanguageFileName(newLanguage))
      }
    case I18n.initialLoad:
      return {
        ...state,
        translations: require('../../assets/translations/' + getLanguageFileName(state.language))
      }
  }
  return state
}
i18nReducer.reducerName = 'i18n'

interface SetLanguageAction {
  type: I18n
  language: string
}

export const actions = {
  setLanguage: (language: string): SetLanguageAction => ({
    type: I18n.setLanguage,
    language
  }),
  initialLoad: (): ActionType => ({
    type: I18n.initialLoad
  })
}

export default i18nReducer
