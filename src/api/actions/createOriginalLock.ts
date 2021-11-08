import { createAction, ApiAction } from './genericAction'
import { User } from '@chastilock/state/sections/account'

export interface CreateLockRequest {
  LockName: string
  Shared: boolean
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
  Allow_Fakes: boolean
  Min_Fakes: number
  Max_Fakes: number
  Auto_Resets_Enabled: boolean
  Reset_Frequency: number
  Max_Resets: number
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

export default (request: CreateLockRequest): ApiAction => createAction({
  actionName: 'create_original_lock',
  query: `
    mutation CreateOriginalLock(
      $LockName: String,
      $Shared: Boolean!,
      $Variable_Max_Greens: Int!,
      $Variable_Max_Reds: Int!,
      $Variable_Max_Freezes: Int!,
      $Variable_Max_Doubles: Int!,
      $Variable_Max_Resets: Int!,
      $Variable_Max_Stickies: Int!,
      $Variable_Max_AddRed: Int!,
      $Variable_Max_RemoveRed: Int!,
      $Variable_Max_RandomRed: Int!,
      $Variable_Min_Greens: Int!,
      $Variable_Min_Reds: Int!,
      $Variable_Min_Freezes: Int!,
      $Variable_Min_Doubles: Int!,
      $Variable_Min_Resets: Int!,
      $Variable_Min_Stickies: Int!,
      $Variable_Min_AddRed: Int!,
      $Variable_Min_RemoveRed: Int!,
      $Variable_Min_RandomRed: Int!,
      $Chance_Period: Int!,
      $Cumulative: Boolean!,
      $Multiple_Greens_Required: Boolean!,
      $Hide_Card_Info: Boolean!,
      $Allow_Fakes: Boolean!,
      $Min_Fakes: Int,
      $Max_Fakes: Int,
      $Auto_Resets_Enabled: Boolean!,
      $Reset_Frequency: Int,
      $Max_Resets: Int,
      $Checkins_Enabled: Boolean!,
      $Checkins_Frequency: Float,
      $Checkins_Window: Float,
      $Allow_Buyout: Boolean!,
      $Start_Lock_Frozen: Boolean!,
      $Disable_Keyholder_Decision: Boolean!,
      $Limit_Users: Boolean!,
      $User_Limit_Amount: Int,
      $Block_Test_Locks: Boolean!,
      $Block_User_Rating_Enabled: Boolean!,
      $Block_User_Rating: Int,
      $Block_Already_Locked: Boolean!,
      $Block_Stats_Hidden: Boolean!,
      $Only_Accept_Trusted: Boolean!,
      $Require_DM: Boolean!
    ) {
      createOriginalLock(
        LockName: $LockName,
        Shared: $Shared,
        Variable_Max_Greens: $Variable_Max_Greens,
        Variable_Max_Reds: $Variable_Max_Reds,
        Variable_Max_Freezes: $Variable_Max_Freezes,
        Variable_Max_Doubles: $Variable_Max_Doubles,
        Variable_Max_Resets: $Variable_Max_Resets,
        Variable_Max_Stickies: $Variable_Max_Stickies,
        Variable_Max_AddRed: $Variable_Max_AddRed,
        Variable_Max_RemoveRed: $Variable_Max_RemoveRed,
        Variable_Max_RandomRed: $Variable_Max_RandomRed,
        Variable_Min_Greens: $Variable_Min_Greens,
        Variable_Min_Reds: $Variable_Min_Reds,
        Variable_Min_Freezes: $Variable_Min_Freezes,
        Variable_Min_Doubles: $Variable_Min_Doubles,
        Variable_Min_Resets: $Variable_Min_Resets,
        Variable_Min_Stickies: $Variable_Min_Stickies,
        Variable_Min_AddRed: $Variable_Min_AddRed,
        Variable_Min_RemoveRed: $Variable_Min_RemoveRed,
        Variable_Min_RandomRed: $Variable_Min_RandomRed,
        Chance_Period: $Chance_Period,
        Cumulative: $Cumulative,
        Multiple_Greens_Required: $Multiple_Greens_Required,
        Hide_Card_Info: $Hide_Card_Info,
        Allow_Fakes: $Allow_Fakes,
        Min_Fakes: $Min_Fakes,
        Max_Fakes: $Max_Fakes,
        Auto_Resets_Enabled: $Auto_Resets_Enabled,
        Reset_Frequency: $Reset_Frequency,
        Max_Resets: $Max_Resets,
        Checkins_Enabled: $Checkins_Enabled,
        Checkins_Frequency: $Checkins_Frequency,
        Checkins_Window: $Checkins_Window,
        Allow_Buyout: $Allow_Buyout,
        Start_Lock_Frozen: $Start_Lock_Frozen,
        Disable_Keyholder_Decision: $Disable_Keyholder_Decision,
        Limit_Users: $Limit_Users,
        User_Limit_Amount: $User_Limit_Amount,
        Block_Test_Locks: $Block_Test_Locks,
        Block_User_Rating_Enabled: $Block_User_Rating_Enabled,
        Block_User_Rating: $Block_User_Rating,
        Block_Already_Locked: $Block_Already_Locked,
        Block_Stats_Hidden: $Block_Stats_Hidden,
        Only_Accept_Trusted: $Only_Accept_Trusted,
        Require_DM: $Require_DM
      ) {
        Lock_ID
      }
    }
  `,
  getVariables: () => request,
  handleResponse: (options) => {
    const user: User = {
      userId: options.response.data.loginAnon.User.User_ID,
      uuid: options.response.data.loginAnon.User.UUID,
      isKeyholder: options.response.data.loginAnon.User.isKeyholder,
      isLockee: options.response.data.loginAnon.User.isLockee,
      emergencyKeys: options.response.data.loginAnon.User.emergencyKeys
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  }
})
