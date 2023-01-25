import request, { gql } from 'graphql-request'
import { decode } from 'jsonwebtoken'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { backendUrl } from '../../../utils/urls'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: "Nom d'utilisateur",
          type: 'string',
        },
        password: { label: 'Mot de passe', type: 'password' },
      },

      async authorize(credentials) {
        // Send request to graphql backend
        const response = await loginAccount({
          name: credentials?.name || '',
          password: credentials?.password || '',
        })

        const userData = decodeAccessToken(response.token)

        if (response) {
          return {
            ...userData,
            accessToken: response.token,
            // token will expire 3 hours after login
            expiresAt: Date.now() + 3 * 60 * 60 * 1000,
          }
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Persist the backend access token to the token right after signin
      if (user) {
        token.accessToken = user.accessToken
        token.expiresAt = user.expiresAt
      }
      return token
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.expiresAt = token.expiresAt
      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        const callbackurl = new URL(url).searchParams.get('callbackUrl')

        if (callbackurl) return callbackurl
        else return url
      }

      return baseUrl
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: 'secret',
})

export const loginAccount = async ({
  name,
  password,
}: LoginInput): Promise<LoginResponse> => {
  const response = await request(backendUrl, loginMutation, {
    data: {
      name,
      password,
    },
  })

  return {
    name: response.login.name,
    token: response.login.token,
  }
}

interface LoginInput {
  name: string
  password: string
}

interface LoginResponse {
  name: string
  token: string
}

const loginMutation = gql`
  mutation Login($data: UserLoginInput!) {
    login(data: $data) {
      name
      token
    }
  }
`

export const decodeAccessToken = (accessToken: string): AccessToken => {
  const token = decode(accessToken)
  if (!isAccessToken(token)) {
    throw new Error('Invalid Token')
  }

  return token
}

interface AccessToken {
  name: string
}

const isAccessToken = (token: any): token is AccessToken => {
  return typeof token === 'object' && 'name' in token
}
