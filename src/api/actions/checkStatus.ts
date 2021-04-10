import { createAction, ApiAction } from './genericAction'

export default (): ApiAction => createAction({
  actionName: 'status',
  query: `
    query {
      __schema {
        queryType {
          name
        }
      }
    }`,
  handleResponse: (options) => {
    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response
    })
  }
})
