import Link from 'next/link'
import { useRouter } from 'next/router'

export function GoBackArrow(props: { nbrOfGoBack?: number }): JSX.Element {
  const router = useRouter()
  const nbrOfGoBack = props.nbrOfGoBack ?? 1
  const url = router.asPath.split('/').slice(0, -[nbrOfGoBack]).join('/')

  return (
    <Link href={url}>
      <a className="btn btn-ghost mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 xl:h-7 xl:w-7"
          fill="none"
          viewBox="0 0 24 23"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </a>
    </Link>
  )
}
