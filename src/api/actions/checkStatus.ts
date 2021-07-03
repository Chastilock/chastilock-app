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
        UUID
      }` : ''},
    }`,
  handleResponse: (options) => {
    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response
    })
  },
  getVariables: () => ({
    _authToken: token
  })
})
