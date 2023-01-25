/* eslint-disable @next/next/no-img-element */
import {
  CloudUploadIcon,
  ExclamationIcon,
  LinkIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import {
  ProductInputUpdateInput,
  Status,
  useInjectProductInShopifyMutation,
  useShopsQuery,
} from '../../../../../_generated_/types'
import { Select } from '../../../../common/components/selectors/select'
import { htmlDescriptionToText } from '../../../../common/functions/htmlDescriptionToText'
import {
  statusBadgeClassName,
  statusBadgeLabel,
} from '../../functions/statusBadge'

export function ModalInjectInShop(props: {
  label: string | number
  product: ProductInputUpdateInput
  setShowModal: (arg0: boolean) => void
}): JSX.Element {
  const [form, setForm] = useState({
    shopId: undefined,
    productId: props.product.id_,
  })

  const {
    loading: shopsLoading,
    error: shopsError,
    data: shopsData,
  } = useShopsQuery()

  const [injectInShopMutation] = useInjectProductInShopifyMutation()

  const main = document.getElementById('__next')

  if (main) {
    // React does *not* create a new div. It renders the children into the node with the "__next" id`.
    // We do this so that the modal is abose other elements and renders properly
    return ReactDOM.createPortal(
      <div
        className="modal modal-open modal-bottom sm:modal-middle"
        onMouseDown={() => props.setShowModal(false)}
      >
        <div
          className="modal-box !max-w-3xl whitespace-normal"
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
        >
          <h3 className="text-xl font-medium">Injecter un produit</h3>

          <div className="divider" />

          <div aria-label="tags" className="form-control mb-2">
            <label className="label">
              <span className="label-text">Dans quel shop ?</span>
            </label>

            {shopsError ? (
              <div className="alert alert-error">
                Erreur lors de la récupération des shops
              </div>
            ) : shopsLoading ? (
              <input className="input input-bordered max-w-sm" disabled />
            ) : (
              <Select
                placeholder="Choisissez un shop"
                menuPortalTarget={main}
                options={shopsData?.shops.nodes}
                idProperty="id_"
                propertiesToDisplay={['name']}
                formStatePropertyToChange="shopId"
                formState={form}
                setFormState={setForm}
              />
            )}
          </div>
          {form.shopId != undefined && (
            <section>
              <div className="divider" />
              <div className="card-compact card mx-auto w-80 bg-base-100 shadow-xl">
                <div className="card-image overflow-hidden rounded-lg bg-base-200">
                  <figure
                    className="h-36 bg-cover bg-center bg-no-repeat dark:brightness-75"
                    style={{
                      backgroundImage: `url(${
                        props.product.images
                          ? (props.product?.images[0]?.src as string)
                          : ''
                      })`,
                    }}
                  />
                </div>
                <div className="card-body">
                  <h2 className="card-title">
                    {props.product.title}

                    <span
                      className={`badge badge-md ${statusBadgeClassName(
                        props.product.status
                      )}`}
                    >
                      {statusBadgeLabel(props.product.status)}
                    </span>
                  </h2>
                  <p className="break-words">
                    {htmlDescriptionToText(
                      props.product.descriptionHtml || '',
                      80
                    )}
                  </p>
                </div>
              </div>
              <div className="divider" />
              <p>
                Le produit{' '}
                <span className="font-bold"> {props.product.title}</span> va
                être injecté dans le shop{' '}
                <span className="font-bold">
                  {
                    shopsData?.shops.nodes?.find(
                      (shop) => shop.id_ === form.shopId
                    )?.name
                  }
                </span>
                , êtes vous sûr de vouloir continuer ?
              </p>
              <div className="mt-1 flex items-center gap-1 underline">
                <ExclamationIcon className="mt-0.5 h-5 w-5" /> N'oublier pas
                d'enregistrer le produit
              </div>
            </section>
          )}

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                props.setShowModal(false)
              }}
            >
              Annuler
            </button>
            <button
              type="button"
              disabled={form.shopId == undefined}
              className="btn btn-success"
              onClick={async () => {
                const promise = new Promise(async (resolve, reject) => {
                  try {
                    const result = await injectInShopMutation({
                      variables: {
                        productInputId: props.product.id_,
                        shopId: form.shopId as unknown as string,
                      },
                    })

                    const productId: string =
                      result.data?.injectProductInShopify.productCreate.product
                        .id

                    let successObject

                    if (
                      result.data?.injectProductInShopify.productCreate.product
                        .status == Status.Active
                    ) {
                      successObject = {
                        productInShopUrl: `${result.data?.injectProductInShopify.productCreate.shop.url}/${result.data?.injectProductInShopify.productCreate.product.handle}`,
                        productInAdminUrl: `${
                          result.data?.injectProductInShopify.productCreate.shop
                            .url
                        }/admin/products/${productId.split('/')[4]}`,
                      }
                    } else {
                      successObject = {
                        productInAdminUrl: `${
                          result.data?.injectProductInShopify.productCreate.shop
                            .url
                        }/admin/products/${productId.split('/')[4]}`,
                      }
                    }

                    resolve(successObject)
                  } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error)
                    reject(error)
                  }
                })

                toast.promise(promise, {
                  pending: 'Injection en cours...',
                  success: {
                    render({ data }) {
                      const successObject = data as SuccessObject
                      return (
                        <>
                          <p>{props.product.title} injecté avec succès 👌</p>
                          <ul>
                            {successObject.productInShopUrl != undefined && (
                              <li>
                                <a
                                  href={successObject.productInShopUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="link link-hover"
                                >
                                  <LinkIcon className="mr-1 inline-block h-4 w-4" />
                                  Voir dans le shop
                                </a>
                              </li>
                            )}

                            <li>
                              <a
                                href={successObject.productInAdminUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-hover"
                              >
                                <LinkIcon className="mr-1 inline-block h-4 w-4" />
                                Voir dans l'admin
                              </a>
                            </li>
                          </ul>
                        </>
                      )
                    },
                    autoClose: 15000,
                  },
                  error: {
                    render() {
                      return `Erreur lors de l'injection du produit`
                    },
                  },
                })
              }}
            >
              <CloudUploadIcon className="mr-2 h-5 w-5" />
              Injecter
            </button>
          </div>
        </div>
      </div>,
      main
    )
  } else {
    return <></>
  }
}

interface SuccessObject {
  productInShopUrl: string
  productInAdminUrl: string
}
