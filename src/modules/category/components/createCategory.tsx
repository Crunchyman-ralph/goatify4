import { ApolloError } from '@apollo/client'
import { CodeIcon, PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import {
  CategoryCreateInput,
  useCategoryCreateMutation,
} from '../../../../_generated_/types'
import { ButtonSubmit } from '../../../common/components/buttons/buttonSubmit'
import { GoBackArrowWithContext } from '../../../common/components/goBackArrow/goBackArrowWithContext'
import CategoryContext from '../contexts/CategoryContextProvider'

export function CreateCategoryForm(): JSX.Element {
  const categoryContext = useContext(CategoryContext)
  const router = useRouter()

  const [categoryFormState, setCategoryFormState] =
    useState<CategoryCreateInput>({
      name: '',
    })

  const [createCategory] = useCategoryCreateMutation({
    variables: {
      data: {
        name: categoryFormState.name,
      },
    },
  })

  return (
    <>
      <GoBackArrowWithContext
        typeOfAction="Créer"
        context={categoryContext}
      ></GoBackArrowWithContext>
      <form
        className="form-control mt-5"
        onSubmit={async (e) => {
          try {
            e.preventDefault()
            const response = await createCategory()

            if (response.errors)
              throw new ApolloError({
                graphQLErrors: response.errors,
              })

            const message = `${categoryContext.modelName} ${categoryFormState.name} créé`
            toast.success(message)

            router.push('/categories')
          } catch (error) {
            toast.error((error as any).message)
          }
        }}
      >
        <div aria-label="name" className="form-control mb-2">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input
            className="input input-bordered max-w-sm"
            onChange={(e) =>
              setCategoryFormState({
                ...categoryFormState,
                name: e.target.value,
              })
            }
            required
            type="text"
          />
        </div>
        <ButtonSubmit
          label="Créer"
          className="mt-7 w-32"
          icon={<PlusIcon className="mr-2 h-5 w-5" />}
        />
      </form>

      {process.env.NODE_ENV == 'development' && (
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title flex items-center font-medium">
            <CodeIcon className="mr-2 h-5 w-5" />
            Query variables
          </div>
          <div className="collapse-content">
            <div className="mockup-code">
              <pre>
                <code>{JSON.stringify(categoryFormState, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
