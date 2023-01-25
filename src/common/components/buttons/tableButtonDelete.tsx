import { DocumentNode } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { IModelContext } from '../../../contexts/ModelContext'
import { ModalDelete } from '../modals/modalDelete'

export function TableButtonDelete(props: {
  context: IModelContext
  label: string
  idProperty: string
  id: string | number
  deleteMutation: DocumentNode
  refetchQueries: string[]
  redirectTo?: string
}): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <button
        className="btn btn-error btn-sm"
        onClick={() => {
          setShowModal(true)
        }}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
      {showModal ? (
        <ModalDelete
          context={props.context}
          label={props.label}
          idProperty={props.idProperty}
          id={props.id}
          setShowModal={setShowModal}
          deleteMutation={props.deleteMutation}
          refetchQueries={props.refetchQueries}
          redirectTo={props.redirectTo}
        />
      ) : null}
    </div>
  )
}
