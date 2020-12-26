export enum Global {
  initialize = 'global/initialize',
  loadState = 'global/load_state'
}

export enum Settings {
  changeTheme = 'settings/change_theme',
  setShowPublicStats = 'settings/set_show_public_stats'
}

export enum Confirmation {
  showConfirmation = 'confirmation/show',
  closeConfirmation = 'confirmation/close'
}

export default {
  Global,
  Settings
}
