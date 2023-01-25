/* eslint-disable @next/next/no-img-element */
import { ProductInputCreateInput } from '../../../../_generated_/types'

export function ImportFormRow(props: {
  input: ProductInputCreateInput
  selectedInputs: number[]
  setSelectedInputs: (selectedInputs: number[]) => void
  index: number
}): JSX.Element {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={props.selectedInputs.includes(props.index)}
            onChange={(e): void => {
              // add or remove index from selectedInputs state
              // 1. Make a shallow copy of the items
              let selectedInputs = [...props.selectedInputs]

              // if checkbox is checked, add index to selectedInputs, else remove it
              if (e.target.checked) {
                selectedInputs.push(props.index)
              } else {
                selectedInputs = selectedInputs.filter(
                  (i): boolean => i !== props.index
                )
              }

              props.setSelectedInputs(selectedInputs)
            }}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center">
          <div className="avatar">
            <div className="h-16 w-16 rounded">
              <img
                className="dark:brightness-75"
                src={
                  props.input?.images != null &&
                  typeof props.input?.images[0].src === 'string'
                    ? props.input.images[0].src
                    : ''
                }
                alt={
                  props.input?.images != null &&
                  typeof props.input?.images[0].altText === 'string'
                    ? props.input.images[0].altText
                    : ''
                }
              />
            </div>
          </div>
        </div>
      </td>
      <td>{props.input.title}</td>
      <td>{props.input.variants?.length}</td>
    </tr>
  )
}
