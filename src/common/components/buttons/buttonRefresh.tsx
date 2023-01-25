import { useApolloClient } from '@apollo/client'
import { RefreshIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'

export function ButtonRefresh(): JSX.Element {
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
    <button
      className="btn btn-ghost ml-3 !p-0"
      onClick={refetchAllActiveQueries}
    >
      <RefreshIcon className="mx-2 h-7 w-7 stroke-current" />
    </button>
  )
}
