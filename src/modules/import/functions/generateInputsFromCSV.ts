import { toast } from 'react-toastify'
import { ProductInputCreateInput } from '../../../../_generated_/types'
import { CSVRow } from '../types/CSVRow'
import { convertCSVToJSON } from './convertCSVToJSON'
import { createInputFromCSVProduct } from './createInputFromCSVProduct'
import { getHandles } from './getHandles'
import { readCSV } from './readCSV'

export async function generateInputsFromCSV(
  filesArr: any[]
): Promise<ProductInputCreateInput[]> {
  let inputs: ProductInputCreateInput[] = []

  for (let file of filesArr) {
    const csv = await readCSV(file)

    //verifyCSVFormat(csv)

    const products = await convertCSVToJSON(csv)

    // get the different handles to split the products into multiple product objects
    const handles = getHandles(products)

    // remove duplicate handles
    const uniqueHandles = [...new Set(handles)]

    // split the products into product objects
    uniqueHandles.forEach((handle) => {
      let initialProduct: CSVRow[] = []

      const product = Object.keys(products)
        .filter(function (key) {
          return handle.includes(products[key as keyof object]['Handle'])
        })
        .reduce((obj, key) => {
          obj[key as keyof object] = products[key as keyof object]
          return obj
        }, initialProduct)

      if (product == null) {
        toast.error(
          "Le fichier n'a pas pu être traité. Assurez-vous que son format est correct."
        )
      }

      // create an input for each product
      const input = createInputFromCSVProduct(product)

      inputs.push(input)
    })
  }

  return inputs
}
