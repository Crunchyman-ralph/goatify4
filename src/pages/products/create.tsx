import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { CreateProduct } from '../../modules/product/components/createAndEditProduct/createProduct'
import ProductContext, {
  ProductContextProvider,
} from '../../modules/product/contexts/ProductContextProvider'

const CreateProductPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <ProductContextProvider>
        <CreateProduct context={ProductContext} />
      </ProductContextProvider>
    </Layout>
  )
}

CreateProductPage.auth = true

export default CreateProductPage
