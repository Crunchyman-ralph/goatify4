import { useRouter } from 'next/router'
import Layout from '../../../../../layouts/layout'
import { NextPageWithAuth } from '../../../../../modules/auth/types/auth.utils'
import { Calculator } from '../../../../../modules/calculator/components/calculator'
import { ProductContextProvider } from '../../../../../modules/product/contexts/ProductContextProvider'

const SubProductProductCalculatorPage: NextPageWithAuth = () => {
  const { query } = useRouter()
  const subProductId = String(query.subProductId)

  return (
    <Layout>
      <ProductContextProvider>
        <Calculator productInputId={subProductId} />
      </ProductContextProvider>
    </Layout>
  )
}

SubProductProductCalculatorPage.auth = true

export default SubProductProductCalculatorPage
