import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { ProductInputCreateInput } from '../../../../_generated_/types'
import { isValidHttpUrl } from '../../shop/functions/isValidHttpUrl'
import { JSONResponse } from '../types/JSONResponse'
import { generateInputsFromJSON } from './generateInputsFromJSON'

export async function onURLSubmit(
  url: string,
  setInputs: Dispatch<SetStateAction<ProductInputCreateInput[] | undefined>>,
  setNbrOfFilesLoaded: Dispatch<SetStateAction<number>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    setNbrOfFilesLoaded(0)
    setLoading(true)

    let specificProductHandle: string = ''

    if (!isValidHttpUrl(url)) throw new Error("L'URL n'est pas valide")

    if (url.indexOf('/', 9) === -1) {
      url += '/'
    }

    if (url.substring(url.indexOf('/', 9) + 1) != 'products.json') {
      if (url.substring(url.indexOf('/', 9) + 1).startsWith('products')) {
        specificProductHandle = url.substring(url.lastIndexOf('/') + 1)

        if (specificProductHandle.indexOf('?') != -1) {
          specificProductHandle = specificProductHandle.substring(
            0,
            specificProductHandle.indexOf('?')
          )
        }

        url = url.substring(0, url.indexOf('/', 9) + 1) + 'products.json'
      } else {
        url += 'products.json'
      }
    }

    let productsRemaining = true
    let page = 1
    let json: JSONResponse = { products: [] }

    while (productsRemaining) {
      const response = await fetch(url + '?limit=250&page=' + page)
      const text = await response.text()

      if (!response.ok)
        throw new Error("L'URL que vous avez fourni à renvoyé une erreur")

      const jsonObj: JSONResponse = JSON.parse(text)

      if (jsonObj.products.length == 0 || jsonObj.products.length < 250) {
        productsRemaining = false
      }
      json.products = [...json.products, ...jsonObj.products]
      page++
    }

    const inputs = await generateInputsFromJSON(json)

    if (specificProductHandle != '') {
      const specificProduct = inputs.find(
        (input) => input.handle === specificProductHandle
      )

      if (specificProduct) {
        setInputs([specificProduct])
      } else {
        throw new Error("Le produit n'a pas été trouvé")
      }
    } else {
      setInputs(inputs)
    }

    setLoading(false)
  } catch (error) {
    setLoading(false)

    if ((error as Error).message === 'Failed to fetch')
      toast.error("L'URL que vous avez fourni à renvoyé une erreur")
    else toast.error((error as Error).message)
  }
}
