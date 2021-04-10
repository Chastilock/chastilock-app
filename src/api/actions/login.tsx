import { createAction, ApiAction } from './genericAction'

import { User } from '@chastilock/state/sections/account'

export default (username?: string, password?: string): ApiAction => createAction({
  actionName: 'login',
  query: `
    mutation Login($username: String!, $password: String!) {
      login(Username: $username, Password: $password) {
        User { UUID, User_ID }
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
      uuid: options.response.data.login.User.UUID
    }

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      user
    })
  }
})
