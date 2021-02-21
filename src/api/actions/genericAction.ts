import { FetchResult, gql } from '@apollo/client'

import { DispatchType } from '@chastilock/state/useAsyncReducer'
import client from '../client'

export interface ApiAction {
  KEY: string
  KEY_REQUEST: string
  KEY_RECEIVE: string
  KEY_ERROR: string

  execute: (dispatch: DispatchType) => Promise<any>
}

export interface ApiActionOptions {
  actionName: string
  query: string

  handleResponse: (options: { dispatch: DispatchType, KEY_RECEIVE: string, response: FetchResult<any, Record<string, any>, Record<string, any>>}) => void
  getVariables?: () => {
    [name: string]: any
  }
}

export const createAction = (options: ApiActionOptions): ApiAction => {
  const KEY = `api/${options.actionName}`
  const KEY_REQUEST = `${KEY}_request`
  const KEY_RECEIVE = `${KEY}_receive`
  const KEY_ERROR = `${KEY}_error`

  return {
    KEY,
    KEY_REQUEST,
    KEY_RECEIVE,
    KEY_ERROR,

    execute: async (dispatch: DispatchType) => {
      dispatch({
        type: KEY_REQUEST
      })

      try {
        const response = await client.mutate({
          mutation: gql(options.query),
          variables: options.getVariables !== undefined ? options.getVariables() : undefined
        })

        options.handleResponse({
          dispatch,
          response,
          KEY_RECEIVE
        })

        return response
      } catch (error) {
        dispatch({
          type: KEY_ERROR,
          error
        })
        throw error
      }
    }
  }
}
