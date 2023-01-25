import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import client from '../lib/apolloClient'
import Authenticated from '../modules/auth/components/authorizedApolloProvider'
import { ExtendedAppProps } from '../modules/auth/types/auth.utils'
import '../styles/globals.css'
import '../styles/reactDatePicker.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          {Component.auth ? (
            <Authenticated>
              <Component {...pageProps} />
            </Authenticated>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ApolloProvider>
      <ToastContainer position="bottom-right" autoClose={5000} limit={4} />
    </>
  )
}

export default MyApp
