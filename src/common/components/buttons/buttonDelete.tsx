import { DocumentNode } from '@apollo/client'
import { useState } from 'react'
import { IModelContext } from '../../../contexts/ModelContext'
import { ModalDelete } from '../modals/modalDelete'

export function ButtonDelete(props: {
  className?: string
  context: IModelContext
  label: string | number
  modalLabel: string
  idProperty: string
  id: string | number
  deleteMutation: DocumentNode
  refetchQueries?: string[]
  redirectTo?: string
  icon?: JSX.Element
}): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        type="button"
        className={`btn btn-error ${props.className}`}
        onClick={() => {
          setShowModal(true)
        }}
      >
        {props.icon}
        {props.label}
      </button>
      {showModal && (
        <ModalDelete
          context={props.context}
          label={props.modalLabel}
          idProperty={props.idProperty}
          id={props.id}
          setShowModal={setShowModal}
          deleteMutation={props.deleteMutation}
          refetchQueries={props.refetchQueries}
          redirectTo={props.redirectTo}
        />
      )}
    </>
  )
}
