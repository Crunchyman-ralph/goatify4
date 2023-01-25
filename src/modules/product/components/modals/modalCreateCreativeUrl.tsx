import { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'

export function ModalCreateCreativeUrl(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  setShowCreateModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const main = document.getElementById('__next')

  const [newCreativeUrl, setNewCreativeUrl] = useState('')

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
          <h2 className="text-xl font-medium">Ajouter une URL de Creative</h2>

          <div className="divider" />

          <div aria-label="Url de Créative" className="form-control mb-2">
            <input
              autoFocus
              type="text"
              className="input input-bordered"
              onChange={(e) => {
                setNewCreativeUrl(e.target.value)
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
                if (newCreativeUrl === '') {
                  toast.error("L'URL ne peut pas être vide")
                } else {
                  let creativeUrls = props.productFormState.creativeUrls

                  if (!creativeUrls) creativeUrls = []

                  creativeUrls.push(newCreativeUrl)
                  props.setProductFormState({
                    ...props.productFormState,
                    creativeUrls: creativeUrls,
                  })
                  props.setShowCreateModal(false)
                }
              }}
            >
              Ajouter l'URL de Creative
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
