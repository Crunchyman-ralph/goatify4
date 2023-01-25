import { ApolloError } from '@apollo/client'
import { CodeIcon, PencilIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ShopUpdateInput,
  useShopQuery,
  useShopUpdateMutation,
} from '../../../../_generated_/types'
import { ErrorAlert } from '../../../common/components/alerts/errorAlert'
import { ButtonSubmit } from '../../../common/components/buttons/buttonSubmit'
import { GoBackArrowWithContext } from '../../../common/components/goBackArrow/goBackArrowWithContext'
import { Loader } from '../../../common/components/loader'
import ShopContext from '../contexts/ShopContextProvider'
import { isValidHttpUrl } from '../functions/isValidHttpUrl'

export function EditShopForm(props: { shopId: string }): JSX.Element {
  const shopContext = useContext(ShopContext)
  const router = useRouter()

  const [shopFormState, setShopFormState] = useState<ShopUpdateInput>({
    id_: props.shopId,
    name: '',
    url: '',
    accessToken: '',
  })

  const {
    loading: shopLoading,
    error: shopError,
    data: shopData,
  } = useShopQuery({
    variables: { shopId: props.shopId },
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (shopData) {
      setShopFormState({
        id_: shopData?.shop?.id_ ?? '',
        name: shopData?.shop?.name ?? '',
        url: shopData?.shop?.url ?? '',
        accessToken: shopData?.shop?.accessToken ?? '',
      })
    }
  }, [shopLoading, shopData])

  const [updateShop] = useShopUpdateMutation({
    variables: {
      data: {
        id_: props.shopId,
        name: shopFormState.name,
        url: shopFormState.url,
        accessToken: shopFormState.accessToken,
      },
    },
  })

  if (shopError && !shopData?.shop)
    return <ErrorAlert showIcon showRefreshButton apolloError={shopError} />
  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 space-x-6 sm:flex-row sm:items-center sm:space-y-0">
        <GoBackArrowWithContext
          typeOfAction="Modifier"
          context={shopContext}
        ></GoBackArrowWithContext>
        {shopLoading && <Loader />}
      </div>

      <form
        className="form-control mt-5"
        onSubmit={async (e) => {
          try {
            e.preventDefault()
            const response = await updateShop()

            if (response.errors)
              throw new ApolloError({
                graphQLErrors: response.errors,
              })

            const message = `${shopContext.modelName} ${shopFormState.name} mis à jour`
            toast.success(message)

            router.push('/shops')
          } catch (error) {
            toast.error((error as any).message)
          }
        }}
      >
        <div aria-label="name" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            defaultValue={shopFormState.name ?? ''}
            onChange={(e) => {
              setShopFormState({
                ...shopFormState,
                name: e.target.value,
              })
            }}
            required
            type="text"
          />
        </div>
        <div aria-label="url" className="form-control mb-2">
          <label className="label">
            <span className="label-text">URL</span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            defaultValue={shopFormState.url ?? ''}
            onChange={(e) => {
              const element = e.target as HTMLInputElement
              const errorLabel = element.nextElementSibling as HTMLInputElement

              if (isValidHttpUrl(e.target.value)) {
                element.classList.remove('input-error')
                errorLabel.classList.add('hidden')
                setShopFormState({
                  ...shopFormState,
                  url: e.target.value,
                })
              } else {
                errorLabel.classList.remove('hidden')
                element.classList.add('input-error')
              }
            }}
          />
          <label className="label hidden">
            <span className="label-text-alt">
              L'URL doit avoir le format suivant pour être valide :
              https://acme.myshopify.com/
            </span>
          </label>
        </div>
        <div aria-label="accessToken" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Access Token</span>
          </label>
          <input
            type="text"
            className="input input-bordered max-w-sm"
            defaultValue={shopFormState.accessToken ?? ''}
            onChange={(e) =>
              setShopFormState({
                ...shopFormState,
                accessToken: e.target.value,
              })
            }
          />
          <label className="label">
            <span className="label-text-alt">
              L'access token est utilisé pour injecter des produits dans votre
              shop, vous pouvez suivre{' '}
              <a
                className="link"
                href="https://ior.ad/8ldU"
                target="_blank"
                rel="noopener noreferrer"
              >
                ce tutoriel
              </a>{' '}
              pour en obtenir un.
            </span>
          </label>
        </div>

        <ButtonSubmit
          label="Modifier"
          className="mt-7 w-36"
          icon={<PencilIcon className="mr-2 h-5 w-5" />}
        />
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
                <code>{JSON.stringify(shopFormState, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
