import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { htmlDescriptionToText } from '../../../../common/functions/htmlDescriptionToText'

export function Seo(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
}): JSX.Element {
  return (
    <section>
      <h2 className="text-xl font-medium">Référencement naturel</h2>
      <div aria-label="Méta-titre de la page" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Méta-titre de la page</span>
        </label>
        <input
          type="text"
          maxLength={70}
          className="input input-bordered max-w-sm"
          placeholder={props.productFormState.title || ''}
          value={props.productFormState.seo?.title || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              seo: {
                ...props.productFormState.seo,
                title: e.target.value,
              },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">70 caractères maximum</span>
        </label>
      </div>

      <div aria-label="Meta-description" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Méta-description</span>
        </label>
        <textarea
          placeholder={htmlDescriptionToText(
            props.productFormState.descriptionHtml || '',
            320
          )}
          maxLength={320}
          className="textarea textarea-bordered h-28 max-w-3xl"
          value={props.productFormState.seo?.description || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              seo: {
                ...props.productFormState.seo,
                description: e.target.value,
              },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">320 caractères maximum</span>
        </label>
      </div>

      <div aria-label="Ancre de l'URL" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Ancre de l'URL</span>
        </label>
        <input
          type="text"
          className="input input-bordered max-w-sm"
          value={props.productFormState.handle || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              handle: e.target.value,
            })
          }
        />
      </div>
    </section>
  )
}
