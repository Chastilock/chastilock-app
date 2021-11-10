import { ActionType } from '@chastilock/state/reducer'
import { CreatedLock as CreatedLockType } from '@chastilock/state/types'
import * as apiActions from '@chastilock/api/actions'

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
  OriginalLockType: OriginalLockType
}

export interface OriginalLockType {
  Original_Deck_ID: number
  Variable_Max_Greens: number
  Variable_Max_Reds: number
  Variable_Max_Freezes: number
  Variable_Max_Doubles: number
  Variable_Max_Resets: number
  Variable_Max_Stickies: number
  Variable_Max_AddRed: number
  Variable_Max_RemoveRed: number
  Variable_Max_RandomRed: number
  Variable_Min_Greens: number
  Variable_Min_Reds: number
  Variable_Min_Freezes: number
  Variable_Min_Doubles: number
  Variable_Min_Resets: number
  Variable_Min_Stickies: number
  Variable_Min_AddRed: number
  Variable_Min_RemoveRed: number
  Variable_Min_RandomRed: number
  Chance_Period: number
  Cumulative: boolean
  Multiple_Greens_Required: boolean
  Hide_Card_Info: boolean
  Auto_Resets_Enabled: boolean
  Reset_Frequency: number
  Max_Resets: number
  Imported_From_CK: Boolean
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
    case apiActions.createOriginalLock().KEY_RECEIVE: {
      return {
        ...state,
        locks: [
          action.response.data.createOriginalLock,
          ...state.locks
        ]
      }
    }
    case apiActions.editOriginalLock().KEY_RECEIVE: {
      return {
        ...state,
        locks: [
          action.response.data.editOriginalLock,
          ...state.locks.filter(lock => lock.Lock_ID !== action.response.data.editOriginalLock.Lock_ID)
        ]
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
