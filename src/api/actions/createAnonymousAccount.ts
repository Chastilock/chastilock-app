import { createAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'

export default createAction({
  actionName: 'create_anonymous_account',
  query: `
    mutation CreateUserAnon {
      createUserAnon {
        User_ID,
        UUID,
        Keyholder,
        Lockee,
        Emergency_Keys
      }
    }
  `,
  handleResponse: (options) => {
    const user: User = {
      userId: options.response.data.me.User_ID,
      uuid: options.response.data.me.UUID,
      isKeyholder: options.response.data.me.Keyholder,
      isLockee: options.response.data.me.Lockee,
      emergencyKeys: options.response.data.me.Emergency_Keys
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  }
})
