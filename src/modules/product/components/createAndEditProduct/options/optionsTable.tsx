import { PlusIcon } from '@heroicons/react/solid'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../../_generated_/types'
import { ModalCreateOption } from '../../modals/modalCreateOption'
import { OptionRow } from './optionRow'

export function OptionsTable(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
}): JSX.Element {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

  return (
    <section className="max-w-4xl">
      <h2 className="label text-xl font-medium">Options</h2>

      {/* Show the table if there are options (hide it if it's the default option) */}
      {props.productFormState.options &&
        props.productFormState.options?.length > 0 &&
        props.productFormState.options.at(0) != 'Title' &&
        props.productFormState.variants?.at(0)?.options?.at(0) !=
          'Default Title' && (
          <div className="overflow-x-auto">
            <table className="table-compact static table w-full">
              <thead>
                <tr>
                  <th className="!z-0">Nom</th>
                  <th>Valeurs</th>
                  <th className="sticky right-0">Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {props.productFormState.options?.map((option, index) => (
                  <OptionRow
                    key={index}
                    option={option}
                    optionIndex={index}
                    productFormState={props.productFormState}
                    setProductFormState={props.setProductFormState}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

      {props.productFormState.options &&
        props.productFormState.options?.length < 3 && (
          <>
            <button
              type="button"
              className="link link-hover mt-2 flex items-center"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusIcon className="mr-1 h-5 w-5" />
              Ajouter une option
            </button>
          </>
        )}

      {showCreateModal && (
        <ModalCreateOption
          productFormState={props.productFormState}
          setProductFormState={props.setProductFormState}
          setShowCreateModal={setShowCreateModal}
        />
      )}
    </section>
  )
}
