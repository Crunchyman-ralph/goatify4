import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { ShopsTable } from '../../modules/shop/components/shopsTable'
import { ShopContextProvider } from '../../modules/shop/contexts/ShopContextProvider'

const ShopsPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <ShopContextProvider>
        <ShopsTable />
      </ShopContextProvider>
    </Layout>
  )
}

ShopsPage.auth = true

export default ShopsPage
