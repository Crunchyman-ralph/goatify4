import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { CreateShopForm } from '../../modules/shop/components/createShop'
import { ShopContextProvider } from '../../modules/shop/contexts/ShopContextProvider'

const CreateShop: NextPageWithAuth = () => {
  return (
    <Layout>
      <ShopContextProvider>
        <CreateShopForm />
      </ShopContextProvider>
    </Layout>
  )
}

CreateShop.auth = true

export default CreateShop
