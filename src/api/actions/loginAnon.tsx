import { createAction, ApiAction } from './genericAction'
import { User } from '@chastilock/state/sections/account'

export default (uuid?: string): ApiAction => createAction({
  actionName: 'login_anon',
  query: `
    mutation LoginAnon($uuid: String!) {
      loginAnon(UUID: $uuid) {
        Token,
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
      uuid: options.response.data.loginAnon.User.UUID,
      isKeyholder: options.response.data.loginAnon.User.Keyholder,
      isLockee: options.response.data.loginAnon.User.Lockee,
      emergencyKeys: options.response.data.loginAnon.User.Emergency_Keys
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      token: options.response.data.loginAnon.Token,
      user
    })
  }
})
