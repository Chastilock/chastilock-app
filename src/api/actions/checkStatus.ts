import { createAction, ApiAction } from './genericAction'

export default (userId?: number, token?: string): ApiAction => createAction({
  actionName: 'status',
  query: `
    query${userId !== undefined ? '($userId: Int!)' : ''} {
      __schema {
        queryType {
          name
        }
      }${userId !== undefined ? `,
      User(id: $userId) {
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
    userId,
    _authToken: token
  })
})
