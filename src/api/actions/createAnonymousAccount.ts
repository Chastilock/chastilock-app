import { createAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'

export default createAction({
  actionName: 'create_anonymous_account',
  query: `
    mutation CreateUserAnon {
      createUserAnon {
        UUID, User_ID
      }
    }
  `,
  handleResponse: (options) => {
    const user: User = {
      userId: options.response.data.createUserAnon.User_ID,
      uuid: options.response.data.createUserAnon.UUID
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  }
})
