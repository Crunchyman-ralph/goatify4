import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { CreateCategoryForm } from '../../modules/category/components/createCategory'
import { CategoryContextProvider } from '../../modules/category/contexts/CategoryContextProvider'

const CreateCategory: NextPageWithAuth = () => {
  return (
    <Layout>
      <CategoryContextProvider>
        <CreateCategoryForm />
      </CategoryContextProvider>
    </Layout>
  )
}

CreateCategory.auth = true

export default CreateCategory
