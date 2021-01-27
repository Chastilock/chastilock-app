import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'

export const AUTH_VARIABLES = {
  apiKey: Constants.manifest.extra.backendApiKey,
  apiSecret: Constants.manifest.extra.backendApiSecret
}

export const client = new ApolloClient({
  uri: Constants.manifest.extra.backendEndpoint,
  cache: new InMemoryCache()
})

export default client
