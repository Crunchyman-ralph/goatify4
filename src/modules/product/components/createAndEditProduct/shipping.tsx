import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
  WeightUnit,
} from '../../../../../_generated_/types'

export function Shipping(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  variantIndex: number
}): JSX.Element {
  return (
    <section>
      <h3 className="label text-lg font-medium">Expédition</h3>
      <div className="form-control mb-2">
        <label className="label justify-start space-x-3">
          <input
            type="checkbox"
            className="checkbox"
            checked={
              props.productFormState.variants?.at(props.variantIndex)
                ?.requiresShipping || false
            }
            onChange={(e) => {
              let variants = props.productFormState.variants

              if (variants && variants.at(props.variantIndex)) {
                variants[props.variantIndex].requiresShipping = e.target.checked

                props.setProductFormState({
                  ...props.productFormState,
                  variants: variants,
                })
              }
            }}
          />
          <span className="label-text">Produit physique</span>
        </label>
      </div>

      {props.productFormState.variants &&
        props.productFormState.variants[props.variantIndex]
          .requiresShipping && (
          <>
            <div aria-label="Poids" className="form-control mb-2">
              <label className="label">
                <span className="label-text">Poids</span>
              </label>
              <div className="input-group">
                <input
                  className="input input-bordered max-w-sm"
                  value={
                    props.productFormState.variants?.at(props.variantIndex)
                      ?.weight || ''
                  }
                  onChange={(e) => {
                    let variants = props.productFormState.variants

                    if (variants && variants.at(props.variantIndex)) {
                      variants[props.variantIndex].weight = parseFloat(
                        e.target.value
                      )

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
                <div
                  aria-label="Unité de poids du produit"
                  className="form-control mb-2"
                >
                  <select
                    value={
                      props.productFormState.variants?.at(props.variantIndex)
                        ?.weightUnit || ''
                    }
                    onChange={(e) => {
                      let variants = props.productFormState.variants

                      if (variants && variants.at(props.variantIndex)) {
                        variants[props.variantIndex].weightUnit = e.target
                          .value as WeightUnit

                        props.setProductFormState({
                          ...props.productFormState,
                          variants: variants,
                        })
                      }
                    }}
                    className="select select-bordered w-full max-w-xs font-normal"
                  >
                    <option value={WeightUnit.Pounds}>lb</option>
                    <option value={WeightUnit.Ounces}>oz</option>
                    <option value={WeightUnit.Kilograms}>kg</option>
                    <option value={WeightUnit.Grams}>g</option>
                  </select>
                </div>
              </div>
              <label className="label">
                <span className="label-text">
                  Utilisé pour calculer les frais d'expédition à l'étape de
                  paiement et étiqueter les prix pendant le traitement des
                  commandes.
                </span>
              </label>
            </div>

            <h3 className="label font-medium">Informations douanières</h3>
            <div
              aria-label="Code SH (Système harmonisé)"
              className="form-control mb-2"
            >
              <label className="label">
                <span className="label-text">Code SH (Système harmonisé)</span>
              </label>
              <input
                className="input input-bordered max-w-sm"
                defaultValue={
                  props.productFormState.variants?.at(props.variantIndex)
                    ?.harmonizedSystemCode || ''
                }
                onChange={(e) => {
                  const element = e.target as HTMLInputElement
                  const errorLabel =
                    element.nextElementSibling as HTMLInputElement

                  if (isValidHarmonizedSystemCode(e.target.value)) {
                    element.classList.remove('input-error')
                    errorLabel.classList.add('hidden')

                    let variants = props.productFormState.variants

                    if (variants && variants.at(props.variantIndex)) {
                      variants[props.variantIndex].harmonizedSystemCode =
                        e.target.value

                      props.setProductFormState({
                        ...props.productFormState,
                        variants: variants,
                      })
                    }
                  } else {
                    errorLabel.classList.remove('hidden')
                    element.classList.add('input-error')
                  }
                  let variants = props.productFormState.variants
                }}
                type="text"
                minLength={6}
                maxLength={13}
              />
              <label className="label hidden">
                <span className="label-text-alt">
                  Le code du système harmonisé doit être un nombre compris entre
                  six et treize chiffres.
                </span>
              </label>
            </div>
          </>
        )}
    </section>
  )
}

function isValidHarmonizedSystemCode(value: string) {
  return value.length >= 6 && value.length <= 13 && value.match('^[0-9]+$')
}
