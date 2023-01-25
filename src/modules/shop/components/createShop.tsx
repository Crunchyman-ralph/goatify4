import { ApolloError } from '@apollo/client'
import { CloudIcon, CodeIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ShopCreateInput,
  useShopCreateMutation,
} from '../../../../_generated_/types'
import { ButtonSubmit } from '../../../common/components/buttons/buttonSubmit'
import { GoBackArrowWithContext } from '../../../common/components/goBackArrow/goBackArrowWithContext'
import ShopContext from '../contexts/ShopContextProvider'
import { isValidHttpUrl } from '../functions/isValidHttpUrl'

export function CreateShopForm(): JSX.Element {
  const shopContext = useContext(ShopContext)
  const router = useRouter()

  const [shopFormState, setShopFormState] = useState<ShopCreateInput>({
    name: '',
    url: '',
    accessToken: '',
  })

  const [createShop] = useShopCreateMutation({
    variables: {
      data: {
        name: shopFormState.name,
        url: shopFormState.url,
        accessToken: shopFormState.accessToken,
      },
    },
  })

  return (
    <>
      <GoBackArrowWithContext
        typeOfAction="Connecter"
        context={shopContext}
      ></GoBackArrowWithContext>
      <form
        className="form-control mt-5"
        onSubmit={async (e) => {
          try {
            e.preventDefault()
            const response = await createShop()

            if (response.errors)
              throw new ApolloError({
                graphQLErrors: response.errors,
              })

            const message = `${shopContext.modelName} ${shopFormState.name} connecté`
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
            onChange={(e) =>
              setShopFormState({
                ...shopFormState,
                name: e.target.value,
              })
            }
            required
            type="text"
          />
        </div>
        <div aria-label="url" className="form-control mb-2">
          <label className="label">
            <span className="label-text">URL</span>
          </label>
          <input
            required
            className="input input-bordered max-w-sm"
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
              https:/acme.myshopify.com/
            </span>
          </label>
        </div>
        <div aria-label="isAvailable" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Access Token</span>
          </label>
          <input
            required
            className="input input-bordered max-w-sm"
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
              shop, ainsi que pour récupérer ses statistiques, vous pouvez
              suivre{' '}
              <a
                className="link"
                href="https://ior.ad/8ldU"
                target="_blank"
                rel="noopener noreferrer"
              >
                ce tutoriel
              </a>{' '}
              pour en obtenir un. Vous devez selectionner les champs d'accès
              suivants :
              <ul>
                <li>• read_products</li>
                <li>• write_products</li>
                <li>• read_reports</li>
              </ul>
            </span>
          </label>
        </div>
        <ButtonSubmit
          label="Connecter"
          className="mt-7 w-40"
          icon={<CloudIcon className="mr-2 h-5 w-5" />}
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
