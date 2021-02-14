import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Constants from 'expo-constants'

export const AUTH_VARIABLES = {
  apiKey: Constants.manifest.extra.backendApiKey,
  apiSecret: Constants.manifest.extra.backendApiSecret
}

export const httpLink = createHttpLink({
  uri: Constants.manifest.extra.backendEndpoint,
  fetch: async function (): Promise<Response> {
    const parsedBody = JSON.parse(arguments[1].body)
    parsedBody.APIKey = AUTH_VARIABLES.apiKey
    parsedBody.APISecret = AUTH_VARIABLES.apiSecret

    arguments[1].body = JSON.stringify(parsedBody)

    return await fetch.apply(null, arguments as any)
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors !== undefined) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`
      )
    )
  }
  if (networkError !== undefined) {
    console.log(`[Network error]: ${JSON.stringify(networkError)}`)
  }
})

export const client = new ApolloClient({
  link: httpLink.concat(errorLink),
  cache: new InMemoryCache()
})

export default client
