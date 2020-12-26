import AsyncStorage from '@react-native-async-storage/async-storage'
import { StateType } from '.'

const STORAGE_KEY = 'chastilock_persisted_state'

/**
 * This function filters a state so that only information is contained
 * that needs to be stored.
 * @param state the current state
 * @return an object containing only the desired state
 */
export const getStoredState = (state: StateType): any => ({
  settings: state.settings
})

export const store = async (state: StateType): Promise<void> => {
  const serializedString = JSON.stringify(getStoredState(state))

  await AsyncStorage.setItem(STORAGE_KEY, serializedString)
}

export const load = async (): Promise<StateType> => {
  const state = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) ?? '{}')

  return state
}
