import { createContext } from 'react'
import { defaultState, IModelContext } from '../../../contexts/ModelContext'

const ShopContext = createContext<IModelContext>(defaultState)

export default ShopContext

export const ShopContextProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  return (
    <ShopContext.Provider
      value={{
        indefiniteArticle: 'un',
        modelName: 'Shop',
        modelNamePlural: 'Shops',
        modelNameLowerCase: 'shop',
        modelNameLowerCasePlural: 'shops',
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}
