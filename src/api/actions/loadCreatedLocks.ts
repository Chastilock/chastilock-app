import { CreatedLock } from '@chastilock/state/sections/createdlock'
import { createAction, ApiAction } from './genericAction'
import { CreatedLockSegment } from './segments'

export default (): ApiAction => createAction({
  actionName: 'load_created_locks',
  query: `
    query {
      myCreatedLocks {
        ${CreatedLockSegment}
      }
    }
  `,
  handleResponse: (options) => {
    const createdLocks: CreatedLock[] = options.response.data.myCreatedLocks

    options.dispatch({
      type: options.KEY_RECEIVE,
      response: options.response,
      createdLocks
    })

    return createdLocks
  }
})
