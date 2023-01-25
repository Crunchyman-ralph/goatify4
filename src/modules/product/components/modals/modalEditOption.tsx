import { Dispatch, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'

export function ModalEditOption(props: {
  option: string
  optionIndex: number
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  setShowEditModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const main = document.getElementById('__next')

  if (main) {
    // React does *not* create a new div. It renders the children into the node with the "__next" id`.
    // We do this so that the modal is abose other elements and renders properly
    return ReactDOM.createPortal(
      <div
        className="modal modal-open modal-bottom  sm:modal-middle"
        onMouseDown={() => props.setShowEditModal(false)}
      >
        <div
          className="modal-box whitespace-normal"
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
        >
          <h2 className="text-xl font-medium">Modifier l'option</h2>

          <div className="divider" />

          <div aria-label="Nom de l'option" className="form-control mb-2">
            <label className="label">
              <span className="label-text">Nom de l'option</span>
            </label>
            <div className="flex flex-row space-x-2">
              <input
                type="text"
                className="input input-bordered input-sm max-w-sm"
                value={
                  (props.productFormState.options &&
                    props.productFormState.options[props.optionIndex]) ||
                  ''
                }
                onChange={(e) => {
                  if (props.productFormState.options) {
                    props.productFormState.options[props.optionIndex] =
                      e.target.value

                    props.setProductFormState({
                      ...props.productFormState,
                    })
                  } else {
                    props.setProductFormState({
                      ...props.productFormState,
                      options: [e.target.value],
                    })
                  }
                }}
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                props.setShowEditModal(false)
              }}
            >
              Fermer
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
