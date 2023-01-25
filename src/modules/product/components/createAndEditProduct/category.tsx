import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
  useCategoriesQuery,
} from '../../../../../_generated_/types'
import { CreatableMultiSelect } from '../../../../common/components/selectors/creatableMultiSelect'

export function Categories(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  productLoading?: boolean
}): JSX.Element {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoriesQuery({
    fetchPolicy: 'network-only',
  })

  return (
    <section>
      <h2 className="label text-xl font-medium">Catégories</h2>
      <div aria-label="Catégories du produit" className="form-control mb-2">
        {!props.productLoading && props.productFormState.tags != undefined ? (
          <CreatableMultiSelect
            placeholder="Trouver ou créer des catégories"
            noOptionsMessage="Commencer à écrire pour créer une catégorie"
            loading={props.productLoading && categoriesLoading ? true : false}
            options={categoriesData?.categories?.nodes?.map(
              (category) => category.name
            )}
            defaultValue={props.productFormState.categories ?? []}
            propertyName="categories"
            setFormState={props.setProductFormState}
            formState={props.productFormState}
          />
        ) : (
          <input className="input input-bordered max-w-sm" disabled />
        )}
      </div>
    </section>
  )
}
