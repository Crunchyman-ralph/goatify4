/* eslint-disable @next/next/no-img-element */
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
  ProductVariantInputCreateInput,
  ProductVariantInputUpdateInput,
} from '../../../../../../_generated_/types'
import { ModalDeleteProductVariant } from '../../modals/modalDeleteProductVariant'
import { ModalEditProductVariant } from '../../modals/modalEditProductVariant'

export function VariantRow(props: {
  variant: ProductVariantInputUpdateInput | ProductVariantInputCreateInput
  variantIndex: number
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
}): JSX.Element {
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showImageColumnBorder, setShowImageColumnBorder] = useState(false)

  useEffect(() => {
    const handleScroll = (element: HTMLElement) => {
      if (element.scrollLeft >= 1) {
        setShowImageColumnBorder(true)
      } else {
        setShowImageColumnBorder(false)
      }
    }
    const element = document.getElementById('variantsTable')
    if (element)
      element.addEventListener('scroll', function () {
        handleScroll(element)
      })
    return () => {
      if (element)
        element.removeEventListener('scroll', function () {
          handleScroll(element)
        })
    }
  }, [])

  return (
    <tr key={props.variantIndex}>
      <td
        className={`border-b-1 sticky left-0 border-r-2 border-r-base-100 transition-colors duration-500 ${
          showImageColumnBorder ? 'border-r-base-200' : ''
        }`}
      >
        <div className="avatar">
          <div className="h-16 w-16 rounded">
            {props.variant.imageSrc && (
              <img
                src={
                  props.variant.imageSrc != null &&
                  typeof props.variant.imageSrc === 'string'
                    ? props.variant.imageSrc
                    : ''
                }
                alt=""
                className="dark:brightness-75"
              />
            )}
          </div>
        </div>
      </td>
      <td>{props.variant.options?.join(' / ')}</td>
      <td>
        <input
          className="input input-bordered max-w-sm"
          value={
            props.productFormState.variants?.at(props.variantIndex)?.price || ''
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
      </td>
      <td>
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
      </td>
      <td>
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
      </td>
      <td>
        <>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setShowEditModal(true)}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          {showEditModal && (
            <ModalEditProductVariant
              productFormState={props.productFormState}
              setProductFormState={props.setProductFormState}
              variantIndex={props.variantIndex}
              setShowEditModal={setShowEditModal}
            />
          )}
        </>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-error btn-sm"
          onClick={() => setShowDeleteModal(true)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        {showDeleteModal && (
          <ModalDeleteProductVariant
            productFormState={props.productFormState}
            setProductFormState={props.setProductFormState}
            variantIndex={props.variantIndex}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </td>
    </tr>
  )
}
