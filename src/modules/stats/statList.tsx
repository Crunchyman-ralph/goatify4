import { useEffect, useState } from 'react'
import { useShopsQuery } from '../../../_generated_/types'
import { ErrorAlert } from '../../common/components/alerts/errorAlert'
import { DateSelect } from '../../common/components/selectors/dateSelect'
import { StatCard } from './statCard'

export function StatList(): JSX.Element {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(localStorage.getItem('dateRangeStart') || new Date()),
    end: new Date(localStorage.getItem('dateRangeEnd') || new Date()),
  })

  const [selectedShopId, setSelectedShopId] = useState<string>(
    localStorage.getItem('selectedShopId') || ''
  )

  // update local storage items when date range or selected shop id changes
  useEffect(() => {
    localStorage.setItem(
      'dateRangeStart',
      dateRange.start.toISOString().split('T')[0]
    )
    localStorage.setItem(
      'dateRangeEnd',
      dateRange.end.toISOString().split('T')[0]
    )
    localStorage.setItem('selectedShopId', selectedShopId)
  }, [selectedShopId, dateRange])

  const {
    data: shopsData,
    loading: shopsLoading,
    error: shopsError,
  } = useShopsQuery({
    fetchPolicy: 'cache-and-network',
  })

  // select the first shop if there is no selected shop
  useEffect(() => {
    if (!shopsLoading && selectedShopId === '') {
      setSelectedShopId(
        shopsData?.shops?.nodes && shopsData?.shops?.nodes[0]
          ? shopsData?.shops?.nodes[0].id_
          : ''
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopsLoading])

  if (shopsError) {
    return <ErrorAlert showIcon showRefreshButton apolloError={shopsError} />
  } else
    return (
      <>
        <div className="mx-4 mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-md font-medium sm:text-xl md:text-2xl xl:text-3xl ">
            Analyse de données du shop
          </h1>
          <select
            defaultValue={selectedShopId}
            onChange={(e) => {
              setSelectedShopId(e.target.value)
            }}
            className="select select-bordered"
          >
            <option disabled>Choisissez un shop</option>
            {shopsData &&
              shopsData.shops.nodes?.map((shop) => (
                <option value={shop.id_} key={shop.id_}>
                  {shop.name}
                </option>
              ))}
          </select>
        </div>

        <DateSelect dateRange={dateRange} setDateRange={setDateRange} />

        <div className="mx-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            cardTitle="Ventes totales"
            largeValueDefaultValue={'$0.00'}
            shopId={selectedShopId}
            largeValueQuery={`FROM sales SHOW total_sales SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            parseLargeValue={(value: (string | null)[][]) => {
              if (value.length == 0) return '$0.00'
              return value[0][0] || '$0.00'
            }}
            chartTitle="Historique du nombre de ventes."
            chartQuery1={`FROM sales SHOW total_sales GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0
              // Remove the currency sign of the value, ex: $1.00 -> 1.00
              return parseFloat(value.slice(1))
            }}
          />
          <StatCard
            cardTitle="Taux de clients existants"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
            computedLargeValueQuery1={`FROM sales SHOW count(customer_id) WHERE (customer_type = 'Returning' AND sale_kind = 'order' AND sale_line_type = 'product') SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            computedLargeValueQuery2={`FROM sales SHOW count(customer_id) WHERE (sale_kind = 'order' AND sale_line_type = 'product') SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            computedLargeValueFunction={(value1, value2) => {
              if (value1.length == 0 && value2.length == 0) return '0%'

              const returningCustomers =
                value1[0] != undefined && value1[0][0] != undefined
                  ? Number(value1[0][0])
                  : 0
              const totalCustomers =
                value2[0][0] != undefined
                  ? parseFloat(value2[0][0].replace(',', ''))
                  : 0

              if (returningCustomers == 0 && totalCustomers == 0) return '0%'

              const computedValue = (returningCustomers / totalCustomers) * 100

              return computedValue.toFixed(2) + '%'
            }}
            chartQuery1={`FROM sales SHOW count(customer_id) AS customers GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } WHERE (customer_type = 'First-time' AND sale_kind = 'order' AND sale_line_type = 'product') SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            chartQuery2={`FROM sales SHOW count(customer_id) AS customers GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } WHERE (customer_type = 'Returning' AND sale_kind = 'order' AND sale_line_type = 'product') SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            chartLegendLabel={'1ère fois'}
            chartLegendLabel2={'Récurrent'}
            chartTitle={'Historique de nombre de clients.'}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0
              return parseInt(value)
            }}
          />
          <StatCard
            cardTitle="Taux de conversion"
            largeValueDefaultValue={'0%'}
            shopId={selectedShopId}
            largeValueQuery={`FROM products SHOW view_to_purchase_rate SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            parseLargeValue={(value: (string | null)[][]) => {
              if (value.length == 0) return '0%'
              return value[0][0] || '0%'
            }}
            chartTitle="Historique du taux de sessions converties. (%)"
            chartQuery1={`FROM products SHOW view_to_purchase_rate GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0
              return parseFloat(value)
            }}
          />
          <StatCard
            cardTitle="Nombre de sessions"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
            largeValueQuery={`FROM products SHOW SUM(view_sessions) SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            chartTitle="Historique du nombre de sessions."
            chartQuery1={`FROM products SHOW SUM(view_sessions) GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
          />
          <StatCard
            cardTitle="Taux d'ajout au panier"
            largeValueDefaultValue={'0%'}
            shopId={selectedShopId}
            largeValueQuery={`FROM products SHOW view_to_cart_rate SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            parseLargeValue={(value: (string | null)[][]) => {
              if (value.length == 0) return '0%'
              return value[0][0] || '0%'
            }}
            chartTitle="Historique du taux d'ajout au panier. (%)"
            chartQuery1={`FROM products SHOW view_to_cart_rate GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0

              return parseFloat(value.slice(0, -1))
            }}
          />
          <StatCard
            cardTitle="Taux d'atteinte de l'étape de paiement"
            largeValueDefaultValue={'0%'}
            largeValueSymbol={'%'}
            shopId={selectedShopId}
            largeValueQuery={`FROM products SHOW SUM(checkout_sessions)/SUM(view_sessions) * 100 SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            parseLargeValue={(value: (string | null)[][]) => {
              if (value.length == 0) return '0%'
              return value[0][0] || '0%'
            }}
            chartTitle="Historique du taux de sessions qui ont atteint l'étape de paiement. (%)"
            chartQuery1={`FROM products SHOW SUM(checkout_sessions)/SUM(view_sessions) * 100 GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0
              return parseFloat(value)
            }}
          />
          <StatCard
            cardTitle="Valeur moyenne des commandes"
            largeValueDefaultValue={'0'}
            parseLargeValue={(value: (string | null)[][]) => {
              if (value.length == 0) return '$0.00'
              return value[0][0] || '$0.00'
            }}
            shopId={selectedShopId}
            largeValueQuery={`FROM sales SHOW average_order_value SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            chartTitle="Historique de la valeur des commandes."
            chartQuery1={`FROM sales SHOW average_order_value GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0
              // Remove the currency sign of the value, ex: $1.00 -> 1.00
              return parseFloat(value.slice(1))
            }}
          />
          <StatCard
            cardTitle="Nombre total de commandes"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
            largeValueQuery={`FROM sales SHOW orders SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            chartTitle="Historique du nombre de commandes."
            chartQuery1={`FROM sales SHOW orders GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } SINCE ${formatDate(dateRange.start)} UNTIL ${formatDate(
              dateRange.end
            )}`}
          />
          <StatCard
            cardTitle="Produits les plus performants (selon les unités vendues)"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
            tableQuery={`FROM sales SHOW net_quantity GROUP BY product_title WHERE sale_line_type = 'product' SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(
              dateRange.end
            )} ORDER BY net_quantity DESC LIMIT 7`}
          />
          {/* <StatCard
            cardTitle="Visites selon la source de trafic"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
          /> */}
          {/* <StatCard
            cardTitle="Visites par emplacement"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
          /> */}
          {/* <StatCard
            cardTitle="Visites par type d’appareil"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
          /> */}
          {/* <StatCard
            cardTitle="Visites selon la source sociale"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
          /> */}
          <StatCard
            cardTitle="Ventes selon la source de trafic"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
            tableQuery={`FROM sales SHOW orders GROUP BY referrer_source SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)} ORDER BY orders DESC LIMIT 7`}
          />
          <StatCard
            cardTitle="Ventes selon la source sociale"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
            tableQuery={`FROM sales SHOW orders GROUP BY referrer_name WHERE referrer_source = 'Social' SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)} ORDER BY orders DESC LIMIT 7`}
          />
          {/* <StatCard
            cardTitle="Meilleures sources référentes selon les visites"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
          /> */}
          {/* <StatCard
            cardTitle="Principales pages de destination selon les visites"
            largeValueDefaultValue={'0'}
            shopId={selectedShopId}
          /> */}
          <StatCard
            cardTitle="Ventes attribuées au marketing"
            largeValueDefaultValue={'0'}
            parseLargeValue={(value: (string | null)[][]) => {
              if (value.length == 0) return '$0.00'
              return value[0][0] || '$0.00'
            }}
            shopId={selectedShopId}
            largeValueQuery={`FROM sales SHOW total_sales WHERE ((utm_campaign_name != NULL)) SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            chartTitle="Historique du nombre de ventes attribuées au marketing."
            chartQuery1={`FROM sales SHOW total_sales GROUP BY ${
              dateRange.start.toDateString() == dateRange.end?.toDateString()
                ? 'hour'
                : 'day'
            } WHERE ((utm_campaign_name != NULL)) SINCE ${formatDate(
              dateRange.start
            )} UNTIL ${formatDate(dateRange.end)}`}
            parseChartValue={(value: string | null) => {
              if (value == null) return 0
              // Remove the currency sign of the value, ex: $1.00 -> 1.00
              return parseFloat(value.slice(1))
            }}
          />
        </div>
      </>
    )
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${addLeadingZeros(month, 2)}-${addLeadingZeros(day, 2)}`
}

const addLeadingZeros = (num: number, places: number) =>
  String(num).padStart(places, '0')
