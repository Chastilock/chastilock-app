import { CreatedLock } from '@chastilock/state/sections/createdlock'
import { createAction, ApiAction } from './genericAction'

export default (): ApiAction => createAction({
  actionName: 'load_created_locks',
  query: `
    query {
      myCreatedLocks {
        Lock_ID,
        Shared,
        Shared_Code,
        Lock_Name,
        Disabled,
        Allow_Fakes,
        Min_Fakes,
        Max_Fakes,
        Checkins_Enabled,
        Checkins_Frequency,
        Checkins_Window,
        Allow_Buyout,
        Start_Lock_Frozen,
        Disable_Keyholder_Decision,
        Limit_Users,
        User_Limit_Amount,
        Block_Test_Locks,
        Block_User_Rating_Enabled,
        Block_User_Rating,
        Block_Already_Locked,
        Block_Stats_Hidden,
        Only_Accept_Trusted,
        Require_DM,
        OriginalLockType {
          Original_Deck_ID,
          Variable_Max_Greens,
          Variable_Max_Reds,
          Variable_Max_Freezes,
          Variable_Max_Doubles,
          Variable_Max_Resets,
          Variable_Max_Stickies,
          Variable_Max_AddRed,
          Variable_Max_RemoveRed,
          Variable_Max_RandomRed,
          Variable_Min_Greens,
          Variable_Min_Reds,
          Variable_Min_Freezes,
          Variable_Min_Doubles,
          Variable_Min_Resets,
          Variable_Min_Stickies,
          Variable_Min_AddRed,
          Variable_Min_RemoveRed,
          Variable_Min_RandomRed,
          Chance_Period,
          Cumulative,
          Multiple_Greens_Required,
          Hide_Card_Info,
          Auto_Resets_Enabled,
          Reset_Frequency,
          Max_Resets,
          Imported_From_CK
        }
      }
    }
  `,
  handleResponse: (options) => {
    const createdLocks: CreatedLock[] = options.response.data.myCreatedLocks

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      createdLocks
    })

    return createdLocks
  }
})
