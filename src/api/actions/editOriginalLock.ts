import { CreateLockRequest } from './createOriginalLock'
import { createAction, ApiAction } from './genericAction'
import { CreatedLockSegment } from './segments'

export interface EditLockRequest extends CreateLockRequest {
  Lock_ID: number
}

export default (request?: EditLockRequest): ApiAction => createAction({
  actionName: 'edit_original_lock',
  query: `
    mutation EditOriginalLock(
      $Lock_ID: Int!,
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
      editOriginalLock(
        Lock_ID: $Lock_ID,
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
        ${CreatedLockSegment}
      }
    }
  `,
  getVariables: () => ({
    ...request
  }),
  handleResponse: (options) => {
    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response
    })
  }
})
