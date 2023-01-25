import {
  ImageInputCreateInput,
  ProductInputCreateInput,
  ProductVariantInputCreateInput,
  Status,
  WeightUnit,
} from '../../../../_generated_/types'
import { removeNullsAndEmptyStringsFromObject } from '../../../common/functions/removeNullsAndEmptyStringsFromObject'
import { JSONResponse } from '../types/JSONResponse'
export async function generateInputsFromJSON(json: JSONResponse) {
  let inputs: ProductInputCreateInput[] = []

  json.products.forEach((product) => {
    let input: ProductInputCreateInput = {}
    let images: ImageInputCreateInput[] = []
    let variants: ProductVariantInputCreateInput[] = []

    input.title = product.title
    input.handle = product.handle
    input.descriptionHtml = product.body_html
    input.vendor = product.vendor
    input.productType = product.product_type
    input.tags = product.tags
    input.options = product.options.map((option) => option.name)
    input.status = Status.Draft

    if (product.images) {
      product.images.forEach((image) => {
        images.push({
          src: image.src,
        })
      }),
        (input.images = images)
    }

    if (product.variants) {
      product.variants.forEach((variant) => {
        variants.push({
          title: variant.title,
          options: [
            variant.option1,
            variant.option2 ?? '',
            variant.option3 ?? '',
          ],
          sku: variant.sku,
          requiresShipping: variant.requires_shipping,
          taxable: variant.taxable,
          price: variant.price,
          weight: variant.grams,
          weightUnit: WeightUnit.Grams,
          compareAtPrice: variant.compare_at_price,
        })
      }),
        (input.variants = variants)
    }

    let cleanedInput = removeNullsAndEmptyStringsFromObject(input)

    inputs.push(cleanedInput)
  })

  return inputs
}
