export function ButtonSubmit(props: {
  label: string
  className?: string
  onClick?: () => void
  icon?: JSX.Element
}): JSX.Element {
  return (
    <button
      className={`btn btn-primary ${props.className}`}
      type="submit"
      onClick={props.onClick}
    >
      {props.icon}
      {props.label}
    </button>
  )
}
