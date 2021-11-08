import { User } from '@chastilock/state/sections/account'
import { createAction, ApiAction } from './genericAction'

export default (userId?: number, token?: string): ApiAction => createAction({
  actionName: 'status',
  query: `
    query {
      __schema {
        queryType {
          name
        }
      }${userId !== undefined ? `,
      me {
        User_ID,
        UUID,
        Email,
        Username,
        Keyholder,
        Lockee,
        Emergency_Keys
      }` : ''},
    }`,
  handleResponse: (options) => {
    const user: User = {
      userId: options.response.data.me.User_ID,
      uuid: options.response.data.me.UUID,
      email: options.response.data.me.Email,
      username: options.response.data.me.Username,
      isKeyholder: options.response.data.me.Keyholder,
      isLockee: options.response.data.me.Lockee,
      emergencyKeys: options.response.data.me.Emergency_Keys
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  },
  getVariables: () => ({
    _authToken: token
  })
})
