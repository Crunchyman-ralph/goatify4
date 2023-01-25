import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ProductInputTitleDocument,
  ShopNameDocument,
} from '../../../../_generated_/types'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0]
  return pathWithoutQuery.split('/').filter((v) => v.length > 0)
}

export default function Breadcrumbs(): JSX.Element {
  const router = useRouter()
  const client = useApolloClient()

  const staticPathTextGenerator = useCallback((subpath: string) => {
    return (
      {
        products: 'Produits',
        import: 'Importer',
        'sub-products': 'Sous-Produits',
        categories: 'Catégories',
        stats: 'Analyse de données',
        calculator: 'Calculateur',
      }[subpath] || capitalizeFirstLetter(subpath)
    )
  }, [])

  const dynamicPathTextGenerator = useCallback(
    (param: string, query: ParsedUrlQuery) => {
      return {
        productId: async () => await getProductTitle(query.productId, client),
        subProductId: async () =>
          await getProductTitle(query.subProductId, client),
        shopId: async () => await getShopName(query.shopId, client),
      }[param]
    },
    [client]
  )

  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath)
      const pathnameNestedRoutes = generatePathParts(router.pathname)

      const crumblist = asPathNestedRoutes.map(
        (subpath: string, index: number) => {
          const param = pathnameNestedRoutes[index]
            .replace('[', '')
            .replace(']', '')

          const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/')
          return {
            href,
            textGenerator: dynamicPathTextGenerator(param, router.query),
            text: staticPathTextGenerator(subpath),
          }
        }
      )

      return [
        { href: '/', text: 'Accueil', textGenerator: undefined },
        ...crumblist,
      ]
    },
    [
      router.asPath,
      router.pathname,
      router.query,
      staticPathTextGenerator,
      dynamicPathTextGenerator,
    ]
  )

  return (
    <div className="hidden items-center text-sm sm:flex">
      <ul>
        {breadcrumbs.length > 1
          ? breadcrumbs.map((crumb, index) => (
              <Crumb
                defaultText={crumb.text}
                textGenerator={crumb.textGenerator}
                href={crumb.href}
                last={index === breadcrumbs.length - 1}
                key={index}
              />
            ))
          : null}
      </ul>
    </div>
  )
}

function Crumb(props: {
  defaultText: string
  textGenerator?: () => Promise<string>
  href: string
  last: boolean
}) {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (props.textGenerator == undefined) {
      setText(props.defaultText)
      return
    }
    fetchCustomText()

    async function fetchCustomText() {
      try {
        if (props.textGenerator) {
          const finalText = await props.textGenerator()
          setText(finalText)
        }
      } catch (error) {
        setText(props.defaultText)
      }
    }
  }, [props, text])

  if (props.last) {
    return (
      <li className="btn btn-ghost btn-sm no-animation !h-6 !min-h-0 cursor-default px-2 normal-case hover:bg-transparent ">
        {text}
      </li>
    )
  }

  return (
    <>
      <li className="btn btn-ghost btn-sm !h-6 !min-h-0 px-2 normal-case">
        <Link href={props.href}>
          <a>{text}</a>
        </Link>
      </li>
      <span className="cursor-default px-0.5 text-sm">/</span>
    </>
  )
}

async function getProductTitle(
  productId: string | string[] | undefined,
  client: any
) {
  if (productId != undefined) {
    const response = await client.query({
      query: ProductInputTitleDocument,
      variables: { productInputId: productId },
    })

    return response.data.productInput.title
  }
}

async function getShopName(shopId: string | string[] | undefined, client: any) {
  if (shopId != undefined) {
    const response = await client.query({
      query: ShopNameDocument,
      variables: { shopId: shopId },
    })

    return response.data.shop.name
  }
}
