import Link from 'next/link'
import { useRouter } from 'next/router'

export function ButtonRedirect(props: {
  label: string
  path: string
  icon?: JSX.Element
  className?: string
}): JSX.Element {
  const router = useRouter()
  const url = `${router.asPath}/${props.path}`
  return (
    <Link href={url} passHref={true}>
      <button className={`btn ${props.className}`}>
        {props.icon}
        {props.label}
      </button>
    </Link>
  )
}
