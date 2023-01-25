import CoreLayout from '../../layouts/core/coreLayout'
import { LoginForm } from '../../modules/auth/components/loginForm'
import { NextPageWithAuth } from '../../modules/auth/types/auth.utils'

const LoginPage: NextPageWithAuth = (): JSX.Element => {
  return (
    <CoreLayout>
      <LoginForm />
    </CoreLayout>
  )
}

LoginPage.auth = false

export default LoginPage
