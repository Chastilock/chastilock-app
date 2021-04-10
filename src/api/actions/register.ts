import { ApiAction, createAction } from './genericAction'
import { User } from '@chastilock/state/sections/account'

export default (email: string, password: string, username: string): ApiAction => createAction({
  actionName: 'register',
  query: `
    mutation RegisterAccount($email: String!, $password: String!, $username: String!) {
      createUser(Email: $email, Password: $password, Username: $username) {
        UUID, User_ID
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
