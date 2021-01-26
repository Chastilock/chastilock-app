import { useTrackedState } from '@chastilock/state'

import defaultTranslations from '../assets/translations/english_gb.json'

export const useTranslation = (): [(key: string) => string] => {
  const state = useTrackedState()

  return [(key: string) => state.i18n.translations[key] ?? (defaultTranslations as any)[key] ?? key]
}

export default useTranslation
