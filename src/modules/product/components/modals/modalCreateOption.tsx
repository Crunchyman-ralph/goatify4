import { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { CreatableMultiSelect } from '../../../../common/components/selectors/creatableMultiSelect'
import {
  createCombinations,
  createUpdateOrDeleteVariants,
  getExistingOptionsValues,
} from '../../functions/optionsVariants'

export function ModalCreateOption(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  setShowCreateModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const main = document.getElementById('__next')

  const [newOptionName, setNewOptionName] = useState<string>('')
  const [newOptionValues, setNewOptionValues] = useState<string[]>([])

  function createOption() {
    try {
      // get the option values of all the existing options
      let optionsValues: string[][] = getExistingOptionsValues(
        props.productFormState
      )

      let options = props.productFormState.options

      // if this is the default option with default value, replace it with the new option and new values
      if (
        options?.at(0) == 'Title' &&
        optionsValues.at(0) &&
        optionsValues.at(0)?.at(0) == 'Default Title'
      ) {
        optionsValues[0] = newOptionValues

        // check that the number of combinations is not higher than 100
        checkNbrOfCombinationsValidity(optionsValues)

        options[0] = newOptionName
      } else {
        // add new option values
        optionsValues.push(newOptionValues)

        // check that the number of combinations is not higher than 100
        // check that the number of combinations is not higher than 100
        checkNbrOfCombinationsValidity(optionsValues)

        // add the new option to the product
        options?.push(newOptionName)
      }

      props.setProductFormState({
        ...props.productFormState,
        options: options,
      })

      // create the new combinations of options for the products
      const newCombinations = createCombinations(optionsValues)

      // create or update the variants of the product
      createUpdateOrDeleteVariants(
        newCombinations,
        props.productFormState,
        props.setProductFormState
      )

      props.setShowCreateModal(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  function checkNbrOfCombinationsValidity(optionsValues: string[][]) {
    if (createCombinations(optionsValues).length > 100)
      throw new Error(
        "Vous ne pouvez pas créer cette option car un produit ne peux pas avoir plus de 100 variantes. Pour ajouter cette option, supprimez quelques valeurs d'option."
      )
  }

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
          <h2 className="text-xl font-medium">Ajouter une option</h2>

          <div className="divider" />

          <form>
            <div aria-label="Nom de l'option" className="form-control mb-2">
              <label className="label">
                <span className="label-text">Nom de l'option</span>
              </label>
              <div className="flex flex-row space-x-2">
                <input
                  required
                  type="text"
                  className="input input-bordered max-w-sm"
                  value={newOptionName}
                  onChange={(e) => {
                    setNewOptionName(e.target.value)
                  }}
                />
              </div>
            </div>
            <div aria-label="Valeurs de l'option" className="form-control mb-2">
              <label className="label">
                <span className="label-text">Valeurs de l'option</span>
              </label>
              <CreatableMultiSelect
                placeholder="Créer les valeurs de l'option"
                noOptionsMessage="Commencer à écrire pour créer une valeur"
                setFormState={setNewOptionValues}
                formState={newOptionValues}
              />
            </div>

            {/* <CreateOptionValue
              optionValues={newOptionValues}
              setOptionValues={setNewOptionValues}
            /> */}
          </form>

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
              onClick={createOption}
            >
              Ajouter l'option
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
