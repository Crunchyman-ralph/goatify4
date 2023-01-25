import { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'

export function ModalCreateAdCopy(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  setShowCreateModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const main = document.getElementById('__next')

  const [newAdCopy, setNewAdCopy] = useState('')

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
          <h2 className="text-xl font-medium">Ajouter une AdCopy</h2>

          <div className="divider" />

          <div aria-label="Ad Copy" className="form-control mb-2">
            <textarea
              autoFocus
              rows={4}
              className="textarea textarea-bordered"
              onChange={(e) => {
                setNewAdCopy(e.target.value)
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
                if (newAdCopy === '') {
                  toast.error("L'adCopy ne peut pas être vide")
                } else {
                  let adCopies = props.productFormState.adCopies

                  if (!adCopies) adCopies = []

                  adCopies.push(newAdCopy)
                  props.setProductFormState({
                    ...props.productFormState,
                    adCopies: adCopies,
                  })
                  props.setShowCreateModal(false)
                }
              }}
            >
              Ajouter l'adCopy
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
