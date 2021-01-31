import { createAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'
import { AUTH_VARIABLES } from '../client'

export default createAction({
  actionName: 'create_anonymous_account',
  query: `
    mutation CreateUserAnon($apiKey: String!, $apiSecret: String!) {
      createUserAnon(APIKey: $apiKey, APISecret: $apiSecret) {
        UUID, User_ID
      }
    }
  `,
  getVariables: () => AUTH_VARIABLES,
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
