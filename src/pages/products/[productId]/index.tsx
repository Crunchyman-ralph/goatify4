import { useRouter } from 'next/router'
import Layout from '../../../layouts/layout'
import { NextPageWithAuth } from '../../../modules/auth/types/auth.utils'
import { EditProduct } from '../../../modules/product/components/createAndEditProduct/editProduct'
import ProductContext, {
  ProductContextProvider,
} from '../../../modules/product/contexts/ProductContextProvider'

const EditProductPage: NextPageWithAuth = () => {
  const { query } = useRouter()
  const productId = String(query.productId)

  return (
    <Layout>
      <ProductContextProvider>
        <EditProduct
          productId={productId}
          context={ProductContext}
          canHaveSubProducts={true}
        />
      </ProductContextProvider>
    </Layout>
  )
}

EditProductPage.auth = true

export default EditProductPage
