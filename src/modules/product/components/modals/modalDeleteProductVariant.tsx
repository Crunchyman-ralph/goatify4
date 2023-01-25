import { Dispatch, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'

export function ModalDeleteProductVariant(props: {
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  variantIndex: number
}): JSX.Element {
  const main = document.getElementById('__next')

  if (main) {
    // React does *not* create a new div. It renders the children into the node with the "__next" id`.
    // We do this so that the modal is abose other elements and renders properly
    return ReactDOM.createPortal(
      <div
        className="modal modal-open modal-bottom sm:modal-middle"
        onMouseDown={() => props.setShowDeleteModal(false)}
      >
        <div
          className="modal-box whitespace-normal"
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
        >
          <h3 className="text-lg">
            Supprimer la variante{' '}
            <span className="font-medium">
              {props.productFormState.variants
                ?.at(props.variantIndex)
                ?.options?.join(' / ')}
            </span>
          </h3>
          <p className="py-4 text-sm">
            Souhaitez-vous vraiment supprimer la variante{' '}
            <span className="font-semibold">
              {props.productFormState.variants
                ?.at(props.variantIndex)
                ?.options?.join(' / ')}
            </span>{' '}
            ? Cette opération est irréversible.
          </p>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                props.setShowDeleteModal(false)
              }}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                const newVariants = props.productFormState.variants

                newVariants?.splice(props.variantIndex, 1)

                props.setProductFormState({
                  ...props.productFormState,
                  variants: newVariants,
                })

                props.setShowDeleteModal(false)
              }}
            >
              Supprimer la variante
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
