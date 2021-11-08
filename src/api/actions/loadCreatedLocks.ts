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
        Require_DM
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
