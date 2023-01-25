import { useState } from 'react'
import { ProductInputCreateInput } from '../../../../_generated_/types'
import { ImportFormRow } from './imputFormRow'

export function ImportFormTable(props: {
  nbrOfFilesLoaded: number
  inputs: ProductInputCreateInput[]
  selectedInputs: number[]
  setSelectedInputs: (selectedInputs: number[]) => void
}): JSX.Element {
  const [pagination, setPagination] = useState({
    current: 0,
    pageSize: 10,
    total: 0,
  })

  return (
    <>
      <div className="divider" />
      <div className="my-5 w-full overflow-x-auto ">
        <h1 className="mb-3 text-2xl font-medium">Produits detectés</h1>
        <p className="mb-5">
          {props.nbrOfFilesLoaded > 0 && (
            <>
              <span className="font-bold">
                {props.nbrOfFilesLoaded} fichier
                {props.nbrOfFilesLoaded > 1 ? 's ' : ' '}
              </span>{' '}
              chargé
              {props.nbrOfFilesLoaded > 1 ? 's ' : ' '} avec succès,{' '}
            </>
          )}
          <span className="font-bold">
            {props.inputs.length} produit{props.inputs.length > 1 ? 's ' : ' '}
          </span>
          detecté{props.inputs?.length > 1 ? 's ' : ' '}
        </p>
        <table className="table-compact table w-full">
          <thead>
            <tr>
              <th className="w-14"></th>
              <th className="w-14">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={props.inputs
                      ?.slice(
                        pagination.current * pagination.pageSize,
                        pagination.current * pagination.pageSize +
                          pagination.pageSize
                      )
                      .map(
                        (_input, index) =>
                          pagination.current * pagination.pageSize + index
                      )
                      .every((elem) => props.selectedInputs.includes(elem))}
                    onChange={(e): void => {
                      const currentPageInputsIndexes = props.inputs
                        ?.slice(
                          pagination.current * pagination.pageSize,
                          pagination.current * pagination.pageSize +
                            pagination.pageSize
                        )
                        .map(
                          (_input, index) =>
                            pagination.current * pagination.pageSize + index
                        )

                      // check inputs of current page
                      if (e.target.checked) {
                        props.setSelectedInputs([
                          ...props.selectedInputs,
                          ...currentPageInputsIndexes,
                        ])
                      }
                      // uncheck inputs of current page
                      else {
                        props.setSelectedInputs(
                          props.selectedInputs.filter(
                            (elem) => !currentPageInputsIndexes.includes(elem)
                          )
                        )
                      }
                    }}
                  />
                </label>
              </th>
              <th className="w-20">Image</th>
              <th>Titre</th>
              <th>Variantes</th>
            </tr>
          </thead>
          <tbody>
            {props.inputs
              ?.slice(
                pagination.current * pagination.pageSize,
                pagination.current * pagination.pageSize + pagination.pageSize
              )
              .map((input, index) => (
                <ImportFormRow
                  key={index}
                  input={input}
                  selectedInputs={props.selectedInputs}
                  setSelectedInputs={props.setSelectedInputs}
                  index={pagination.current * pagination.pageSize + index}
                />
              ))}
          </tbody>
        </table>
        <div className="btn-group mt-3">
          <button
            className="btn btn-sm"
            disabled={pagination.current === 0}
            onClick={() => {
              if (pagination.current > 0) {
                setPagination({
                  ...pagination,
                  current: pagination.current - 1,
                })
              }
            }}
          >
            «
          </button>
          <button className="btn btn-sm no-animation">
            {pagination.current + 1}
          </button>
          <button
            className="btn btn-sm"
            disabled={
              pagination.current * pagination.pageSize + pagination.pageSize >
              props.inputs.length
            }
            onClick={() => {
              if (
                pagination.current * pagination.pageSize + pagination.pageSize <
                props.inputs.length
              ) {
                setPagination({
                  ...pagination,
                  current: pagination.current + 1,
                })
              }
            }}
          >
            »
          </button>
        </div>
      </div>
    </>
  )
}
