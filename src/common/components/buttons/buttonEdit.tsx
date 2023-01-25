import Link from 'next/link'
import React from 'react'
import { PencilIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

export function ButtonEdit(props: { id: string | number }): JSX.Element {
  const router = useRouter()
  const url = router.asPath + '/' + props.id

  return (
    <Link href={url} passHref={true}>
      <button className="btn btn-sm">
        <PencilIcon className="h-5 w-5" />
      </button>
    </Link>
  )
}
