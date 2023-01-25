import { useRouter } from 'next/router'
import Layout from '../../../layouts/layout'
import { NextPageWithAuth } from '../../../modules/auth/types/auth.utils'
import { Calculator } from '../../../modules/calculator/components/calculator'
import { ProductContextProvider } from '../../../modules/product/contexts/ProductContextProvider'

const ProductCalculatorPage: NextPageWithAuth = () => {
  const { query } = useRouter()
  const productId = String(query.productId)

  return (
    <Layout>
      <ProductContextProvider>
        <Calculator productInputId={productId} />
      </ProductContextProvider>
    </Layout>
  )
}

ProductCalculatorPage.auth = true

export default ProductCalculatorPage
