import createAnonAccountAction from '@chastilock/api/actions/createAnonymousAccount'
import apiActions from '@chastilock/api/actions'
import { ActionType } from '@chastilock/state/reducer'
import { Account } from '@chastilock/state/types'

export interface AccountState {
  isSetUp: boolean
  user?: User
  temporaryUser?: User
  token?: String
  signInError?: string
  registerError?: string
}

export interface User {
  userId: string
  uuid: string
  email?: string
  username?: string
  token?: string
}

export const initialState: AccountState = {
  isSetUp: false
}

const accountReducer = (action: ActionType, state: AccountState = initialState): AccountState => {
  switch (action.type) {
    case Account.signIn:
      return {
        ...state,
        user: action.user
      }
    case Account.signOut:
      return {
        isSetUp: false
      }
    case Account.setup:
      return {
        ...state,
        isSetUp: true
      }
    case createAnonAccountAction.KEY_RECEIVE:
      return {
        ...state,
        temporaryUser: action.user
      }
    case apiActions.loginAnon().KEY_RECEIVE:
      return {
        ...state,
        user: action.user,
        token: action.token
      }
    case apiActions.login().KEY_RECEIVE:
      return {
        ...state,
        user: action.user,
        token: action.token
      }
    case apiActions.login().KEY_ERROR:
      return {
        ...state,
        signInError: action.error.message
      }
    case apiActions.register().KEY_RECEIVE:
      return {
        ...state,
        user: action.user,
        token: action.token
      }
    case apiActions.register().KEY_ERROR:
      return {
        ...state,
        registerError: action.error.message
      }
  }
  return state
}
accountReducer.reducerName = 'account'

interface SignInAction {
  type: Account
  user: User
}

interface registerAction {
  type: Account
  user: User
}

export const actions = {
  signIn: (user: User): SignInAction => ({
    type: Account.signIn,
    user
  }),
  register: (user: User): registerAction => ({
    type: Account.signIn,
    user
  }),
  signOut: (): ActionType => ({
    type: Account.signOut
  }),
  setup: (): ActionType => ({
    type: Account.setup
  })
}

export const selectors = {
  isAnonymous: (state: AccountState): boolean => state.user?.email === undefined
}

export default accountReducer
