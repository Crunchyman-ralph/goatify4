import React from 'react'
import { Pagination } from '../../types/Pagination'

export function PaginationInfoAndNav(props: {
  pagination: Pagination
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
  fetchMore: any
}): JSX.Element {
  const numberOfPages = Math.ceil(
    props.pagination.total / props.pagination.take
  )

  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <div className="btn-group my-5">
      {props.pagination.skip === 0 ? (
        <button className="btn btn-disabled">«</button>
      ) : (
        <button
          className="btn"
          onClick={() => {
            const newSkip = props.pagination.skip - props.pagination.take
            props.setPagination({ ...props.pagination, skip: newSkip })
            setCurrentPage(currentPage - 1)
            props.fetchMore({
              variables: {
                skip: newSkip,
                take: props.pagination.take,
              },
            })
          }}
        >
          «
        </button>
      )}
      {numberOfPages <= 1
        ? null
        : [...Array(numberOfPages)].map((_, i) => (
            <button
              className={`btn ${currentPage === i + 1 ? 'btn-primary' : ''}`}
              key={i}
              onClick={() => {
                props.setPagination({
                  ...props.pagination,
                  skip: i * props.pagination.take,
                })
                setCurrentPage(i + 1)
                props.fetchMore({
                  variables: {
                    skip: i * props.pagination.take,
                    take: props.pagination.take,
                  },
                })
              }}
            >
              {i + 1}
            </button>
          ))}
      {props.pagination.skip + props.pagination.take <
      props.pagination.total ? (
        <button
          className="btn"
          onClick={() => {
            const newSkip = props.pagination.skip + props.pagination.take
            props.setPagination({ ...props.pagination, skip: newSkip })
            setCurrentPage(currentPage + 1)
            props.fetchMore({
              variables: {
                skip: newSkip,
                take: props.pagination.take,
              },
            })
          }}
        >
          »
        </button>
      ) : (
        <button className="btn btn-disabled">»</button>
      )}
    </div>
  )
}
