import { Editor } from '@tinymce/tinymce-react'
import { Dispatch, SetStateAction, useRef } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { publicUrl } from '../../../../utils/urls'

import { Inventory } from './inventory'
import { OptionsTable } from './options/optionsTable'
import { Price } from './price'
import { Seo } from './seo'
import { Shipping } from './shipping'
import { VariantsTable } from './variants/variantsTable'

export function LeftColumn(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  initialDescription: string
}): JSX.Element {
  const editorRef = useRef<TinyMCEEditor | null>(null)

  return (
    <section>
      <div aria-label="title" className="form-control mb-2">
        <label className="label">
          <span className="label-text">Titre</span>
        </label>
        <input
          className="input input-bordered max-w-sm"
          value={props.productFormState.title || ''}
          onChange={(e) =>
            props.setProductFormState({
              ...props.productFormState,
              title: e.target.value,
            })
          }
          required
          type="text"
        />
      </div>

      <div
        aria-label="description"
        className="form-control mb-2 max-w-none md:max-w-2xl xl:max-w-3xl "
      >
        <label className="label">
          <span className="label-text">Description</span>
        </label>

        <Editor
          tinymceScriptSrc={`${publicUrl}/tinymce/tinymce.min.js`}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          onEditorChange={(newValue) => {
            props.setProductFormState({
              ...props.productFormState,
              descriptionHtml: newValue,
            })
          }}
          initialValue={props.initialDescription}
          init={{
            height: 500,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'anchor',
              'media',
              'table',
              'code',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic underline forecolor | alignleft aligncenter ' +
              'alignright| bullist numlist | ' +
              'link image media table' +
              ' | outdent indent | removeformat code',
            content_style:
              'body { font-family:ui-sans-serif,sans-serif; font-size:14px }',
          }}
        />
      </div>

      <div className="divider" />

      <section>
        <h2 className="label text-xl font-medium">Images</h2>
        <div aria-label="images" className="form-control mb-2">
          <div className="grid max-w-xl grid-cols-4 gap-2">
            {props.productFormState.images?.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={image.src ? image.src : ''}
                alt={image.altText ? image.altText : ''}
                className="rounded first:col-span-2 first:row-span-2 dark:brightness-75"
              />
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      {props.productFormState.variants &&
        props.productFormState.variants?.length === 1 && (
          <>
            <Price
              productFormState={props.productFormState}
              setProductFormState={props.setProductFormState}
              variantIndex={0}
            />

            <div className="divider" />

            <Inventory
              productFormState={props.productFormState}
              setProductFormState={props.setProductFormState}
              variantIndex={0}
            />

            <div className="divider" />

            <Shipping
              productFormState={props.productFormState}
              setProductFormState={props.setProductFormState}
              variantIndex={0}
            />
          </>
        )}

      <OptionsTable
        productFormState={props.productFormState}
        setProductFormState={props.setProductFormState}
      />

      <div className="divider" />

      {props.productFormState.variants &&
        props.productFormState.variants?.length > 1 && (
          <>
            <VariantsTable
              productFormState={props.productFormState}
              setProductFormState={props.setProductFormState}
            />
            <div className="divider" />
          </>
        )}

      <Seo
        productFormState={props.productFormState}
        setProductFormState={props.setProductFormState}
      />
    </section>
  )
}
