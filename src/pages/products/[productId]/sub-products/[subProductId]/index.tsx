import { useRouter } from 'next/router'
import Layout from '../../../../../layouts/layout'
import { NextPageWithAuth } from '../../../../../modules/auth/types/auth.utils'
import { EditProduct } from '../../../../../modules/product/components/createAndEditProduct/editProduct'
import SubProductContext, {
  SubProductContextProvider,
} from '../../../../../modules/sub-product/contexts/SubProductContextProvider'

const EditSubProductPage: NextPageWithAuth = () => {
  const { query } = useRouter()
  const subProductId = String(query.subProductId)

  return (
    <Layout>
      <SubProductContextProvider>
        <EditProduct
          productId={subProductId}
          context={SubProductContext}
          canHaveSubProducts={false}
        />
      </SubProductContextProvider>
    </Layout>
  )
}

EditSubProductPage.auth = true

export default EditSubProductPage
