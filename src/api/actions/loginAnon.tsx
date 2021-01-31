import { gql } from '@apollo/client'

import { User } from '@chastilock/state/sections/account'
import { DispatchType } from '@chastilock/state/useAsyncReducer'
import client, { AUTH_VARIABLES } from '../client'

export const KEY = 'api/login_anon'
export const KEY_REQUEST = `${KEY}_request`
export const KEY_RECEIVE = `${KEY}_receive`

export const QUERY = gql`
  mutation LoginAnon($apiKey: String!, $apiSecret: String!, $uuid: String!) {
    loginAnon(APIKey: $apiKey, APISecret: $apiSecret, UUID: $uuid) {
      User { UUID, User_ID }
    }
  }
`

export default (uuid: string) => async (dispatch: DispatchType): Promise<void> => {
  dispatch({
    type: KEY_REQUEST
  })

  const response = await client.mutate({
    mutation: QUERY,
    variables: {
      ...AUTH_VARIABLES,
      uuid
    }
  })

  const user: User = {
    userId: response.data.loginAnon.User.User_ID,
    uuid: response.data.loginAnon.User.UUID
  }

  dispatch({
    type: KEY_RECEIVE,
    response: response,
    user
  })
}
