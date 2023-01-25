import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
} from '@apollo/client'
import router from 'next/router'
import { toast } from 'react-toastify'
import {
  Exact,
  ProductInputCreateInput,
  ProductInputCreateMutation,
} from '../../../../_generated_/types'
import { sendRequests } from './sendRequests'

export function createProducts(
  inputs: ProductInputCreateInput[],
  selectedInputsIndexes: number[],
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
  if (selectedInputsIndexes.length > 0) {
    const selectedInputs = selectedInputsIndexes.map((index) => {
      return inputs[index]
    })

    const promise = sendRequests(selectedInputs, createProduct, productId)

    toast.promise(promise, {
      pending: 'Importation en cours...',
      success: `${selectedInputs.length} produit${
        selectedInputs.length > 1 ? 's ' : ' '
      } importé${selectedInputs.length > 1 ? 's ' : ' '} avec succès 👌`,
      error: "Erreur lors de l'importation 🤯",
    })

    promise.then(() => {
      router.push('/products')
    })
  } else {
    toast.warning('Veuillez sélectionner au moins un produit')
  }
}
