import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { ImportForm } from '../../modules/import/components/importForm'

const ImportProductsPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <ImportForm />
    </Layout>
  )
}

ImportProductsPage.auth = true

export default ImportProductsPage
