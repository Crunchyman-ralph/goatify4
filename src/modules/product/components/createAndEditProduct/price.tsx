import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'

export function Price(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  variantIndex: number
}): JSX.Element {
  return (
    <section>
      <h3 className="label text-lg font-medium">Prix</h3>
      <div className="flex flex-col sm:flex-row sm:space-x-5">
        <div aria-label="Prix" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Prix</span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            value={
              props.productFormState.variants?.at(props.variantIndex)?.price ||
              ''
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].price = e.target.value

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
            type="number"
            min={0}
            step={0.01}
          />
        </div>

        <div aria-label="Prix avant réduction" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Prix avant réduction</span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            value={
              props.productFormState.variants?.at(props.variantIndex)
                ?.compareAtPrice || ''
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].compareAtPrice = e.target.value

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
            type="number"
            min={0}
            step={0.01}
          />
        </div>
      </div>

      <div className="form-control mb-2 ">
        <label className="label justify-start space-x-3">
          <input
            type="checkbox"
            className="checkbox"
            checked={
              props.productFormState.variants?.at(props.variantIndex)
                ?.taxable || false
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].taxable = e.target.checked

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
          />
          <span className="label-text">
            Appliquer une taxe sur cette variante
          </span>
        </label>
      </div>

      <div aria-label="Coût par article" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Coût par article</span>
        </label>
        <input
          className="input input-bordered max-w-sm"
          value={
            props.productFormState.variants?.at(props.variantIndex)
              ?.inventoryItem?.cost || ''
          }
          onChange={(e) => {
            let variants = props.productFormState.variants

            if (variants && variants.at(props.variantIndex)) {
              variants[props.variantIndex].inventoryItem = {
                ...variants[props.variantIndex].inventoryItem,
                cost: parseFloat(e.target.value),
              }

              props.setProductFormState({
                ...props.productFormState,
                variants: variants,
              })
            }
          }}
          type="number"
          min={0}
          step={0.01}
        />
        <label className="label">
          <span className="label-text">Les clients ne verront pas cela</span>
        </label>
      </div>
    </section>
  )
}
