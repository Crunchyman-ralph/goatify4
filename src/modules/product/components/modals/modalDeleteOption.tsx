import { Dispatch, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import {
  createCombinations,
  createUpdateOrDeleteVariants,
  getExistingOptionsValues,
} from '../../functions/optionsVariants'

export function ModalDeleteOption(props: {
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  optionIndex: number
  option: string
}): JSX.Element {
  const main = document.getElementById('__next')

  function deleteOption() {
    let optionsValues: string[][] = []

    if (
      props.productFormState.options &&
      props.productFormState.options?.length > 1
    ) {
      let options = props.productFormState.options
      let variants = props.productFormState.variants

      options?.splice(props.optionIndex, 1)

      variants?.forEach((variant, index) => {
        variant.options?.slice(props.optionIndex, 1)
        if (variants) variants[index] = variant
      })

      props.setProductFormState({
        ...props.productFormState,
        options: options,
        variants: variants,
      })

      // if the deleted option is not the latest, we need to skip one to keep the index correct
      if (props.optionIndex == props.productFormState.options.length - 1)
        optionsValues = getExistingOptionsValues(
          props.productFormState,
          props.optionIndex
        )
      else optionsValues = getExistingOptionsValues(props.productFormState)

      // if we delete the last option, we need to add the default option with the default value
    } else if (props.productFormState.options?.length === 1) {
      let options = props.productFormState.options

      options[0] = 'Title'

      props.setProductFormState({
        ...props.productFormState,
        options: options,
      })

      optionsValues = [['Default Title']]
    }

    // create the new combinations of options for the products
    const newCombinations = createCombinations(optionsValues)

    // create or update the variants of the product
    createUpdateOrDeleteVariants(
      newCombinations,
      props.productFormState,
      props.setProductFormState
    )
  }

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
            Supprimer l'option{' '}
            <span className="font-medium">{props.option}</span>
          </h3>
          <p className="py-4 text-sm">
            Souhaitez-vous vraiment supprimer l'option{' '}
            <span className="font-semibold">{props.option}</span> ? Cette
            opération est irréversible.
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
                deleteOption()
                props.setShowDeleteModal(false)
              }}
            >
              Supprimer l'option
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
