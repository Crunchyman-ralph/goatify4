import cuid from 'cuid'
import { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom'
import { CalculatorField } from '../../types/CalculatorField'

export function ModalCreateField(props: {
  setFields: Dispatch<SetStateAction<CalculatorField[]>>
  fieldType: 'income' | 'expense'
  setShowCreateModal: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const main = document.getElementById('__next')

  const [newField, setNewField] = useState('')
  const [newFieldOperator, setNewFieldOperator] = useState('add')
  const [newFieldDefaultValue, setNewFieldDefaultValue] = useState(0)

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
          <h2 className="text-xl font-medium">
            Ajouter {props.fieldType === 'income' ? 'un revenu' : 'une dépense'}
          </h2>

          <div className="divider" />

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              autoFocus
              type="text"
              className="input input-bordered"
              onChange={(e) => {
                setNewField(e.target.value)
              }}
            />
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => {
                setNewFieldOperator(e.target.value)
              }}
            >
              <option value="add">Fixe (Devise)</option>
              <option value="percent">Pourcentage (%)</option>
            </select>
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Valeur par défaut</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              onChange={(e) => {
                setNewFieldDefaultValue(parseFloat(e.target.value))
              }}
            />
          </div>

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
              onClick={() => {
                props.setFields((prev) => [
                  ...prev,
                  {
                    id: cuid(),
                    order: prev.length + 1,
                    type: props.fieldType,
                    name: newField,
                    label: newField,
                    operation: newFieldOperator,
                    value: newFieldDefaultValue,
                    canBeDeleted: true,
                  },
                ])
                props.setShowCreateModal(false)
              }}
            >
              Ajouter{' '}
              {props.fieldType === 'income' ? 'un revenu' : 'une dépense'}
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
