import { ApolloError } from '@apollo/client'
import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ProductInput,
  useCreateSubProductMutation,
  useSubProductsQuery,
} from '../../../../_generated_/types'
import { Alert } from '../../../common/components/alerts/alert'
import { ErrorAlert } from '../../../common/components/alerts/errorAlert'
import { GoBackArrow } from '../../../common/components/goBackArrow/goBackArrow'
import { Loader } from '../../../common/components/loader'
import { PaginationInfoAndNav } from '../../../common/components/navigation/paginationInfoAndNav'
import { Pagination } from '../../../common/types/Pagination'
import { SubProductRow } from './subProductRow'

export function SubProductsTable(props: { productId: string }): JSX.Element {
  const router = useRouter()

  const [subProductsState, setSubProductsState] = useState<{
    subProducts: ProductInput[]
  }>({
    subProducts: [],
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
    loading: subProductsLoading,
    error: subProductsError,
    data: subProductsData,
    fetchMore: fetchMoreSubProducts,
  } = useSubProductsQuery({
    variables: {
      productInputId: props.productId,
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
      loading: subProductsLoading,
      error: subProductsError,
    })
    if (!subProductsLoading) {
      setSubProductsState({
        ...subProductsState,
        subProducts: subProductsData?.subProducts?.nodes ?? [],
      })
      setPagination({
        ...pagination,
        total: subProductsData?.subProducts?.total ?? 0,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subProductsLoading])

  const [createSubProduct] = useCreateSubProductMutation()

  if (queryState.error && subProductsState.subProducts.length === 0)
    return (
      <ErrorAlert showIcon showRefreshButton apolloError={queryState.error} />
    )
  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0">
        <GoBackArrow />
        <button
          className="btn btn-primary"
          onClick={async () => {
            try {
              const createSubProductResult = await createSubProduct({
                variables: {
                  productInputId: props.productId,
                },
              })

              router.push(
                `${router.asPath}/${createSubProductResult.data?.createSubProduct?.id_}`
              )
            } catch (err) {
              toast.error(String(err))
            }
          }}
        >
          <PlusIcon className="mr-2 h-6 w-6" />
          Créer un sous-produit
        </button>
        {queryState.loading && <Loader />}
      </div>

      {!subProductsLoading && subProductsState.subProducts.length == 0 ? (
        <Alert label="Aucun sous-produit, cliquez sur le bouton au dessus pour en créer un !" />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-compact static table w-full">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {subProductsState?.subProducts?.map(
                  (subProduct: ProductInput) => (
                    <SubProductRow
                      key={subProduct.id_}
                      subProduct={subProduct}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>

          <PaginationInfoAndNav
            pagination={pagination}
            setPagination={setPagination}
            fetchMore={fetchMoreSubProducts}
          />
        </>
      )}
    </>
  )
}
