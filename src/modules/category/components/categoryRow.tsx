import { useContext } from 'react'
import { Category, CategoryDeleteDocument } from '../../../../_generated_/types'
import { TableButtonDelete } from '../../../common/components/buttons/tableButtonDelete'
import CategoryContext from '../contexts/CategoryContextProvider'

export function CategoryRow(props: { category: Category }): JSX.Element {
  const categoryContext = useContext(CategoryContext)

  return (
    <tr key={props.category.id_}>
      <td>{props.category.name}</td>
      <td>
        <TableButtonDelete
          context={categoryContext}
          label={props.category.name}
          idProperty={'categoryDeleteId'}
          id={props.category.id_}
          deleteMutation={CategoryDeleteDocument}
          refetchQueries={['Categories']}
        />
      </td>
    </tr>
  )
}
