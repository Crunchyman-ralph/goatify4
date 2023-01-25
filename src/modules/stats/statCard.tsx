import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useShopifyqlResponseQuery } from '../../../_generated_/types'
import { ErrorAlert } from '../../common/components/alerts/errorAlert'
import { Loader } from '../../common/components/loader'

export function StatCard(props: {
  cardTitle: string
  shopId: string
  largeValueDefaultValue?: string
  largeValueSymbol?: string
  largeValueQuery?: string
  parseLargeValue?: (value: (string | null)[][]) => string
  chartQuery1?: string
  chartQuery2?: string
  chartValueRowIndex?: number
  chartLegendLabel?: string
  chartLegendLabel2?: string
  chartTitle?: string
  tableQuery?: string
  parseChartValue?: (value: string | null) => number
  computedLargeValueQuery1?: string
  computedLargeValueQuery2?: string
  computedLargeValueFunction?: (
    value1: (string | null)[][],
    value2: (string | null)[][]
  ) => string
}): JSX.Element {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const {
    data: largeValueData,
    loading: largeValueLoading,
    error: largeValueError,
  } = useShopifyqlResponseQuery({
    variables: {
      shopId: props.shopId,
      query: props.largeValueQuery ?? '',
    },
    fetchPolicy: 'network-only',
    skip: !props.largeValueQuery,
  })

  const {
    data: chartQuery1Data,
    loading: chartQuery1Loading,
    error: chartQuery1Error,
  } = useShopifyqlResponseQuery({
    variables: {
      shopId: props.shopId,
      query: props.chartQuery1 ?? '',
    },
    fetchPolicy: 'network-only',
    skip: !props.chartQuery1,
  })

  const {
    data: chartQuery2Data,
    loading: chartQuery2Loading,
    error: chartQuery2Error,
  } = useShopifyqlResponseQuery({
    variables: {
      shopId: props.shopId,
      query: props.chartQuery2 ?? '',
    },
    fetchPolicy: 'network-only',
    skip: !props.chartQuery2,
  })

  const {
    data: tableQueryData,
    loading: tableQueryLoading,
    error: tableQueryError,
  } = useShopifyqlResponseQuery({
    variables: {
      shopId: props.shopId,
      query: props.tableQuery ?? '',
    },
    fetchPolicy: 'network-only',
    skip: !props.tableQuery,
  })

  const {
    data: computedLargeValueQuery1Data,
    loading: computedLargeValueQuery1Loading,
    error: computedLargeValueQuery1Error,
  } = useShopifyqlResponseQuery({
    variables: {
      shopId: props.shopId,
      query: props.computedLargeValueQuery1 ?? '',
    },
    fetchPolicy: 'network-only',
    skip: !props.computedLargeValueQuery1,
  })

  const {
    data: computedLargeValueQuery2Data,
    loading: computedLargeValueQuery2Loading,
    error: computedLargeValueQuery2Error,
  } = useShopifyqlResponseQuery({
    variables: {
      shopId: props.shopId,
      query: props.computedLargeValueQuery2 ?? '',
    },
    fetchPolicy: 'network-only',
    skip: !props.computedLargeValueQuery2,
  })

  const [computedLargeValue, setComputedLargeValue] = useState<string>('')

  useEffect(() => {
    if (!computedLargeValueQuery1Loading && !computedLargeValueQuery2Loading) {
      if (
        computedLargeValueQuery1Data?.shopifyqlResponse?.tableData?.rowData &&
        computedLargeValueQuery2Data?.shopifyqlResponse?.tableData?.rowData
      ) {
        const computedValue = props.computedLargeValueFunction
          ? props.computedLargeValueFunction(
              computedLargeValueQuery1Data?.shopifyqlResponse?.tableData
                ?.rowData,
              computedLargeValueQuery2Data?.shopifyqlResponse?.tableData
                ?.rowData
            )
          : ''

        setComputedLargeValue(computedValue)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedLargeValueQuery1Loading, computedLargeValueQuery2Loading])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: props.chartLegendLabel ? true : false,
      },
      title: {
        position: 'top' as const,
        align: 'start' as const,
        display: props.chartTitle ? true : false,
        text: props.chartTitle,
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  }

  const [chartData, setChartData] = useState<{
    labels: string[]
    datasets: {
      data: number[] | null
      label?: string
      borderColor?: string
      backgroundColor?: string
    }[]
  }>({
    labels: [],
    datasets: [
      {
        data: null,
        label: props.chartLegendLabel,
        borderColor: '#5624F8',
      },
      {
        data: null,
        label: props.chartLegendLabel2,
        borderColor: '#03c2fc',
      },
    ],
  })

  useEffect(() => {
    if (!chartQuery1Loading) {
      const rowData = chartQuery1Data?.shopifyqlResponse?.tableData?.rowData
      if (rowData) {
        const labels = rowData.map((row) => parseChartLabel(row[0]))
        const data = rowData.map((row) =>
          props.parseChartValue
            ? props.parseChartValue(row[props.chartValueRowIndex ?? 1])
            : Number(row[props.chartValueRowIndex ?? 1])
        )

        let newDatasets = chartData.datasets

        newDatasets[0].data = data

        setChartData({
          labels,
          datasets: newDatasets,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartQuery1Loading])

  useEffect(() => {
    if (!chartQuery2Loading) {
      const rowData = chartQuery2Data?.shopifyqlResponse?.tableData?.rowData
      if (rowData) {
        const labels = rowData.map((row) => parseChartLabel(row[0]))
        const data = rowData.map((row) =>
          props.parseChartValue
            ? props.parseChartValue(row[props.chartValueRowIndex ?? 1])
            : Number(row[props.chartValueRowIndex ?? 1])
        )

        let newDatasets = chartData.datasets

        newDatasets[1].data = data

        setChartData({
          labels,
          datasets: newDatasets,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartQuery2Loading])

  return (
    <div className="card bg-base-100 shadow-xl" key={props.largeValueQuery}>
      <div className="card-body">
        <h2 className="card-title text-base font-normal underline decoration-gray-400 decoration-dashed underline-offset-4">
          {props.cardTitle}
        </h2>

        {props.shopId == '' ||
        largeValueLoading ||
        computedLargeValueQuery1Loading ||
        computedLargeValueQuery2Loading ||
        chartQuery1Loading ||
        chartQuery2Loading ||
        tableQueryLoading ? (
          <div className="flex items-center justify-center pt-4">
            <Loader />
          </div>
        ) : largeValueError ||
          computedLargeValueQuery1Error ||
          computedLargeValueQuery2Error ||
          chartQuery1Error ||
          chartQuery2Error ? (
          <div className="flex items-center justify-center pt-4">
            <ErrorAlert error={'Erreur lors de la récupération des données.'} />
          </div>
        ) : (props.largeValueQuery &&
            largeValueData?.shopifyqlResponse == null) ||
          (props.computedLargeValueQuery1 &&
            computedLargeValueQuery1Data?.shopifyqlResponse == null) ||
          (props.computedLargeValueQuery2 &&
            computedLargeValueQuery2Data?.shopifyqlResponse == null) ||
          (props.chartQuery1 && chartQuery1Data?.shopifyqlResponse == null) ||
          (props.chartQuery2 && chartQuery2Data?.shopifyqlResponse == null) ||
          (props.tableQuery && tableQueryData?.shopifyqlResponse == null) ? (
          <div className="flex items-center justify-center pt-4">
            <ErrorAlert
              error={
                "Erreur lors de la récupération des données, vérifiez que l'access token permet de récupérer les statistiques."
              }
            />
          </div>
        ) : (
          <>
            {props.largeValueQuery && (
              <p className="pt-2 text-3xl font-medium">
                {props.parseLargeValue
                  ? props.parseLargeValue(
                      largeValueData?.shopifyqlResponse?.tableData?.rowData ??
                        []
                    )
                  : largeValueData?.shopifyqlResponse?.tableData?.rowData}
                {props.largeValueSymbol ?? ''}
              </p>
            )}
            {props.computedLargeValueQuery1 &&
              props.computedLargeValueQuery2 && (
                <p className="pt-2 text-3xl font-medium">
                  {computedLargeValue}
                </p>
              )}
            {props.chartQuery1 &&
              !chartQuery1Loading &&
              !chartQuery1Error &&
              chartQuery1Data?.shopifyqlResponse?.tableData?.rowData != null &&
              !chartQuery2Loading && (
                <Line options={options} data={chartData} />
              )}
            {props.tableQuery && !tableQueryLoading && !tableQueryError && (
              <>
                {tableQueryData?.shopifyqlResponse?.tableData?.rowData
                  ?.length == 0 ? (
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Il n'y a pas eu de vente pendant cette période.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table-compact table w-full">
                      {/* <thead>
                    {tableQueryData?.shopifyqlResponse?.tableData?.columns?.map(
                      (column, index) => (
                        <th key={index}>{column.displayName}</th>
                      )
                    )}
                  </thead> */}
                      <tbody>
                        {tableQueryData?.shopifyqlResponse?.tableData?.rowData?.map(
                          (rowData, index) => (
                            <tr key={index}>
                              <td>{rowData[0]}</td>
                              <td>{rowData[1]}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function parseChartLabel(label: string | null): string {
  if (label == null) return ''

  // if the label is a date with time, remove the date part
  if (label.includes(':')) {
    return label.slice(-8)
  }

  return label
}
