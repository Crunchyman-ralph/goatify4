import {
  CalculatorIcon,
  CodeIcon,
  ColorSwatchIcon,
  ServerIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { Context, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ProductInputDeleteDocument,
  ProductInputUpdateInput,
  useProductInputQuery,
  useProductInputUpdateMutation,
} from '../../../../../_generated_/types'
import { ErrorAlert } from '../../../../common/components/alerts/errorAlert'
import { ButtonDelete } from '../../../../common/components/buttons/buttonDelete'
import { ButtonRedirect } from '../../../../common/components/buttons/buttonRedirect'
import { ButtonSubmit } from '../../../../common/components/buttons/buttonSubmit'
import { GoBackArrowWithLabel } from '../../../../common/components/goBackArrow/goBackArrowWithLabel'
import { Loader } from '../../../../common/components/loader'
import { removeNullsFromObject } from '../../../../common/functions/removeNullsFromObject'
import { IModelContext } from '../../../../contexts/ModelContext'
import {
  statusBadgeClassName,
  statusBadgeLabel,
} from '../../functions/statusBadge'
import { ButtonInjectInShop } from '../buttons/buttonInjectInShop'
import { LeftColumn } from './leftColumn'
import { RightColumn } from './rightColumn'

export function EditProduct(props: {
  productId: string
  context: Context<IModelContext>
  canHaveSubProducts: boolean
}): JSX.Element {
  const productContext = useContext(props.context)

  const [productFormState, setProductFormState] =
    useState<ProductInputUpdateInput>({
      id_: props.productId,
      customProductType: undefined,
      descriptionHtml: undefined,
      giftCard: undefined,
      handle: undefined,
      images: undefined,
      options: undefined,
      productType: undefined,
      requiresSellingPlan: undefined,
      seo: undefined,
      status: undefined,
      tags: undefined,
      templateSuffix: undefined,
      title: null,
      variants: undefined,
      vendor: undefined,
      categories: undefined,
      competitorUrls: undefined,
      creativeUrls: undefined,
      adCopies: undefined,
    })

  // To avoid the cursor of the editor to jump to the top when hitting enter (because of a rerender),
  // we need to give to the editor "initialValue" a state that differs from the produtsFormState
  const [initialDescription, setInitialDescription] = useState<string>('')

  const {
    loading: productLoading,
    error: productError,
    data: productData,
    refetch: refetchProduct,
  } = useProductInputQuery({
    variables: { productInputId: props.productId },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (productData) {
      setInitialDescription(productData?.productInput?.descriptionHtml || '')

      setProductFormState({
        ...productFormState,
        id_: props.productId,
        customProductType: productData.productInput?.customProductType,
        descriptionHtml: productData.productInput?.descriptionHtml,
        giftCard: productData.productInput?.giftCard,
        handle: productData.productInput?.handle,
        images: productData.productInput?.images,
        options: productData.productInput?.options as string[],
        productType: productData.productInput?.productType,
        requiresSellingPlan: productData.productInput?.requiresSellingPlan,
        seo: productData.productInput?.seo,
        status: productData.productInput?.status,
        tags: productData.productInput?.tags as string[],
        templateSuffix: productData.productInput?.templateSuffix,
        title: productData.productInput?.title,
        variants: productData.productInput?.variants,
        vendor: productData.productInput?.vendor,
        creativeUrls: productData.productInput?.creativeUrls,
        adCopies: productData.productInput?.adCopies,
        categories: productData.productInput?.categories?.map(
          (category) => category.name
        ),
        competitorUrls: productData.productInput?.competitorUrls,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productLoading, productData])

  const [updateProduct] = useProductInputUpdateMutation()

  async function onSubmit() {
    try {
      const variables = {
        updateData: removeNullsFromObject(productFormState, [
          'categories',
          'tags',
          'competitorUrls',
          'creativeUrls',
          'adCopies',
        ]) as ProductInputUpdateInput,
      }

      const data = await updateProduct({
        variables,
        // this will be called if their are errors in the backend or in the mutation
        onError(err) {
          toast.error(String(err))
        },
      })

      if (data?.errors) {
        return
      }

      toast.success(
        `${productContext.modelName} ${productData?.productInput?.title} mis à jour`
      )

      refetchProduct()

      // scroll to top of page
      const element = document.getElementById('main')
      if (element)
        element.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    } catch (err) {
      // this will be called when we can't reach the backend
      toast.error(String(err))
    }
  }

  if (productError && !productData?.productInput)
    return <ErrorAlert showIcon showRefreshButton apolloError={productError} />
  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 space-x-6 sm:flex-row sm:items-center sm:space-y-0">
        <GoBackArrowWithLabel
          label={
            !productLoading ? (
              <div className="flex items-center space-x-3">
                <p>{productData?.productInput?.title}</p>
                <span
                  className={`badge badge-md ${statusBadgeClassName(
                    productData?.productInput?.status
                  )}`}
                >
                  {statusBadgeLabel(productData?.productInput?.status)}
                </span>
              </div>
            ) : (
              ''
            )
          }
        ></GoBackArrowWithLabel>
        {productLoading && <Loader />}
      </div>

      <form
        className="form-control mt-5"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <div className="flex flex-wrap xl:gap-14">
          <LeftColumn
            productFormState={productFormState}
            // @ts-ignore
            setProductFormState={setProductFormState}
            initialDescription={initialDescription}
          />
          <RightColumn
            productFormState={productFormState}
            // @ts-ignore
            setProductFormState={setProductFormState}
            productLoading={productLoading}
          />
        </div>

        <div className="bottom-0 mt-7 flex flex-col bg-base-100 bg-opacity-90 py-2 backdrop-blur sm:flex-row md:sticky">
          <section className="flex flex-col gap-2 xl:flex-row xl:gap-0 xl:space-x-5">
            <ButtonSubmit
              className="flex-1 sm:w-auto"
              label="Enregistrer"
              icon={<ServerIcon className="mr-2 h-5 w-5" />}
            />
            <ButtonDelete
              className="flex-1 sm:w-44"
              label="Supprimer"
              modalLabel={
                productFormState.title || productData?.productInput?.title || ''
              }
              context={productContext}
              idProperty="productInputDeleteId"
              id={productFormState.id_}
              deleteMutation={ProductInputDeleteDocument}
              redirectTo="/products"
              icon={<TrashIcon className="mr-2 h-5 w-5" />}
            />
          </section>
          <div className="divider divider-horizontal invisible sm:visible" />
          <section className="mt-2 flex flex-col gap-1 sm:mt-0 xl:flex-row xl:gap-0">
            <ButtonInjectInShop
              className="w-full sm:w-64"
              label="Injecter dans un shop"
              modalLabel="Injecter dans un shop"
              product={productFormState}
            />
            <>
              <div className="divider divider-horizontal invisible md:visible" />
              <ButtonRedirect
                className="btn-info w-full sm:w-44"
                label="Calculateur"
                path="calculator"
                icon={<CalculatorIcon className="mr-2 h-5 w-5" />}
              />
            </>
            {props.canHaveSubProducts && (
              <>
                <div className="divider divider-horizontal invisible md:visible" />
                <ButtonRedirect
                  className="w-full sm:w-52"
                  label="Sous-Produits"
                  path="sub-products"
                  icon={<ColorSwatchIcon className="mr-2 h-5 w-5" />}
                />
              </>
            )}
          </section>
        </div>
      </form>

      {process.env.NODE_ENV == 'development' && (
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title flex items-center font-medium">
            <CodeIcon className="mr-2 h-5 w-5" />
            Query variables
          </div>
          <div className="collapse-content">
            <div className="mockup-code">
              <pre>
                <code>
                  {JSON.stringify(
                    removeNullsFromObject(productFormState, [
                      'categories',
                      'tags',
                      'competitorUrls',
                      'creativeUrls',
                      'adCopies',
                    ]),
                    null,
                    2
                  )}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
