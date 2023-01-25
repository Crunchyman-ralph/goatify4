import { createContext } from 'react'
import { defaultState, IModelContext } from '../../../contexts/ModelContext'

const CategoryContext = createContext<IModelContext>(defaultState)

export default CategoryContext

export const CategoryContextProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  return (
    <CategoryContext.Provider
      value={{
        indefiniteArticle: 'une',
        modelName: 'Catégorie',
        modelNamePlural: 'Catégories',
        modelNameLowerCase: 'catégorie',
        modelNameLowerCasePlural: 'catégories',
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
