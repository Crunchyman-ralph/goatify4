import { default as ReactSelect } from 'react-select'
import { reactSelectCustomStyles } from '../../../styles/reactSelect'

export function Select(props: {
  className?: string
  defaultValue?: any
  placeholder?: string
  options: any
  idProperty: string
  formStatePropertyToChange?: string
  propertiesToDisplay: string[]
  setFormState: any
  formState: any
  formValueIsNotObject?: boolean
  menuPortalTarget?: HTMLElement
  noOptionsMessage?: string
}): JSX.Element {
  return (
    <ReactSelect
      className={props.className}
      styles={reactSelectCustomStyles}
      menuPortalTarget={props.menuPortalTarget}
      placeholder={props.placeholder}
      options={props?.options}
      menuPlacement={'auto'}
      defaultValue={props?.defaultValue}
      isClearable
      noOptionsMessage={() => props.noOptionsMessage}
      getOptionLabel={(option) => {
        const propertiesToDisplayValues = props.propertiesToDisplay.map(
          (propertyToDisplay) => fetchFromObject(option, propertyToDisplay)
        )

        return propertiesToDisplayValues.join(' ')
      }}
      getOptionValue={(option) => {
        return fetchFromObject(option, props.idProperty)
      }}
      onChange={(e) => {
        let property =
          props.formStatePropertyToChange == undefined
            ? props.idProperty
            : props.formStatePropertyToChange
        if (props.idProperty.includes('.'))
          property = String(props.idProperty.split('.').at(-1))
        let value
        if (e == null) {
          value = null
        } else value = fetchFromObject(e, props.idProperty)

        if (props.formValueIsNotObject) {
          props.setFormState(value)
        } else {
          props.setFormState({
            ...props.formState,
            [property]: value,
          })
        }
      }}
    />
  )
}

function fetchFromObject(obj: object, prop: string): any {
  if (typeof obj === 'undefined') {
    return false
  }

  const _index = prop.indexOf('.')
  if (_index > -1) {
    return fetchFromObject(
      obj[prop.substring(0, _index) as keyof typeof obj],
      prop.substring(_index + 1)
    )
  }

  return obj[prop as keyof typeof obj]
}
