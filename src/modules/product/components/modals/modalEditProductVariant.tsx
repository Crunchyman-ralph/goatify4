import { Dispatch, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { Inventory } from '../createAndEditProduct/inventory'
import { Price } from '../createAndEditProduct/price'
import { Shipping } from '../createAndEditProduct/shipping'

export function ModalEditProductVariant(props: {
  setShowEditModal: Dispatch<SetStateAction<boolean>>
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
        className="modal modal-open modal-bottom  sm:modal-middle"
        onMouseDown={() => props.setShowEditModal(false)}
      >
        <div
          className="modal-box !max-w-4xl whitespace-normal"
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
        >
          <h2 className="text-xl font-medium">
            Variante :{' '}
            <span className="text-medium">
              {props.productFormState.variants
                ?.at(props.variantIndex)
                ?.options?.join(' / ')}
            </span>
          </h2>

          <div className="divider" />

          <Price
            productFormState={props.productFormState}
            setProductFormState={props.setProductFormState}
            variantIndex={props.variantIndex}
          />

          <div className="divider" />

          <Inventory
            productFormState={props.productFormState}
            setProductFormState={props.setProductFormState}
            variantIndex={props.variantIndex}
          />

          <div className="divider" />

          <Shipping
            productFormState={props.productFormState}
            setProductFormState={props.setProductFormState}
            variantIndex={props.variantIndex}
          />

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
