import { createAction, ApiAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'
import { AUTH_VARIABLES } from '../client'

export default (uuid?: string): ApiAction => createAction({
  actionName: 'login_anon',
  query: `
    mutation LoginAnon($apiKey: String!, $apiSecret: String!, $uuid: String!) {
      loginAnon(APIKey: $apiKey, APISecret: $apiSecret, UUID: $uuid) {
        User { UUID, User_ID }
      }
    }
  `,
  getVariables: () => ({
    ...AUTH_VARIABLES,
    uuid
  }),
  handleResponse: (options) => {
    const user: User = {
      userId: options.response.data.loginAnon.User.User_ID,
      uuid: options.response.data.loginAnon.User.UUID
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  }
})
