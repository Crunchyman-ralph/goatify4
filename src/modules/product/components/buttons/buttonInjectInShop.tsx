import { CloudUploadIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { ProductInputUpdateInput } from '../../../../../_generated_/types'
import { ModalInjectInShop } from '../modals/modalInjectInShop'

export function ButtonInjectInShop(props: {
  className?: string
  label: string | number
  modalLabel: string
  product: ProductInputUpdateInput
}): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <button
        type="button"
        className={`btn btn-success ${props.className}`}
        onClick={() => {
          setShowModal(true)
        }}
      >
        <CloudUploadIcon className="mr-2 h-6 w-6" />
        {props.label}
      </button>
      {showModal ? (
        <ModalInjectInShop
          label={props.modalLabel}
          setShowModal={setShowModal}
          product={props.product}
        />
      ) : null}
    </div>
  )
}
