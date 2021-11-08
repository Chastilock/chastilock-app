import { createAction, ApiAction } from './genericAction'

export default (): ApiAction => createAction({
  actionName: 'log_out',
  query: `
    mutation logout {
      logout
    }
  `,
  handleResponse: (options) => {
    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      result: options.response.data.logout
    })
  }
})
