import { createAction, ApiAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'

export default (username?: string, password?: string): ApiAction => createAction({
  actionName: 'login',
  query: `
    mutation Login($username: String!, $password: String!) {
      login(Username: $username, Password: $password) {
        Token,
        User {
          User_ID,
          UUID,
          Email,
          Username,
          Keyholder,
          Lockee,
          Emergency_Keys
        }
      }
    }
  `,
  getVariables: () => ({
    username,
    password
  }),
  handleResponse: (options) => {
    const user: User = {
      userId: options.response.data.login.User.User_ID,
      uuid: options.response.data.login.User.UUID,
      email: options.response.data.login.User.Email,
      username: options.response.data.login.User.Username,
      isKeyholder: options.response.data.login.User.Keyholder,
      isLockee: options.response.data.login.User.Lockee,
      emergencyKeys: options.response.data.login.User.Emergency_Keys
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      token: options.response.data.login.Token,
      user
    })
  }
})
