import { useContext } from 'react'
import { Shop, ShopDeleteDocument } from '../../../../_generated_/types'
import { ButtonEdit } from '../../../common/components/buttons/buttonEdit'
import { TableButtonDelete } from '../../../common/components/buttons/tableButtonDelete'
import ShopContext from '../contexts/ShopContextProvider'

export function ShopRow(props: { shop: Shop }): JSX.Element {
  const shopContext = useContext(ShopContext)

  return (
    <tr key={props.shop.id_}>
      <td>{props.shop?.name}</td>
      <td>{props.shop?.url}</td>
      <td>
        <ButtonEdit id={props.shop.id_} />
      </td>
      <td>
        <TableButtonDelete
          context={shopContext}
          label={props.shop.name}
          idProperty={'shopDeleteId'}
          id={props.shop.id_}
          deleteMutation={ShopDeleteDocument}
          refetchQueries={['Shops']}
        />
      </td>
    </tr>
  )
}
