import { AppProps } from 'next/app'
import { NextComponentType, NextPage, NextPageContext } from 'next/types'

// This type should be added to all pages that required user authentification
export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean
}

type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
  Partial<NextPageWithAuth>

export type ExtendedAppProps<P = {}> = AppProps<P> & {
  Component: NextComponentWithAuth
}

// This type is here for pure reference
// It's an example on how we can extend
// nextPage typing to include roles and such
type PageAuth = {
  role: string
  loading: JSX.Element
  unauthorized: string
}

// SO post that helped me with the types
// https://stackoverflow.com/questions/69965829/how-to-extend-nextpage-type-to-add-custom-field-to-page-component
