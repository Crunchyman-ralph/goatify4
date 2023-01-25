import { PlusIcon, TrashIcon } from '@heroicons/react/outline'
import { ClipboardCopyIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { ModalCreateAdCopy } from '../modals/modalCreateAdCopy'
import { ModalCreateCompetitorUrl } from '../modals/modalCreateCompetitorUrl'
import { ModalCreateCreativeUrl } from '../modals/modalCreateCreativeUrl'

export function Ads(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  productLoading?: boolean
}): JSX.Element {
  const [showCreateAdCopyModal, setShowCreateAdCopyModal] = useState(false)
  const [showCreateCompetitorUrlModal, setShowCreateCompetitorUrlModal] =
    useState(false)
  const [showCreateCreativeUrlModal, setShowCreateCreativeUrlModal] =
    useState(false)

  return (
    <section>
      <h2 className="text-xl font-medium">Ads</h2>
      <div aria-label="URLs des Creatives" className="form-control mb-2 gap-2">
        <label className="label">
          <span className="label-text">URLs des Creatives</span>
        </label>
        {props.productFormState.creativeUrls?.map((creativeUrl, index) => (
          <div key={index} className="flex items-center">
            <div className="form-control">
              <div className="input-group">
                <a
                  className="btn"
                  href={creativeUrl}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
                <input
                  type="text"
                  className="input input-bordered max-w-sm"
                  value={creativeUrl}
                  onChange={(e) => {
                    const creativeUrls = props.productFormState.creativeUrls
                    if (creativeUrls) creativeUrls[index] = e.target.value
                    props.setProductFormState({
                      ...props.productFormState,
                      creativeUrls: creativeUrls,
                    })
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-error ml-2"
              onClick={() => {
                const creativeUrls = props.productFormState.creativeUrls
                if (creativeUrls) creativeUrls.splice(index, 1)
                props.setProductFormState({
                  ...props.productFormState,
                  creativeUrls: creativeUrls,
                })
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="link link-hover mt-2 flex items-center"
        onClick={() => setShowCreateCreativeUrlModal(true)}
      >
        <PlusIcon className="mr-1 h-5 w-5" />
        Ajouter une URL de Creative
      </button>

      {showCreateCreativeUrlModal && (
        <ModalCreateCreativeUrl
          productFormState={props.productFormState}
          setProductFormState={props.setProductFormState}
          setShowCreateModal={setShowCreateCreativeUrlModal}
        />
      )}

      <div className="divider m-auto my-2 !w-10/12" />

      <div aria-label="Ad copies" className="form-control mb-2 gap-2">
        <label className="label">
          <span className="label-text">Ad Copy</span>
        </label>
        {props.productFormState.adCopies?.map((adCopy, index) => (
          <div key={index} className="flex items-center">
            <div className="form-control">
              <div className="input-group">
                <button
                  type="button"
                  className="btn h-auto"
                  onClick={() => {
                    navigator.clipboard.writeText(adCopy)
                    toast.success('Ad Copy copié dans le presse-papier')
                  }}
                >
                  <ClipboardCopyIcon className="h-5 w-5" />
                </button>
                <textarea
                  className="textarea textarea-bordered max-w-sm"
                  value={adCopy}
                  rows={2}
                  onChange={(e) => {
                    const adCopies = props.productFormState.adCopies
                    if (adCopies) adCopies[index] = e.target.value
                    props.setProductFormState({
                      ...props.productFormState,
                      adCopies,
                    })
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-error ml-2"
              onClick={() => {
                const adCopies = props.productFormState.adCopies
                if (adCopies) adCopies.splice(index, 1)
                props.setProductFormState({
                  ...props.productFormState,
                  adCopies,
                })
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="link link-hover mt-2 flex items-center"
        onClick={() => setShowCreateAdCopyModal(true)}
      >
        <PlusIcon className="mr-1 h-5 w-5" />
        Ajouter une Ad Copy
      </button>

      {showCreateAdCopyModal && (
        <ModalCreateAdCopy
          productFormState={props.productFormState}
          setProductFormState={props.setProductFormState}
          setShowCreateModal={setShowCreateAdCopyModal}
        />
      )}

      <div className="divider m-auto my-2 !w-10/12" />

      <div
        aria-label="Urls des concurrents"
        className="form-control mb-2 gap-2"
      >
        <label className="label">
          <span className="label-text">Urls des concurrents</span>
        </label>
        {props.productFormState.competitorUrls?.map((competitorUrl, index) => (
          <div key={index} className="flex items-center">
            <div className="form-control">
              <div className="input-group">
                <a
                  className="btn"
                  href={competitorUrl}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
                <input
                  type="text"
                  className="input input-bordered max-w-sm"
                  value={competitorUrl}
                  onChange={(e) => {
                    const competitorUrls = props.productFormState.competitorUrls
                    if (competitorUrls) competitorUrls[index] = e.target.value
                    props.setProductFormState({
                      ...props.productFormState,
                      competitorUrls,
                    })
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-error ml-2"
              onClick={() => {
                const competitorUrls = props.productFormState.competitorUrls
                if (competitorUrls) competitorUrls.splice(index, 1)
                props.setProductFormState({
                  ...props.productFormState,
                  competitorUrls,
                })
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="link link-hover mt-2 flex items-center"
        onClick={() => setShowCreateCompetitorUrlModal(true)}
      >
        <PlusIcon className="mr-1 h-5 w-5" />
        Ajouter une URL de Concurrent
      </button>

      {showCreateCompetitorUrlModal && (
        <ModalCreateCompetitorUrl
          productFormState={props.productFormState}
          setProductFormState={props.setProductFormState}
          setShowCreateModal={setShowCreateCompetitorUrlModal}
        />
      )}
    </section>
  )
}
