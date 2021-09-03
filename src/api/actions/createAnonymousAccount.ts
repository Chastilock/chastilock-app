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
      userId: options.response.data.createUserAnon.User_ID,
      uuid: options.response.data.createUserAnon.UUID,
      isKeyholder: options.response.data.createUserAnon.Keyholder,
      isLockee: options.response.data.createUserAnon.Lockee,
      emergencyKeys: options.response.data.createUserAnon.Emergency_Keys
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  }
})
