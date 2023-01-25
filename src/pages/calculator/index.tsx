import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { Calculator } from '../../modules/calculator/components/calculator'

const CalculatorPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <Calculator />
    </Layout>
  )
}

CalculatorPage.auth = true

export default CalculatorPage
