import {
  ImageInputCreateInput,
  ProductInputCreateInput,
  ProductVariantInputCreateInput,
  ProductVariantInventoryManagement,
  SeoInputCreateInput,
  Status,
  WeightUnit,
} from '../../../../_generated_/types'
import { removeNullsAndEmptyStringsFromObject } from '../../../common/functions/removeNullsAndEmptyStringsFromObject'
import { CSVRow } from '../types/CSVRow'
import { keyIsVariant } from './keyIsVariant'

export function createInputFromCSVProduct(
  product: CSVRow[]
): ProductInputCreateInput {
  let input: ProductInputCreateInput = {}
  let images: ImageInputCreateInput[] = []
  let options: string[] = []
  let seo: SeoInputCreateInput = {}
  let variants: ProductVariantInputCreateInput[] = []

  let index = 0

  // in csv, a product object is composed of multiple rows
  for (let row in product) {
    // if this is the first row, create the input base fields
    if (index === 0) {
      input.descriptionHtml = product[row]['Body (HTML)'] || null
      input.customProductType = product[row]['Custom Product Type'] || null
      input.giftCard = product[row]['Gift Card'] == 'true'
      input.handle = product[row]['Handle'] || null
      input.status = (product[row]['Status'] as string).toUpperCase() as Status
      input.tags =
        product[row]['Tags'] == ''
          ? null
          : (product[row]['Tags'] as string).split(',')
      input.title = product[row]['Title'] || null
      input.vendor = product[row]['Vendor'] || null
      seo.title = product[row]['SEO Title'] || null
      seo.description = product[row]['SEO Description'] || null
    }

    // Add images to the input
    images.push({
      src: product[row]['Image Src'],
      altText: product[row]['Image Alt Text'],
    })

    // Add options to the input
    if (
      product[row]['Option1 Name'] != 'Title' &&
      product[row]['Option1 Value'] != 'Default Title'
    ) {
      product[row]['Option1 Name'] != ''
        ? options.push(product[row]['Option1 Name'])
        : null
      product[row]['Option2 Name'] != ''
        ? options.push(product[row]['Option2 Name'])
        : null
      product[row]['Option3 Name'] != ''
        ? options.push(product[row]['Option3 Name'])
        : null
    }

    // Add a variant input if the current key is a variant
    if (keyIsVariant(product, row)) {
      variants.push({
        options: [
          product[row]['Option1 Value'],
          product[row]['Option2 Value'],
          product[row]['Option3 Value'],
        ].filter((option) => option != ''),
        barcode: product[row]['Variant Barcode'].replace("'", ''),
        compareAtPrice: product[row]['Variant Compare At Price'],
        weight: parseFloat(product[row]['Variant Grams']),
        weightUnit: WeightUnit.Grams,
        imageSrc: product[row]['Variant Image'],
        inventoryManagement:
          product[row]['Variant Inventory Tracker'] == 'shopify'
            ? ProductVariantInventoryManagement.Shopify
            : null,
        price: product[row]['Variant Price'],
        requiresShipping: product[row]['Variant Requires Shipping'] == 'true',
        sku:
          product[row]['Variant SKU'] != ''
            ? (product[row]['Variant SKU'] as string).replace("'", '')
            : null,
        taxCode:
          product[row]['Variant Tax Code'] == ''
            ? null
            : product[row]['Variant Tax Code'],
        taxable: product[row]['Variant Taxable'] == 'true',
      })
    }

    index++
  }

  input.images = images
  if (options.length > 0) input.options = options
  if (Object.keys(seo).length != 0) input.seo = seo
  input.variants = variants

  let cleanedInput = removeNullsAndEmptyStringsFromObject(input)

  return cleanedInput as ProductInputCreateInput
}
