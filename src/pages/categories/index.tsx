import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { CategoriesTable } from '../../modules/category/components/categoriesTable'
import { CategoryContextProvider } from '../../modules/category/contexts/CategoryContextProvider'

const CategoriesPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <CategoryContextProvider>
        <CategoriesTable />
      </CategoryContextProvider>
    </Layout>
  )
}

CategoriesPage.auth = true

export default CategoriesPage
