import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { ProductInputCreateInput } from '../../../../_generated_/types'
import { generateInputsFromCSV } from './generateInputsFromCSV'

export async function onCSVLoad(
  e: { target: { files: FileList | null } },
  setNbrOfFilesLoaded: Dispatch<SetStateAction<number>>,
  setInputs: Dispatch<SetStateAction<ProductInputCreateInput[] | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true)
  let files = Array.prototype.slice.call(e.target.files)

  if (files.length === 0) {
    toast.error(
      `Aucun fichier n'a été sélectionné. Veuillez sélectionner au moins un fichier CSV.`
    )
    setLoading(false)
    return
  }

  setNbrOfFilesLoaded(files.length)

  const inputs = await generateInputsFromCSV(files)

  setInputs(inputs)
  setLoading(false)
}
