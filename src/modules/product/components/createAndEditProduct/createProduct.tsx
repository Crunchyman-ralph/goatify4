import { CodeIcon, ServerIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Context, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  useProductInputCreateMutation,
} from '../../../../../_generated_/types'
import { ButtonSubmit } from '../../../../common/components/buttons/buttonSubmit'
import { GoBackArrowWithLabel } from '../../../../common/components/goBackArrow/goBackArrowWithLabel'
import { removeNullsFromObject } from '../../../../common/functions/removeNullsFromObject'
import { IModelContext } from '../../../../contexts/ModelContext'
import { LeftColumn } from './leftColumn'
import { RightColumn } from './rightColumn'

export function CreateProduct(props: {
  context: Context<IModelContext>
}): JSX.Element {
  const productContext = useContext(props.context)
  const router = useRouter()

  const [productFormState, setProductFormState] =
    useState<ProductInputCreateInput>({
      customProductType: undefined,
      descriptionHtml: undefined,
      categories: [],
      giftCard: undefined,
      handle: undefined,
      images: undefined,
      options: ['Title'],
      productType: undefined,
      requiresSellingPlan: undefined,
      seo: undefined,
      status: undefined,
      tags: [],
      templateSuffix: undefined,
      title: null,
      variants: [
        {
          options: ['Default Title'],
        },
      ],
      vendor: undefined,
      adCopies: undefined,
      competitorUrls: undefined,
      creativeUrls: undefined,
      calculatorFields: [],
    })

  // To avoid the cursor of the editor to jump to the top when hitting enter (because of a rerender),
  // we need to give to the editor "initialValue" a state that differs from the produtsFormState
  const [initialDescription] = useState<string>('')

  const [createProduct] = useProductInputCreateMutation()

  async function onSubmit() {
    try {
      const variables = {
        data: removeNullsFromObject(productFormState, [
          'categories',
          'tags',
          'competitorUrls',
          'creativeUrls',
          'adCopies',
        ]) as ProductInputCreateInput,
      }

      const response = await createProduct({
        variables,
        // this will be called if their are errors in the backend or in the mutation
        onError(err) {
          toast.error(String(err))
        },
      })

      if (response?.errors) {
        return
      }

      toast.success(
        `${productContext.modelName} ${response?.data?.productInputCreate?.title} créé avec succès`
      )

      router.push('/products/' + response?.data?.productInputCreate?.id_)
    } catch (err) {
      // this will be called when we can't reach the backend
      toast.error(String(err))
    }
  }

  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 space-x-6 sm:flex-row sm:items-center sm:space-y-0">
        <GoBackArrowWithLabel
          label={'Créer un ' + productContext.modelName.toLowerCase()}
        ></GoBackArrowWithLabel>
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
          />
        </div>

        <div className="bottom-0 mt-7 flex flex-col bg-base-100 bg-opacity-90 py-2 backdrop-blur sm:flex-row md:sticky">
          <section className="flex flex-col gap-2 xl:flex-row xl:gap-0 xl:space-x-5">
            <ButtonSubmit
              className="flex-1 sm:w-auto"
              label="Créer"
              icon={<ServerIcon className="mr-2 h-5 w-5" />}
            />
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
