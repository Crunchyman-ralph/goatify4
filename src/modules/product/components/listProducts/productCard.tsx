import { useRouter } from 'next/router'
import { ProductInput } from '../../../../../_generated_/types'
import { htmlDescriptionToText } from '../../../../common/functions/htmlDescriptionToText'

export function ProductCard(props: { product: ProductInput }): JSX.Element {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push(`products/${props.product.id_}`)
      }}
      // eslint-disable-next-line prettier/prettier
      className="card card-compact cursor-pointer bg-base-100 transition-all duration-200 hover:-translate-y-1 hover:bg-base-200"
      key={props.product.id_}
    >
      <div className="card-image mx-4 mt-4 overflow-hidden rounded-lg bg-base-200">
        <figure
          className="h-36 bg-cover bg-center bg-no-repeat dark:brightness-75"
          style={{
            backgroundImage: `url(${
              props.product.images
                ? (props.product?.images[0]?.src as string)
                : ''
            })`,
          }}
        />
      </div>

      <div className="card-body">
        <h2 className="card-title">{props.product.title}</h2>
        <p>
          {props.product.descriptionHtml &&
            htmlDescriptionToText(props.product.descriptionHtml || '', 60)}
        </p>
      </div>
    </div>
  )
}
