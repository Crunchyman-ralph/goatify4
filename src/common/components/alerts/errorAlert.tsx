import { ApolloError, useApolloClient } from '@apollo/client'
import { BanIcon, RefreshIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'

export function ErrorAlert(props: {
  error?: string
  apolloError?: ApolloError
  showIcon?: boolean
  showRefreshButton?: boolean
  className?: string
}): JSX.Element {
  const client = useApolloClient()

  const refetchAllActiveQueries = async () => {
    await client
      .refetchQueries({
        include: 'active',
      })
      .catch((err) => {
        toast.error(String(err))
      })
  }

  return (
    <div className={`alert alert-error ${props.className}`}>
      <div className="flex-1">
        {props.showIcon && <BanIcon className="mx-2 h-6 w-6 stroke-current" />}
        <label>
          {props.error}
          {props.apolloError
            ? String(props.apolloError.message)
            : props.apolloError}
        </label>
      </div>
      {props.showRefreshButton && (
        <button className="btn btn-error" onClick={refetchAllActiveQueries}>
          <RefreshIcon className="mx-2 h-6 w-6 stroke-current" />
          Rafraichir
        </button>
      )}
    </div>
  )
}
