import { ApolloError } from '@apollo/client'
import { PlusIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { Category, useCategoriesQuery } from '../../../../_generated_/types'
import { Alert } from '../../../common/components/alerts/alert'
import { ErrorAlert } from '../../../common/components/alerts/errorAlert'
import { ButtonRedirect } from '../../../common/components/buttons/buttonRedirect'
import { Loader } from '../../../common/components/loader'
import { PaginationInfoAndNav } from '../../../common/components/navigation/paginationInfoAndNav'
import { Pagination } from '../../../common/types/Pagination'
import { CategoryRow } from './categoryRow'

export function CategoriesTable(): JSX.Element {
  const [categoriesState, setCategoriesState] = useState<{
    categories: Category[]
  }>({
    categories: [],
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
    take: 10,
    total: 0,
  })

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
    fetchMore: fetchMoreCategories,
  } = useCategoriesQuery({
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
      loading: categoriesLoading,
      error: categoriesError,
    })
    if (!categoriesLoading) {
      setCategoriesState({
        ...categoriesState,
        categories: categoriesData?.categories?.nodes ?? [],
      })
      setPagination({
        ...pagination,
        total: categoriesData?.categories?.total ?? 0,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesLoading])

  if (queryState.error && categoriesState.categories.length === 0)
    return (
      <ErrorAlert showIcon showRefreshButton apolloError={queryState.error} />
    )
  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0">
        <ButtonRedirect
          className="btn-primary"
          label="Créer une catégorie"
          path="create"
          icon={<PlusIcon className="mr-2 h-6 w-6" />}
        />
        {queryState.loading && <Loader />}
      </div>

      {!categoriesLoading && categoriesState.categories.length == 0 ? (
        <Alert label="Aucune catégorie, cliquez sur le bouton au dessus pour en créer une !" />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-compact static table w-full">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {categoriesState?.categories?.map((category) => (
                  <CategoryRow category={category} key={category.id_} />
                ))}
              </tbody>
            </table>
          </div>

          <PaginationInfoAndNav
            pagination={pagination}
            setPagination={setPagination}
            fetchMore={fetchMoreCategories}
          />
        </>
      )}
    </>
  )
}
