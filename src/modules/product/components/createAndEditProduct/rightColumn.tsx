import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputCreateInput,
  ProductInputUpdateInput,
} from '../../../../../_generated_/types'
import { Ads } from './ads'
import { Categories } from './category'

import { ProductOrganization } from './productOrganization'
import { Status } from './status'

export function RightColumn(props: {
  productFormState: ProductInputUpdateInput | ProductInputCreateInput
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
  productLoading?: boolean
}): JSX.Element {
  return (
    <section>
      <Categories
        productFormState={props.productFormState}
        setProductFormState={props.setProductFormState}
        productLoading={props.productLoading}
      />

      <div className="divider" />

      <Status
        productFormState={props.productFormState}
        setProductFormState={props.setProductFormState}
      />

      <div className="divider" />

      <ProductOrganization
        productFormState={props.productFormState}
        setProductFormState={props.setProductFormState}
        productLoading={props.productLoading}
      />

      <div className="divider" />

      <Ads
        productFormState={props.productFormState}
        setProductFormState={props.setProductFormState}
        productLoading={props.productLoading}
      />
    </section>
  )
}
