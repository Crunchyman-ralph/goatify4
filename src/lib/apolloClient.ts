import { ApolloClient, InMemoryCache } from '@apollo/client'
import { backendUrl } from './../utils/urls'

const client = new ApolloClient({
  uri: backendUrl,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

export default client
