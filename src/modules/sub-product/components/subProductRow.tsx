import { useContext } from 'react'
import {
  ProductInput,
  ProductInputDeleteDocument,
} from '../../../../_generated_/types'
import { ButtonEdit } from '../../../common/components/buttons/buttonEdit'
import { TableButtonDelete } from '../../../common/components/buttons/tableButtonDelete'
import { htmlDescriptionToText } from '../../../common/functions/htmlDescriptionToText'
import SubProductContext from '../contexts/SubProductContextProvider'

export function SubProductRow(props: {
  subProduct: ProductInput
}): JSX.Element {
  const subProductContext = useContext(SubProductContext)

  return (
    <tr key={props.subProduct.id_}>
      <td>{props.subProduct?.title}</td>
      <td className="">
        {htmlDescriptionToText(props.subProduct.descriptionHtml ?? '', 80)}
      </td>
      <td>
        <ButtonEdit id={props.subProduct.id_ ?? ''} />
      </td>
      <td>
        <TableButtonDelete
          context={subProductContext}
          label={props.subProduct.title ?? ''}
          idProperty={'productInputDeleteId'}
          id={props.subProduct.id_ ?? ''}
          deleteMutation={ProductInputDeleteDocument}
          refetchQueries={['SubProducts']}
        />
      </td>
    </tr>
  )
}
