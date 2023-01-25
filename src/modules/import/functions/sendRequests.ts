import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
} from '@apollo/client'
import {
  Exact,
  ProductInputCreateInput,
  ProductInputCreateMutation,
} from '../../../../_generated_/types'

export function sendRequests(
  inputs: ProductInputCreateInput[],
  createProduct: (
    options?:
      | MutationFunctionOptions<
          ProductInputCreateMutation,
          Exact<{
            data: ProductInputCreateInput
          }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>,
  productId?: string
) {
  return new Promise((resolve, reject) => {
    if (productId) {
      inputs.forEach((input) => {
        input.productInputId = productId
      })
    }

    const promises = inputs.map((input) => {
      return createProduct({
        variables: {
          data: input,
        },
      })
    })

    Promise.all(promises)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
