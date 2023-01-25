/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Layout from '../layouts/layout'
import { NextPageWithAuth } from '../modules/auth/types/auth.utils'

const Home: NextPageWithAuth = () => {
  return (
    <Layout>
      <></>
    </Layout>
  )
}

Home.auth = true

export default Home
