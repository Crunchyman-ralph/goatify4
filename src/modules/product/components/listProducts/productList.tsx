import { ApolloError } from '@apollo/client'
import { DownloadIcon, PlusIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import {
  ProductInput,
  useProductInputsQuery,
} from '../../../../../_generated_/types'
import { Alert } from '../../../../common/components/alerts/alert'
import { ErrorAlert } from '../../../../common/components/alerts/errorAlert'
import { ButtonRedirect } from '../../../../common/components/buttons/buttonRedirect'
import { Loader } from '../../../../common/components/loader'
import { PaginationInfoAndNav } from '../../../../common/components/navigation/paginationInfoAndNav'
import { Pagination } from '../../../../common/types/Pagination'
import { ListSettings } from '../../types/ListSettings'
import { CategorySelect } from './categorySelect'
import { ListSettingsDropDown } from './listSettingsDropdown'
import { ProductCard } from './productCard'

export function ProductList(): JSX.Element {
  const [productsState, setProductsState] = useState<{
    products: ProductInput[]
  }>({
    products: [],
  })

  const [queryState, setQueryState] = useState<{
    loading: boolean
    error?: ApolloError
  }>({
    loading: true,
    error: undefined,
  })

  const [listSettings, setListSettings] = useState<ListSettings>({
    showSubProducts: localStorage.getItem('showSubProducts') == 'true',
    nbrOfProductsPerPage: parseInt(
      localStorage.getItem('nbrOfProductsPerPage') || '10'
    ),
    categoryId: '',
  })

  useEffect(() => {
    localStorage.setItem(
      'showSubProducts',
      listSettings.showSubProducts.toString()
    )
    localStorage.setItem(
      'nbrOfProductsPerPage',
      listSettings.nbrOfProductsPerPage.toString()
    )
  }, [listSettings])

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    take: listSettings.nbrOfProductsPerPage,
    total: 0,
  })

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
    refetch: refetchProducts,
    fetchMore: fetchMoreProducts,
  } = useProductInputsQuery({
    variables: {
      skip: pagination.skip,
      take: listSettings.nbrOfProductsPerPage,
      includeSubProducts: listSettings.showSubProducts,
      categoryId: listSettings.categoryId,
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    setQueryState({
      ...queryState,
      loading: productsLoading,
      error: productsError,
    })
    if (!productsLoading) {
      setProductsState({
        ...productsState,
        products: productsData?.productInputs?.nodes ?? [],
      })
      setPagination({
        ...pagination,
        take: listSettings.nbrOfProductsPerPage,
        total: productsData?.productInputs?.total ?? 0,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsLoading])

  if (queryState.error && productsState.products.length === 0)
    return (
      <ErrorAlert showIcon showRefreshButton apolloError={queryState.error} />
    )
  return (
    <>
      <div className="mx-4 mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonRedirect
          label="Créer"
          path="create"
          className="btn-primary"
          icon={<PlusIcon className="mr-2 h-5 w-5" />}
        />

        <ButtonRedirect
          label="Importer"
          path="import"
          className="btn-primary"
          icon={<DownloadIcon className="mr-2 h-5 w-5" />}
        />
        {queryState.loading && <Loader />}

        <div className="hidden flex-1 sm:block" />

        <CategorySelect
          listSettings={listSettings}
          setListSettings={setListSettings}
        />

        <ListSettingsDropDown
          listSettings={listSettings}
          setListSettings={setListSettings}
          pagination={pagination}
          setPagination={setPagination}
          refetchProducts={refetchProducts}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {productsState.products.map((product) => (
          <ProductCard product={product} key={product.id_} />
        ))}
      </div>
      {productsState.products.length > 0 && (
        <PaginationInfoAndNav
          pagination={pagination}
          setPagination={setPagination}
          fetchMore={fetchMoreProducts}
        />
      )}
      {!productsLoading && productsState.products.length == 0 && (
        <Alert label="Aucun produit, importez en avec le bouton juste au dessus !" />
      )}
    </>
  )
}
