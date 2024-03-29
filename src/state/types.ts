export enum Global {
  initialize = 'global/initialize',
  loadState = 'global/load_state',
  internalSetState = 'global/internal_set_state'
}

export enum Settings {
  changeTheme = 'settings/change_theme',
  setShowPublicStats = 'settings/set_show_public_stats'
}

export enum Confirmation {
  showConfirmation = 'confirmation/show',
  closeConfirmation = 'confirmation/close'
}

export enum Account {
  signIn = 'account/sign_in',
  signOut = 'account/sign_out',
  setup = 'account/setup'
}

export enum I18n {
  setLanguage = 'i18n/set_language',
  initialLoad = 'i18n/initial_load'
}

export enum CreatedLock {
  add = 'created_lock/add',
  set = 'created_lock/set'
}

export default {
  Global,
  Settings
}
