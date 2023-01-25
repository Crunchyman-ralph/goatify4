import { default as ReactSelect } from 'react-select'
import { reactSelectCustomStyles } from '../../../styles/reactSelect'

export function MultiSelect(props: {
  defaultValue: any
  options: any
  idProperties: { id: string; ids: string }
  propertiesToDisplay: string[]
  setFormState: any
  formState: any
}): JSX.Element {
  return (
    <ReactSelect
      isMulti={true}
      styles={reactSelectCustomStyles}
      options={props.options}
      defaultValue={props.defaultValue}
      // getOptionLabel={(option) => {
      //   const propertiesToDisplayValues = props.propertiesToDisplay.map(
      //     (propertyToDisplay) => fetchFromObject(option, propertyToDisplay)
      //   )

      //   return propertiesToDisplayValues.join(' ')
      // }}
      getOptionValue={(option) => option?.[props.idProperties.id]}
      onChange={(e) => {
        const IdSelected: string[] = []
        e.map((data) => {
          IdSelected.push(data?.[props.idProperties.id])
        })
        props.setFormState({
          ...props.formState,
          [props.idProperties.ids]: IdSelected,
        })
      }}
    />
  )
}

// function fetchFromObject(obj, prop) {
//   if (typeof obj === 'undefined') {
//     return ''
//   }

//   const _index = prop.indexOf('.')
//   if (_index > -1) {
//     return fetchFromObject(
//       obj[prop.substring(0, _index)],
//       prop.substr(_index + 1)
//     )
//   }

//   return obj[prop]
// }
