import { createContext } from 'react'
import { defaultState, IModelContext } from '../../../contexts/ModelContext'

const ProductContext = createContext<IModelContext>(defaultState)

export default ProductContext

export const ProductContextProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  return (
    <ProductContext.Provider
      value={{
        indefiniteArticle: 'un',
        modelName: 'Produit',
        modelNamePlural: 'Produits',
        modelNameLowerCase: 'produit',
        modelNameLowerCasePlural: 'produits',
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
