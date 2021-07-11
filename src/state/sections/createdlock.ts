import { ActionType } from '@chastilock/state/reducer'
import { CreatedLock as CreatedLockType } from '@chastilock/state/types'

export interface CreatedLockState {
  locks: CreatedLock[]
  isLoaded: boolean
}

export interface CreatedLock {
  Lock_ID: string
  Shared: boolean
  Shared_Code: string
  Lock_Name: string
  Disabled: boolean
  Allow_Fakes: boolean
  Min_Fakes: number
  Max_Fakes: number
  Checkins_Enabled: boolean
  Checkins_Frequency: number
  Checkins_Window: number
  Allow_Buyout: boolean
  Start_Lock_Frozen: boolean
  Disable_Keyholder_Decision: boolean
  Limit_Users: boolean
  User_Limit_Amount: number
  Block_Test_Locks: boolean
  Block_User_Rating_Enabled: boolean
  Block_User_Rating: number
  Block_Already_Locked: boolean
  Block_Stats_Hidden: boolean
  Only_Accept_Trusted: boolean
  Require_DM: boolean
}

export const initialState: CreatedLockState = {
  isLoaded: false,
  locks: []
}

const createdLockReducer = (action: ActionType, state: CreatedLockState = initialState): CreatedLockState => {
  switch (action.type) {
    case CreatedLockType.add: {
      return {
        ...state,
        locks: [...state.locks, action.lock],
        isLoaded: true
      }
    }
    case CreatedLockType.set: {
      return {
        ...state,
        locks: action.locks,
        isLoaded: true
      }
    }
  }
  return state
}
createdLockReducer.reducerName = 'createdLock'

interface AddLockAction {
  type: CreatedLockType
  lock: CreatedLock
}
interface SetLocksAction {
  type: CreatedLockType
  locks: CreatedLock[]
}

export const actions = {
  add: (lock: CreatedLock): AddLockAction => ({
    type: CreatedLockType.add,
    lock
  }),
  set: (locks: CreatedLock[]): SetLocksAction => ({
    type: CreatedLockType.set,
    locks
  })
}

export default createdLockReducer
