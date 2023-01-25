import { IModelContext } from '../../../contexts/ModelContext'
import { GoBackArrow } from './goBackArrow'

export function GoBackArrowWithContext(props: {
  context: IModelContext
  typeOfAction: string
  nbrOfGoBack?: number
}): JSX.Element {
  return (
    <div className="flex flex-row items-center">
      <GoBackArrow nbrOfGoBack={props.nbrOfGoBack} />
      <h1 className="text-3xl font-medium">
        {props.typeOfAction} {props.context?.indefiniteArticle}{' '}
        {props.context?.modelNameLowerCase}
      </h1>
    </div>
  )
}
