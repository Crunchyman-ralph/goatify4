import { createContext } from 'react'
import { defaultState, IModelContext } from '../../../contexts/ModelContext'

const SubProductContext = createContext<IModelContext>(defaultState)

export default SubProductContext

export const SubProductContextProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  return (
    <SubProductContext.Provider
      value={{
        indefiniteArticle: 'un',
        modelName: 'Sous-Produit',
        modelNamePlural: 'Sous-Produits',
        modelNameLowerCase: 'sous-produit',
        modelNameLowerCasePlural: 'sous-produits',
      }}
    >
      {children}
    </SubProductContext.Provider>
  )
}
