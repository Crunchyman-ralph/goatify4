import { ApolloError } from '@apollo/client'
import { CloudIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Shop, useShopsQuery } from '../../../../_generated_/types'
import { Alert } from '../../../common/components/alerts/alert'
import { ErrorAlert } from '../../../common/components/alerts/errorAlert'
import { ButtonRedirect } from '../../../common/components/buttons/buttonRedirect'
import { Loader } from '../../../common/components/loader'
import { PaginationInfoAndNav } from '../../../common/components/navigation/paginationInfoAndNav'
import { Pagination } from '../../../common/types/Pagination'
import { ShopRow } from './shopRow'

export function ShopsTable(): JSX.Element {
  const [shopsState, setShopsState] = useState<{
    shops: Shop[]
  }>({
    shops: [],
  })

  const [queryState, setQueryState] = useState<{
    loading: boolean
    error?: ApolloError
  }>({
    loading: true,
    error: undefined,
  })

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    take: 5,
    total: 0,
  })

  const {
    loading: shopsLoading,
    error: shopsError,
    data: shopsData,
    fetchMore: fetchMoreShops,
  } = useShopsQuery({
    variables: {
      skip: pagination.skip,
      take: pagination.take,
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    setQueryState({
      ...queryState,
      loading: shopsLoading,
      error: shopsError,
    })
    if (!shopsLoading) {
      setShopsState({
        ...shopsState,
        shops: shopsData?.shops?.nodes ?? [],
      })
      setPagination({
        ...pagination,
        total: shopsData?.shops?.total ?? 0,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopsLoading])

  if (queryState.error && shopsState.shops.length === 0)
    return (
      <ErrorAlert showIcon showRefreshButton apolloError={queryState.error} />
    )
  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0">
        <ButtonRedirect
          className="btn-primary"
          label="Connecter un shop"
          path="connect"
          icon={<CloudIcon className="mr-2 h-5 w-5" />}
        />
        {queryState.loading && <Loader />}
      </div>

      {!shopsLoading && shopsState.shops.length == 0 ? (
        <Alert label="Aucun shop connecté, cliquez sur le bouton au dessus pour en connecter un !" />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-compact static table w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>URL</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {shopsState?.shops?.map((shop: Shop) => (
                  <ShopRow shop={shop} key={shop.id_} />
                ))}
              </tbody>
            </table>
          </div>

          <PaginationInfoAndNav
            pagination={pagination}
            setPagination={setPagination}
            fetchMore={fetchMoreShops}
          />
        </>
      )}
    </>
  )
}
