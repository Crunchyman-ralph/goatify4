import { Dispatch, SetStateAction } from 'react'
import { useCategoriesQuery } from '../../../../../_generated_/types'
import { ListSettings } from '../../types/ListSettings'

export function CategorySelect(props: {
  listSettings: ListSettings
  setListSettings: Dispatch<SetStateAction<ListSettings>>
}): JSX.Element {
  const { data: categoriesData } = useCategoriesQuery({
    fetchPolicy: 'cache-and-network',
  })

  return (
    <div className="form-control">
      <div className="input-group mt-0">
        <button className="btn btn-sm no-animation cursor-default">
          Catégorie
        </button>
        <select
          className="select select-bordered select-sm"
          defaultValue={''}
          onChange={(e) => {
            props.setListSettings({
              ...props.listSettings,
              categoryId: e.target.value,
            })
          }}
        >
          <option value={''}>Toutes</option>
          {categoriesData?.categories.nodes?.map((category) => (
            <option key={category.id_} value={category.id_}>
              {category.name.charAt(0).toUpperCase() +
                category.name.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
