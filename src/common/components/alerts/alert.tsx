import { InboxIcon } from '@heroicons/react/outline'

export function Alert(props: { label: string }): JSX.Element {
  return (
    <div className="alert shadow-lg">
      <div className="flex-1">
        <InboxIcon className="mx-2 h-6 w-6 stroke-current" />
        <label>{props.label}</label>
      </div>
    </div>
  )
}
