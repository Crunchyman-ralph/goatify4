import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
  ProductVariantInventoryPolicy,
} from '../../../../../_generated_/types'

export function Inventory(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  variantIndex: number
}): JSX.Element {
  return (
    <section>
      <h3 className="label text-lg font-medium">Stock</h3>
      <div className="flex flex-col sm:flex-row sm:space-x-5">
        <div aria-label="SKU" className="form-control mb-2">
          <label className="label">
            <span className="label-text">
              SKU (unité de gestion des stocks)
            </span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            value={
              props.productFormState.variants?.at(props.variantIndex)?.sku || ''
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].sku = e.target.value

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
            type="number"
            min={0}
            step={1}
          />
        </div>

        <div aria-label="Code-barres" className="form-control mb-2">
          <label className="label">
            <span className="label-text">
              Code-barres (ISBN, UPC, GTIN, etc.)
            </span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            value={
              props.productFormState.variants?.at(props.variantIndex)
                ?.barcode || ''
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].barcode = e.target.value

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
            type="text"
          />
        </div>
      </div>

      <div aria-label="Quantité" className="form-control mb-2">
        <label className="label">
          <span className="label-text">
            Quantité (Emplacement par défaut du shop)
          </span>
        </label>
        <input
          className="input input-bordered max-w-sm"
          value={
            props.productFormState.variants?.at(props.variantIndex)
              ?.inventoryQuantities?.availableQuantity || ''
          }
          onChange={(e) => {
            let variants = props.productFormState.variants

            if (variants && variants.at(props.variantIndex)) {
              variants[props.variantIndex].inventoryQuantities = {
                availableQuantity: parseInt(e.target.value),
                locationId: 'toReplaceWithDefaultLocationId',
              }

              props.setProductFormState({
                ...props.productFormState,
                variants: variants,
              })
            }
          }}
          type="number"
          min={0}
          // shopify max quantity is 1000000000
          max={1000000000}
          step={0.01}
        />
      </div>

      <div className="form-control mb-2">
        <label className="label justify-start space-x-3">
          <input
            type="checkbox"
            className="checkbox"
            checked={
              props.productFormState.variants?.at(props.variantIndex)
                ?.inventoryPolicy === ProductVariantInventoryPolicy.Continue
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].inventoryPolicy = e.target.checked
                  ? ProductVariantInventoryPolicy.Continue
                  : ProductVariantInventoryPolicy.Deny

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
          />
          <span className="label-text">
            Continuer à vendre en cas de rupture de stock
          </span>
        </label>
      </div>
    </section>
  )
}
