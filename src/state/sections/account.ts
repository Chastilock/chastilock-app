import createAnonAccountAction from '@chastilock/api/actions/createAnonymousAccount'
import loginAnonAction from '@chastilock/api/actions/loginAnon'
import { ActionType } from '@chastilock/state/reducer'
import { Account } from '@chastilock/state/types'

export interface AccountState {
  isSignedIn: boolean
  user?: User
  temporaryUser?: User
}

export interface User {
  userId: string
  uuid: string
  email?: string
  username?: string
  token?: string
}

export const initialState: AccountState = {
  isSignedIn: false
}

const accountReducer = (action: ActionType, state: AccountState = initialState): AccountState => {
  switch (action.type) {
    case Account.signIn:
      return {
        isSignedIn: true,
        user: action.user
      }
    case Account.signOut:
      return {
        isSignedIn: false
      }
    case createAnonAccountAction.KEY_RECEIVE:
      return {
        ...state,
        temporaryUser: action.user
      }
    case loginAnonAction().KEY_RECEIVE:
      return {
        isSignedIn: true,
        user: action.user
      }
  }
  return state
}
accountReducer.reducerName = 'account'

interface SignInAction {
  type: Account
  user: User
}

export const actions = {
  signIn: (user: User): SignInAction => ({
    type: Account.signIn,
    user
  }),
  signOut: (): ActionType => ({
    type: Account.signOut
  })
}

export const selectors = {
  isAnonymous: (state: AccountState): boolean => state.user?.email === undefined
}

export default accountReducer
