import { createAction, ApiAction } from './genericAction'
import { User } from '@chastilock/state/sections/account'

export default (uuid?: string): ApiAction => createAction({
  actionName: 'login_anon',
  query: `
    mutation LoginAnon($uuid: String!) {
      loginAnon(UUID: $uuid) {
        Token,
        User {
          User_ID,
          UUID,
          Keyholder,
          Lockee,
          Emergency_Keys
        }
      }
    }
  `,
  getVariables: () => ({
    uuid
  }),
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
      token: options.response.data.loginAnon.Token,
      user
    })
  }
})
