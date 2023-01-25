import { ReactNode } from 'react'
import { GoBackArrow } from './goBackArrow'

export function GoBackArrowWithLabel(props: {
  label: string | ReactNode
  nbrOfGoBack?: number
}): JSX.Element {
  return (
    <div className="flex flex-row items-center">
      <GoBackArrow nbrOfGoBack={props.nbrOfGoBack} />
      <h1 className="text-md font-medium sm:text-xl md:text-2xl xl:text-3xl ">
        {props.label}
      </h1>
    </div>
  )
}
