import { useRouter } from 'next/router'
import Layout from '../../../layouts/layout'
import { NextPageWithAuth } from '../../../modules/auth/types/auth.utils'
import { EditShopForm } from '../../../modules/shop/components/editShop'
import { ShopContextProvider } from '../../../modules/shop/contexts/ShopContextProvider'

const EditShopPage: NextPageWithAuth = () => {
  const { query } = useRouter()
  const shopId = String(query.shopId)

  return (
    <Layout>
      <ShopContextProvider>
        <EditShopForm shopId={shopId} />
      </ShopContextProvider>
    </Layout>
  )
}

EditShopPage.auth = true

export default EditShopPage
