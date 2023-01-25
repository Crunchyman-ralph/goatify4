import Layout from '../../layouts/layout'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'
import { StatList } from '../../modules/stats/statList'

const StatsPage: NextPageWithAuth = () => {
  return (
    <Layout>
      <StatList />
    </Layout>
  )
}

StatsPage.auth = true

export default StatsPage
