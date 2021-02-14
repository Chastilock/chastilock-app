import { createAction, ApiAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'

export default (uuid?: string): ApiAction => createAction({
  actionName: 'login_anon',
  query: `
    mutation LoginAnon($uuid: String!) {
      loginAnon(UUID: $uuid) {
        User { UUID, User_ID }
      }
    }
  `,
  getVariables: () => ({
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