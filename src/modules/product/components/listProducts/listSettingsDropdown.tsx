import { ApolloQueryResult } from '@apollo/client'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import { Dispatch, SetStateAction } from 'react'
import { Exact, InputMaybe } from '../../../../../_generated_/types'
import { Pagination } from '../../../../common/types/Pagination'
import { ListSettings } from '../../types/ListSettings'

export function ListSettingsDropDown(props: {
  listSettings: ListSettings
  setListSettings: Dispatch<SetStateAction<ListSettings>>
  pagination: Pagination
  setPagination: Dispatch<SetStateAction<Pagination>>
  refetchProducts: (
    variables?:
      | Partial<
          Exact<{
            skip?: InputMaybe<number> | undefined
            take?: InputMaybe<number> | undefined
            includeSubProducts?: InputMaybe<boolean> | undefined
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<any>>
}): JSX.Element {
  return (
    <div className="dropdown dropdown-end !mt-0" tabIndex={0}>
      <button
        className="btn btn-ghost px-2 md:px-4"
        aria-label="listSettingsDropDown"
      >
        <AdjustmentsIcon className="h-6 w-6" />
      </button>
      <div
        className="dropdown-content menu rounded-box w-72 bg-base-200 p-2 shadow-xl"
        tabIndex={0}
      >
        <li>
          <select
            value={props.listSettings.nbrOfProductsPerPage}
            className="select select-bordered select-sm mb-2 py-0 font-normal"
            onChange={(e) => {
              props.setListSettings({
                ...props.listSettings,
                nbrOfProductsPerPage: parseInt(e.target.value),
              })
              props.setPagination({
                ...props.pagination,
                take: props.listSettings.nbrOfProductsPerPage,
              })
              props.refetchProducts()
            }}
          >
            <option value={10}>Produits par page: 10</option>
            <option value={15}>Produits par page: 15</option>
            <option value={20}>Produits par page: 20</option>
            <option value={30}>Produits par page: 30</option>
            <option value={30}>Produits par page: 40</option>
          </select>
        </li>
        <li>
          <label className="label justify-start space-x-3">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={props.listSettings.showSubProducts}
              onChange={(e) => {
                props.setListSettings({
                  ...props.listSettings,
                  showSubProducts: e.target.checked,
                })
                props.setPagination({
                  ...props.pagination,
                  skip: 0,
                  take: props.listSettings.nbrOfProductsPerPage,
                })
                props.refetchProducts()
              }}
            />
            <span className="label-text">Afficher les sous-produits</span>
          </label>
        </li>
      </div>
    </div>
  )
}
