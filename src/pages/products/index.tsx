import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { ProductList } from '../../modules/product/components/listProducts/productList'
import { ProductContextProvider } from '../../modules/product/contexts/ProductContextProvider'

const ProductsPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <ProductContextProvider>
        <ProductList />
      </ProductContextProvider>
    </Layout>
  )
}

ProductsPage.auth = true

export default ProductsPage
