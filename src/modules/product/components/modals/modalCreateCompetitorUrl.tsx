import { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'

export function ModalCreateCompetitorUrl(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  setShowCreateModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const main = document.getElementById('__next')

  const [newCompetitorUrl, setNewCompetitorUrl] = useState('')

  if (main) {
    // React does *not* create a new div. It renders the children into the node with the "__next" id`.
    // We do this so that the modal is abose other elements and renders properly
    return ReactDOM.createPortal(
      <div
        className="modal modal-open modal-bottom  sm:modal-middle"
        onClick={() => props.setShowCreateModal(false)}
      >
        <div
          className="modal-box whitespace-normal"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <h2 className="text-xl font-medium">Ajouter une URL de concurrent</h2>

          <div className="divider" />

          <div aria-label="URL du concurrent" className="form-control mb-2">
            <input
              autoFocus
              type="url"
              className="input input-bordered"
              onChange={(e) => {
                setNewCompetitorUrl(e.target.value)
              }}
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => props.setShowCreateModal(false)}
            >
              Annuler
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (newCompetitorUrl === '') {
                  toast.error("L'URL ne peut pas être vide")
                } else {
                  let competitorUrls = props.productFormState.competitorUrls

                  if (!competitorUrls) competitorUrls = []

                  competitorUrls.push(newCompetitorUrl)
                  props.setProductFormState({
                    ...props.productFormState,
                    competitorUrls,
                  })
                  props.setShowCreateModal(false)
                }
              }}
            >
              Ajouter l'URL
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
