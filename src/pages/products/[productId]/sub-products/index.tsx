import { useRouter } from 'next/router'
import Layout from '../../../../layouts/layout'
import { NextPageWithAuth } from '../../../../modules/auth/types/auth.utils'
import { SubProductsTable } from '../../../../modules/sub-product/components/subProductsTable'
import { SubProductContextProvider } from '../../../../modules/sub-product/contexts/SubProductContextProvider'

const SubProductsPage: NextPageWithAuth = () => {
  const { query } = useRouter()
  const productId = String(query.productId)

  return (
    <Layout>
      <SubProductContextProvider>
        <SubProductsTable productId={productId} />
      </SubProductContextProvider>
    </Layout>
  )
}

SubProductsPage.auth = true

export default SubProductsPage
