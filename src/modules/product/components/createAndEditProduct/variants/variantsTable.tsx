import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../../_generated_/types'
import { VariantRow } from './variantRow'

export function VariantsTable(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
}): JSX.Element {
  return (
    <section className="max-w-4xl">
      <h2 className="label text-xl font-medium">Variantes</h2>

      <div id="variantsTable" className="overflow-x-auto">
        <table className="table-compact static table w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className={`!z-0 border-r-2 border-base-200`}>Image</th>
              <th>Variante</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>SKU</th>
              <th>Modifier</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {props.productFormState.variants
              ?.sort((a, b) =>
                a.options && b.options
                  ? a.options
                      ?.join(' / ')
                      .localeCompare(b.options?.join(' / '), 'fr', {
                        numeric: true,
                      })
                  : 0
              )
              .map((variant, index) => (
                <VariantRow
                  key={index}
                  variant={variant}
                  variantIndex={index}
                  productFormState={props.productFormState}
                  setProductFormState={props.setProductFormState}
                />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
