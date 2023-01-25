import {
  CodeIcon,
  DocumentSearchIcon,
  DownloadIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  ProductInputCreateInput,
  useProductInputCreateMutation,
  useProductInputsTitleQuery,
} from '../../../../_generated_/types'
import { GoBackArrowWithLabel } from '../../../common/components/goBackArrow/goBackArrowWithLabel'
import { Loader } from '../../../common/components/loader'
import { Select } from '../../../common/components/selectors/select'
import { createProducts } from '../functions/createProducts'
import { onCSVLoad } from '../functions/onCSVLoad'
import { onURLSubmit } from '../functions/onURLSubmit'
import { ImportFormTable } from './ImputFormTable'

export function ImportForm(): JSX.Element {
  const [inputs, setInputs] = useState<ProductInputCreateInput[]>()
  const [selectedInputsIndexes, setSelectedInputsIndexes] = useState<number[]>(
    []
  )
  const [nbrOfFilesLoaded, setNbrOfFilesLoaded] = useState<number>(0)
  const [url, setUrl] = useState<string>('')
  const [importType, setImportType] = useState<string>('asProduct')
  const [loading, setLoading] = useState<boolean>(false)

  const [productId, setProductId] = useState<string>('')

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useProductInputsTitleQuery({
    variables: {
      includeSubProducts: false,
    },
    fetchPolicy: 'network-only',
  })

  const [createProduct] = useProductInputCreateMutation()

  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 space-x-6 sm:flex-row sm:items-center sm:space-y-0">
        <GoBackArrowWithLabel label="Importer un/des produit(s)" />
        {loading && <Loader />}
      </div>
      <div className="flex shrink-0 flex-col justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <label>
          <input
            disabled={loading}
            multiple
            type="file"
            accept=".csv"
            onChange={(e) =>
              onCSVLoad(e, setNbrOfFilesLoaded, setInputs, setLoading)
            }
            className="block w-full text-sm file:btn file:btn-sm file:mr-4 file:py-2 file:hover:bg-neutral-focus"
          />
        </label>
        <div className="divider divider-horizontal invisible md:visible" />
        <div className="form-control !ml-0 grow md:!ml-6">
          <form
            className="input-group"
            onSubmit={(e) => {
              e.preventDefault()
              onURLSubmit(url, setInputs, setNbrOfFilesLoaded, setLoading)
            }}
          >
            <input
              required
              placeholder="https://acme.com"
              type="text"
              className="input input-bordered grow"
              onChange={(e) => {
                setUrl(e.target.value)
              }}
            />

            <button disabled={loading} className="btn">
              <DocumentSearchIcon className="-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {inputs && (
        <>
          <ImportFormTable
            nbrOfFilesLoaded={nbrOfFilesLoaded}
            inputs={inputs}
            selectedInputs={selectedInputsIndexes}
            setSelectedInputs={setSelectedInputsIndexes}
          />

          <div className="flex flex-wrap items-center gap-5">
            <div className="form-control">
              <div className="input-group">
                <button
                  disabled={loading}
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      if (importType === 'asSubProduct') {
                        if (!productId)
                          throw new Error('Vous devez selectionner un produit')
                        createProducts(
                          inputs,
                          selectedInputsIndexes,
                          createProduct,
                          productId
                        )
                      } else {
                        createProducts(
                          inputs,
                          selectedInputsIndexes,
                          createProduct
                        )
                      }
                    } catch (error) {
                      toast.error((error as Error).message)
                    }
                  }}
                >
                  <DownloadIcon className="mr-2 h-7 w-7" />
                  Importer
                </button>
                <select
                  value={importType}
                  className="select select-bordered"
                  onChange={(e) => setImportType(e.target.value)}
                >
                  <option disabled>Choississez un type d'import</option>
                  <option value="asProduct">En tant que produit</option>
                  <option value="asSubProduct">En tant que sous-produit</option>
                </select>
              </div>
            </div>
            {importType === 'asSubProduct' && (
              <>
                de
                {productsError ? (
                  <div className="alert alert-error">
                    Erreur lors de la récupération des produits
                  </div>
                ) : productsLoading ? (
                  <input className="input input-bordered max-w-sm" disabled />
                ) : (
                  <Select
                    className="min-w-full md:min-w-[25rem]"
                    placeholder="Choisissez un produit..."
                    options={productsData?.productInputs.nodes}
                    idProperty="id_"
                    propertiesToDisplay={['title']}
                    formState={productId}
                    setFormState={setProductId}
                    formValueIsNotObject={true}
                    noOptionsMessage="Aucun produit"
                  />
                )}
              </>
            )}
          </div>

          {process.env.NODE_ENV == 'development' && (
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title flex items-center font-medium">
                <CodeIcon className="mr-2 h-5 w-5" />
                Query variables
              </div>
              <div className="collapse-content">
                <div className="mockup-code">
                  <pre>
                    <code>
                      {JSON.stringify(
                        selectedInputsIndexes.map((index) => inputs[index]),
                        null,
                        2
                      )}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
