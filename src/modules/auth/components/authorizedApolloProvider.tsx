import { ApolloClient, ApolloProvider, useApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { Loader } from '../../../common/components/loader'

const Authenticated = ({ children }: { children: JSX.Element }) => {
  // get the session from next-auth, in order to get the accessToken
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      signIn()
    },
  })

  // get the apollo client
  const client = useApolloClient()

  // Memoized Auth link
  const authLink = useMemo(() => {
    return setContext(async () => {
      return {
        headers: {
          authorization: session?.accessToken,
        },
      }
    })
  }, [session?.accessToken])

  // If the user is authenticated and we got the session access token, we can render the children
  if (
    status === 'authenticated' &&
    Boolean(session?.accessToken) &&
    (session?.expiresAt as number) > Date.now()
  ) {
    return (
      <ApolloProvider
        client={
          new ApolloClient({
            cache: client.cache,
            link: authLink.concat(client.link),
            ssrMode: typeof window === 'undefined',
          })
        }
      >
        {children}
      </ApolloProvider>
    )
  } else {
    // if the session has expired, we sign out the user
    if ((session?.expiresAt as number) < Date.now()) signOut()

    return (
      // If the user is not authenticated or we don't have the session access token, we render the loader
      <div className="min-w-screen flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }
}

export default Authenticated
