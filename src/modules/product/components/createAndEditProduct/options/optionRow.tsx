import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../../_generated_/types'
import { ModalDeleteOption } from '../../modals/modalDeleteOption'
import { ModalEditOption } from '../../modals/modalEditOption'

export function OptionRow(props: {
  option: string
  optionIndex: number
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
}): JSX.Element {
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  return (
    <tr key={props.optionIndex}>
      <td>{props.option}</td>
      <td>
        <div className="flex flex-row items-center">
          <div className="space-x-1">
            {props.productFormState.variants
              ?.map((variant) => variant.options?.at(props.optionIndex))
              .filter((option, index, self) => self.indexOf(option) === index)
              .sort((a, b) =>
                a && b ? a.localeCompare(b, 'fr', { numeric: true }) : 0
              )
              .map((optionValue, index) => (
                <span key={index} className="badge ">
                  {optionValue}
                </span>
              ))}
          </div>
        </div>
      </td>
      <td className="sticky right-0">
        <>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setShowEditModal(true)}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          {showEditModal && (
            <ModalEditOption
              option={props.option}
              optionIndex={props.optionIndex}
              productFormState={props.productFormState}
              setProductFormState={props.setProductFormState}
              setShowEditModal={setShowEditModal}
            />
          )}
        </>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-error btn-sm"
          onClick={() => setShowDeleteModal(true)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        {showDeleteModal && (
          <ModalDeleteOption
            optionIndex={props.optionIndex}
            option={props.option}
            productFormState={props.productFormState}
            setProductFormState={props.setProductFormState}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </td>
    </tr>
  )
}
