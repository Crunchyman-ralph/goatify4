import { DocumentNode, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import { IModelContext } from '../../../contexts/ModelContext'

export function ModalDelete(props: {
  context: IModelContext
  label: string | number
  idProperty: string
  id: string | number
  setShowModal: (arg0: boolean) => void
  deleteMutation: DocumentNode
  refetchQueries?: string[]
  redirectTo?: string
}): JSX.Element {
  const router = useRouter()
  const [deleteMutation] = useMutation(props.deleteMutation, {
    variables: {
      [props.idProperty]: props.id,
    },
    errorPolicy: 'all',
    refetchQueries: props.refetchQueries,
  })

  const main = document.getElementById('__next')

  if (main) {
    // React does *not* create a new div. It renders the children into the node with the "__next" id`.
    // We do this so that the modal is abose other elements and renders properly
    return ReactDOM.createPortal(
      <div
        className="modal modal-open modal-bottom sm:modal-middle"
        onClick={() => props.setShowModal(false)}
      >
        <div
          className="modal-box whitespace-normal"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <h3 className="text-lg">Supprimer {props.label} ?</h3>
          <p className="py-4 text-sm">
            Souhaitez-vous vraiment supprimer le{' '}
            {props.context.modelNameLowerCase}{' '}
            <span className="font-semibold">{props.label}</span> ? Cette
            opération est irréversible.
          </p>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                props.setShowModal(false)
              }}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={async () => {
                try {
                  await deleteMutation()
                  props.setShowModal(false)
                  if (props.redirectTo) {
                    router.push(props.redirectTo)
                  }
                  toast.success(`${props.label} supprimé`)
                } catch (err) {
                  toast.error(String(err))
                }
              }}
            >
              Supprimer {props.context.modelName}
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
