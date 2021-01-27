import { gql } from '@apollo/client'

import { User } from '@chastilock/state/sections/account'
import { DispatchType } from '@chastilock/state/useAsyncReducer'
import client, { AUTH_VARIABLES } from '../client'

export const KEY = 'api/create_anonymous_account'
export const KEY_REQUEST = `${KEY}_request`
export const KEY_RECEIVE = `${KEY}_receive`

export const QUERY = gql`
  mutation CreateUserAnon($apiKey: String!, $apiSecret: String!) {
    createUserAnon(APIKey: $apiKey, APISecret: $apiSecret) {
      UUID, User_ID
    }
  }
`

export default async (dispatch: DispatchType): Promise<void> => {
  dispatch({
    type: KEY_REQUEST
  })

  const response = await client.mutate({
    mutation: QUERY,
    variables: AUTH_VARIABLES
  })

  const user: User = {
    userId: response.data.createUserAnon.User_ID,
    uuid: response.data.createUserAnon.UUID
  }

  dispatch({
    type: KEY_RECEIVE,
    response: response,
    user
  })
}
