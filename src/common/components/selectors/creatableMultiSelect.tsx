import { Dispatch, SetStateAction } from 'react'
import { ActionMeta, OnChangeValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { reactSelectCustomStyles } from '../../../styles/reactSelect'

const components = {
  DropdownIndicator: null,
}

export function CreatableMultiSelect(props: {
  loading?: boolean
  placeholder?: string
  noOptionsMessage?: string
  options?: string[]
  defaultValue?: string[]
  propertyName?: string
  setFormState: Dispatch<SetStateAction<any>>
  formState: any
}): JSX.Element {
  function handleChange(
    newValue: OnChangeValue<Option, true>,
    _actionMeta: ActionMeta<Option>
  ) {
    let newOptions = newValue.map((option: Option) => option.value)

    if (props.propertyName) {
      props.setFormState({
        ...props.formState,
        [props.propertyName]: newOptions,
      })
    } else {
      props.setFormState(newOptions)
    }
  }

  let optionsList: Option[] = []
  let defaultValueList: Option[] = []

  if (props.options)
    optionsList = props.options.map((option) => {
      return {
        value: option,
        label: option,
      }
    })

  if (props.defaultValue)
    defaultValueList = props.defaultValue.map((option) => {
      return {
        value: option,
        label: option,
      }
    })

  return (
    <CreatableSelect
      placeholder={props.placeholder}
      options={optionsList}
      defaultValue={props.defaultValue ? defaultValueList : optionsList}
      components={components}
      menuPlacement={'auto'}
      styles={reactSelectCustomStyles}
      onChange={handleChange}
      noOptionsMessage={() => props.noOptionsMessage}
      isMulti
    />
  )
}

interface Option {
  readonly label: string
  readonly value: string
}
