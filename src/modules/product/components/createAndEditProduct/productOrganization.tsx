import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { CreatableMultiSelect } from '../../../../common/components/selectors/creatableMultiSelect'

export function ProductOrganization(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  productLoading?: boolean
}): JSX.Element {
  return (
    <section>
      <h2 className="text-xl font-medium">Classement des produits</h2>
      <div
        aria-label="type du produit personnalisé"
        className="form-control mb-2"
      >
        <label className="label">
          <span className="label-text">Type personnalisé</span>
        </label>
        <input
          type="text"
          placeholder="p. ex. T-shirt"
          className="input input-bordered max-w-sm"
          value={props.productFormState.customProductType || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              customProductType: e.target.value,
            })
          }
        />
      </div>

      <div aria-label="fournisseur" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Fournisseur</span>
        </label>
        <input
          type="text"
          className="input input-bordered max-w-sm"
          value={props.productFormState.vendor || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              vendor: e.target.value,
            })
          }
        />
      </div>
      <div aria-label="tags" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        {!props.productLoading && props.productFormState.tags != undefined ? (
          <CreatableMultiSelect
            placeholder="Trouver ou créer des tags"
            noOptionsMessage="Commencer à écrire pour créer un tag"
            loading={props.productLoading}
            options={props.productFormState.tags}
            propertyName="tags"
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
