import { ApiAction, createAction } from './genericAction'
import { User } from '@chastilock/state/sections/account'

export default (email: string, password: string, username: string): ApiAction => createAction({
  actionName: 'register',
  query: `
    mutation RegisterAccount($email: String!, $password: String!, $username: String!) {
      createUser(Email: $email, Password: $password, Username: $username) {
        User_ID,
        UUID,
        Email,
        Username,
        Keyholder,
        Lockee,
        Emergency_Keys
      }
    }
  `,
  getVariables: () => ({
    email,
    password,
    username
  }),
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
  }
})
