import { createAction, ApiAction } from './genericAction'

export default (email: string): ApiAction => createAction({
  actionName: 'reset_password',
  query: `
    mutation PasswordChange($email: String!) {
      requestPasswordChange(Email: $email) {
        Expires
      }
    }
  `,

  getVariables: () => ({
    email
  }),

  handleResponse: (options) => {
    const data = options.response.data

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response
    })

    return data
  }
})
