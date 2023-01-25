import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
  Status as StatusEnum,
} from '../../../../../_generated_/types'

export function Status(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
}): JSX.Element {
  return (
    <section>
      <h2 className="label text-xl font-medium">Statut du produit</h2>
      <div aria-label="statut du produit" className="form-control mb-2">
        <select
          value={props.productFormState.status || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              status: e.target.value as StatusEnum,
            })
          }
          className="select select-bordered w-full max-w-xs font-normal"
        >
          <option disabled>Choisissez le statut du produit</option>
          <option value={StatusEnum.Active}>Actif</option>
          <option value={StatusEnum.Draft}>Ébauche</option>
          <option value={StatusEnum.Archived}>Archivé</option>
        </select>
      </div>
    </section>
  )
}
