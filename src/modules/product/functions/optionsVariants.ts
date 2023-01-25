import { Dispatch, SetStateAction } from 'react'
import {
  ProductInputUpdateInput,
  ProductVariantInputUpdateInput,
} from '../../../../_generated_/types'
import { ProductInputCreateInput } from './../../../../_generated_/types'

export function getExistingOptionsValues(
  productFormState: ProductInputUpdateInput | ProductInputCreateInput,
  optionIndexToSkip?: number
) {
  if (!productFormState.options) return []

  let optionsValues: string[][] = []

  productFormState.options.forEach((_option, index) => {
    let optionValues: string[] = []

    if (index === optionIndexToSkip) {
      productFormState.variants
        ?.map((variant) => variant.options?.at(index + 1))
        .filter((option, index, self) => self.indexOf(option) === index)
        .map((optionValue) => optionValues.push(optionValue as string))

      optionsValues.push(optionValues)
    } else {
      productFormState.variants
        ?.map((variant) => variant.options?.at(index))
        .filter((option, index, self) => self.indexOf(option) === index)
        .map((optionValue) => optionValues.push(optionValue as string))

      optionsValues.push(optionValues)
    }
  })

  return optionsValues
}

export function createCombinations(optionValues: string[][]) {
  let combinations: string[][] = []

  // Number of arrays
  let n = optionValues.length

  // To keep track of next element in
  // each of the n arrays
  let indices = new Array(n)

  // Initialize with first element's index
  for (let i = 0; i < n; i++) indices[i] = 0

  while (true) {
    // Print current combination

    let combination: string[] = []
    for (let i = 0; i < n; i++) {
      combination.push(optionValues[i][indices[i]])
    }

    combinations.push(combination)
    //document.write('<br>')

    // Find the rightmost array that has more
    // elements left after the current element
    // in that array
    let next = n - 1
    while (next >= 0 && indices[next] + 1 >= optionValues[next].length) next--

    // No such array is found so no more
    // combinations left
    if (next < 0) return combinations

    // If found move to next element in that
    // array
    indices[next]++

    // For all arrays to the right of this
    // array current index again points to
    // first element
    for (let i = next + 1; i < n; i++) indices[i] = 0
  }
}

export function createUpdateOrDeleteVariants(
  newCombinations: string[][],
  productFormState: ProductInputUpdateInput | ProductInputCreateInput,
  setProductFormState: Dispatch<
    SetStateAction<ProductInputUpdateInput | ProductInputCreateInput>
  >
) {
  const originalNewCombinations = structuredClone(newCombinations)
  const newCombinationsLength = newCombinations.length

  // If the first variant option is "Default Title", it means that the product
  // had no variants, so we rename it to the new first option combination
  if (
    productFormState.variants?.length === 1 &&
    productFormState.variants &&
    productFormState.variants[0] &&
    productFormState.variants[0].options &&
    productFormState.variants[0].options[0] === 'Default Title'
  ) {
    let variants = productFormState.variants

    if (variants) {
      variants[0].options = newCombinations[0]

      setProductFormState({
        ...productFormState,
        variants: variants,
      })
    }
  }

  // if the new combination length is 1 and the new combination value is 'Default Title',
  // it means that the last option was deleted and we need to have a default variant
  if (
    newCombinationsLength === 1 &&
    newCombinations.at(0)?.at(0) === 'Default Title'
  ) {
    let variants = productFormState.variants

    if (variants) {
      variants[0].options = newCombinations[0]

      setProductFormState({
        ...productFormState,
        variants: variants,
      })
    }
  }

  // replace the options of the existing variants with the first matching combination
  productFormState.variants?.forEach((variant, index) => {
    for (let i = 0; i < newCombinations.length; i++) {
      if (
        variant.options &&
        findCommonElements(variant.options, newCombinations[i])
      ) {
        let variants = productFormState.variants

        if (variants) {
          variants[index].options = newCombinations[i]

          setProductFormState({
            ...productFormState,
            variants: variants,
          })

          // delete the used combination
          newCombinations.splice(newCombinations.indexOf(newCombinations[i]), 1)
          break
        }
      }
    }
  })

  // create the remaining variants
  newCombinations.forEach((combination) => {
    let variants = productFormState.variants

    let newVariant: ProductVariantInputUpdateInput = {
      options: combination,
      price: productFormState.variants?.at(0)?.price,
    }

    variants?.push(newVariant)

    setProductFormState({
      ...productFormState,
      variants: variants,
    })
  })

  // filter the variants to only keep the new ones
  if (
    productFormState.variants &&
    productFormState.variants?.length > newCombinationsLength
  ) {
    let variants = productFormState.variants

    let newVariants = variants.filter((variant) => {
      let result = false

      originalNewCombinations.forEach((combination) => {
        if (JSON.stringify(variant.options) == JSON.stringify(combination)) {
          result = true
        }
      })

      return result
    })

    setProductFormState({
      ...productFormState,
      variants: newVariants,
    })
  }
}

export function findCommonElements(arr1: string[], arr2: string[]) {
  return arr1.some((item) => arr2.includes(item))
}
