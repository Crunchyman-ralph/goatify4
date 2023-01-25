import { CalculatorIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import cuid from 'cuid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  useCalculatorFieldsQuery,
  useCalculatorFieldsUpdateOrCreateMutation,
} from '../../../../_generated_/types'
import { GoBackArrowWithLabel } from '../../../common/components/goBackArrow/goBackArrowWithLabel'
import { CalculatorField } from '../types/CalculatorField'
import { AvailableCurrencies } from '../types/Currency'
import { ModalCreateField } from './modals/modalCreateField'

export function Calculator(props: { productInputId?: string }): JSX.Element {
  const [fields, setFields] = useState<CalculatorField[]>([
    {
      id: cuid(),
      order: 0,
      type: 'income',
      name: 'itemSellingPrice',
      label: 'Prix de vente',
      operation: 'add',
      value: 0,
      currency: AvailableCurrencies.usd.key,
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 1,
      type: 'income',
      name: 'shippingCharge',
      label: "Frais d'expédition",
      operation: 'add',
      value: 0,
      currency: AvailableCurrencies.usd.key,
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 2,
      type: 'expense',
      name: 'itemCost',
      label: "Prix d'achat",
      operation: 'add',
      value: 0,
      currency: AvailableCurrencies.usd.key,
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 3,
      type: 'expense',
      name: 'shippingCost',
      label: "Frais d'expédition",
      operation: 'add',
      value: 0,
      currency: AvailableCurrencies.usd.key,
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 4,
      type: 'expense',
      name: 'transactionCostPercent',
      label: 'Pourcentage',
      operation: 'percent',
      value: 0,
      group: 'Coûts de transaction',
      groupDetail: 'e.g. Frais CC ou PayPal',
      groupOrder: 'start',
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 5,
      type: 'expense',
      name: 'transactionCostFixed',
      label: 'Fixe',
      operation: 'add',
      value: 0,
      group: 'Coûts de transaction',
      groupDetail: 'e.g. Frais CC ou PayPal',
      groupOrder: 'end',
      currency: AvailableCurrencies.usd.key,
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 6,
      type: 'expense',
      name: 'sellingCostPercent',
      label: 'Pourcentage',
      operation: 'percent',
      value: 0,
      group: 'Frais de vente',
      groupDetail: 'e.g. Frais Shopify ou Amazon',
      groupOrder: 'start',
      canBeDeleted: false,
    },
    {
      id: cuid(),
      order: 7,
      type: 'expense',
      name: 'sellingCostFixed',
      label: 'Fixe',
      operation: 'add',
      value: 0,
      group: 'Frais de vente',
      groupDetail: 'e.g. Frais Shopify ou Amazon',
      groupOrder: 'end',
      currency: AvailableCurrencies.usd.key,
      canBeDeleted: false,
    },
  ])

  const [calculatorFieldUpdateOrCreate] =
    useCalculatorFieldsUpdateOrCreateMutation()

  const { loading: calculatorFieldsLoading, data: calculatorFieldsData } =
    useCalculatorFieldsQuery({
      variables: {
        productInputId: props.productInputId,
      },
    })

  const [initialLoad, setInitialLoad] = useState(false)

  useEffect(() => {
    if (
      !calculatorFieldsLoading &&
      calculatorFieldsData?.calculatorFields.nodes != undefined &&
      calculatorFieldsData?.calculatorFields.nodes.length > 0
    ) {
      setFields(calculatorFieldsData.calculatorFields.nodes)
      setInitialLoad(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatorFieldsLoading])

  // Calculate the results on initial load
  useEffect(() => {
    if (
      !calculatorFieldsLoading &&
      calculatorFieldsData != undefined &&
      props.productInputId != undefined
    ) {
      calculate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad])

  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalExpense, setTotalExpense] = useState<number>(0)

  const [showNewIncomeModal, setShowNewIncomeModal] = useState(false)
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false)

  const [resultDisplayCurrency, setResultDisplayCurrency] = useState(
    AvailableCurrencies.usd
  )

  useEffect(() => {
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDisplayCurrency])

  async function calculate() {
    const income = await calculateField(
      fields.filter((f) => f.type === 'income')
    )
    const expense = await calculateField(
      fields.filter((f) => f.type === 'expense'),
      income
    )

    setTotalIncome(income)
    setTotalExpense(expense)

    async function calculateField(
      fields: CalculatorField[],
      income?: number
    ): Promise<number> {
      let result = 0

      for (const field of fields) {
        let value = field.value

        if (field.currency && field.currency !== resultDisplayCurrency.key) {
          // convert to displayCurrency using currency-api (https://github.com/fawazahmed0/currency-api#readme)
          const response = await fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${field.currency}/${resultDisplayCurrency.key}.json`
          )

          const data = await response.json()

          value = value * data[resultDisplayCurrency.key]
        }

        if (field.operation === 'add') result = result + value

        if (field.operation === 'percent') {
          if (income) {
            result = result + (income * value) / 100
          } else {
            result = result + (result * value) / 100
          }
        }
      }

      return result
    }
  }

  function removeField(id: string): void {
    setFields(fields.filter((f) => f.id !== id))
  }

  return (
    <>
      <div className="mb-10 flex flex-col space-y-3 space-x-6 sm:flex-row sm:items-center sm:space-y-0">
        <GoBackArrowWithLabel label="Calculateur" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          calculate()
          if (props.productInputId) {
            calculatorFieldUpdateOrCreate({
              variables: {
                productInputId: props.productInputId,
                data: fields,
              },
              onError: (error) => {
                toast.error('Erreur lors de la sauvegarde des données')
              },
            })
          }
        }}
        className="grid gap-4 xl:grid-cols-2"
      >
        <div className="flex flex-col gap-2">
          <h2 className="mb-2 text-2xl font-medium">Revenus</h2>

          {fields
            .filter((f) => f.type === 'income')
            .sort((a, b) => a.order - b.order)
            .map((field) => (
              <div key={field.id} className="form-control">
                <label className="input-group">
                  <span>
                    {field.label}
                    {field.operation === 'percent' && ' (%)'}
                  </span>
                  <input
                    required
                    type="number"
                    className="input input-bordered"
                    value={field.value}
                    min={0}
                    step=".01"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value)
                      setFields(
                        fields.map((f) =>
                          f.id === field.id ? { ...f, value } : f
                        )
                      )
                    }}
                  />
                  {field.operation === 'add' && (
                    <select
                      value={field.currency || AvailableCurrencies.usd.key}
                      className="select select-bordered"
                      onChange={(e) => {
                        const currency = e.target.value
                        setFields(
                          fields.map((f) =>
                            f.id === field.id ? { ...f, currency } : f
                          )
                        )
                      }}
                    >
                      <option disabled>Choisissez une devise</option>
                      {Object.keys(AvailableCurrencies).map((key) => (
                        <option key={key} value={key}>
                          {
                            AvailableCurrencies[
                              key as keyof typeof AvailableCurrencies
                            ].label
                          }{' '}
                          (
                          {
                            AvailableCurrencies[
                              key as keyof typeof AvailableCurrencies
                            ].symbol
                          }
                          )
                        </option>
                      ))}
                    </select>
                  )}
                  {field.canBeDeleted && (
                    <button
                      className="btn w-7 p-0"
                      onClick={() => removeField(field.id)}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  )}
                </label>
              </div>
            ))}
          <button
            type="button"
            className="link link-hover flex items-center"
            onClick={() => {
              setShowNewIncomeModal(!showNewIncomeModal)
            }}
          >
            <PlusIcon className="mr-1 h-5 w-5" />
            Ajouter un revenu
          </button>
          <strong className="mt-2 text-xl">
            Total : {isNaN(totalIncome) ? '0' : totalIncome.toFixed(2)}{' '}
            {resultDisplayCurrency.symbol}
          </strong>

          {showNewIncomeModal && (
            <ModalCreateField
              setFields={setFields}
              fieldType="income"
              setShowCreateModal={setShowNewIncomeModal}
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="divider xl:hidden" />

          <h2 className="mb-2 text-2xl font-medium">Dépenses</h2>

          {fields
            .filter((f) => f.type === 'expense')
            .sort((a, b) => a.order - b.order)
            .map((field) =>
              field.group && field.groupOrder === 'start' ? (
                <div key={field.id}>
                  <div className="text-lg font-bold">
                    {field.group}{' '}
                    <span className="text-sm font-light">
                      {field.groupDetail}
                    </span>
                  </div>
                  <div key={field.id} className="form-control">
                    <label className="input-group">
                      <span>
                        {field.label} {field.operation === 'percent' && ' (%)'}
                      </span>
                      <input
                        required
                        type="number"
                        className={`input input-bordered ${
                          field.group ? 'input-sm' : ''
                        }`}
                        value={field.value}
                        min={0}
                        step=".01"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          setFields(
                            fields.map((f) =>
                              f.id === field.id ? { ...f, value } : f
                            )
                          )
                        }}
                      />
                    </label>
                    <label>
                      <span className="text-xs">Et/Ou</span>
                    </label>
                  </div>
                </div>
              ) : field.group && field.groupOrder === 'end' ? (
                <div key={field.id} className="form-control">
                  <label className="input-group">
                    <span>
                      {field.label} {field.operation === 'percent' && ' (%)'}
                    </span>
                    <input
                      required
                      type="number"
                      className={`input input-bordered ${
                        field.group ? 'input-sm' : ''
                      }`}
                      value={field.value}
                      min={0}
                      step=".01"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        setFields(
                          fields.map((f) =>
                            f.id === field.id ? { ...f, value } : f
                          )
                        )
                      }}
                    />
                    {field.operation === 'add' && (
                      <select
                        defaultValue={
                          field.currency || AvailableCurrencies.usd.key
                        }
                        className="select select-bordered select-sm"
                        onChange={(e) => {
                          const currency = e.target.value
                          setFields(
                            fields.map((f) =>
                              f.id === field.id ? { ...f, currency } : f
                            )
                          )
                        }}
                      >
                        <option disabled>Choisissez une devise</option>
                        {Object.keys(AvailableCurrencies).map((key) => (
                          <option key={key} value={key}>
                            {
                              AvailableCurrencies[
                                key as keyof typeof AvailableCurrencies
                              ].label
                            }{' '}
                            (
                            {
                              AvailableCurrencies[
                                key as keyof typeof AvailableCurrencies
                              ].symbol
                            }
                            )
                          </option>
                        ))}
                      </select>
                    )}
                  </label>
                </div>
              ) : (
                <div key={field.id} className="form-control">
                  <label className="input-group">
                    <span>
                      {field.label} {field.operation === 'percent' && ' (%)'}
                    </span>
                    <input
                      required
                      type="number"
                      className="input input-bordered"
                      value={field.value}
                      min={0}
                      step=".01"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        setFields(
                          fields.map((f) =>
                            f.id === field.id ? { ...f, value } : f
                          )
                        )
                      }}
                    />
                    {field.operation === 'add' && (
                      <select
                        defaultValue={
                          field.currency || AvailableCurrencies.usd.key
                        }
                        className="select select-bordered"
                        onChange={(e) => {
                          const currency = e.target.value
                          setFields(
                            fields.map((f) =>
                              f.id === field.id ? { ...f, currency } : f
                            )
                          )
                        }}
                      >
                        <option disabled>Choisissez une devise</option>
                        {Object.keys(AvailableCurrencies).map((key) => (
                          <option key={key} value={key}>
                            {
                              AvailableCurrencies[
                                key as keyof typeof AvailableCurrencies
                              ].label
                            }{' '}
                            (
                            {
                              AvailableCurrencies[
                                key as keyof typeof AvailableCurrencies
                              ].symbol
                            }
                            )
                          </option>
                        ))}
                      </select>
                    )}
                    {field.canBeDeleted && (
                      <button
                        className="btn w-7 p-0"
                        onClick={() => removeField(field.id)}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    )}
                  </label>
                </div>
              )
            )}
          <button
            type="button"
            className="link link-hover flex items-center"
            onClick={() => {
              setShowNewExpenseModal(!showNewExpenseModal)
            }}
          >
            <PlusIcon className="mr-1 h-5 w-5" />
            Ajouter une dépense
          </button>
          <strong className="mt-2 text-xl">
            Total : {isNaN(totalExpense) ? '0' : totalExpense.toFixed(2)}{' '}
            {resultDisplayCurrency.symbol}
          </strong>

          {showNewExpenseModal && (
            <ModalCreateField
              setFields={setFields}
              fieldType="expense"
              setShowCreateModal={setShowNewExpenseModal}
            />
          )}
        </div>

        <div className="mt-4 flex flex-row justify-start gap-4">
          <button type="submit" className="btn btn-primary">
            <CalculatorIcon className="mr-2 h-5 w-5" /> Calculer
          </button>
          <div className="form-control">
            <div className="input-group">
              <span className="">Devise des résultats</span>
              <select
                className="select select-bordered"
                value={resultDisplayCurrency.key}
                onChange={(e) => {
                  setResultDisplayCurrency(
                    AvailableCurrencies[
                      e.target.value as keyof typeof AvailableCurrencies
                    ]
                  )
                }}
              >
                <option disabled>Choisissez une devise</option>
                {Object.keys(AvailableCurrencies).map((key) => (
                  <option key={key} value={key}>
                    {
                      AvailableCurrencies[
                        key as keyof typeof AvailableCurrencies
                      ].label
                    }{' '}
                    (
                    {
                      AvailableCurrencies[
                        key as keyof typeof AvailableCurrencies
                      ].symbol
                    }
                    )
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>

      <div className="divider mb-2" />

      <h2 className="mb-4 text-3xl font-medium">Résultats</h2>
      <div className="stats stats-vertical shadow lg:stats-horizontal">
        <div className="stat">
          <div className="stat-title">BEP</div>
          <div className="stat-value">
            {isNaN(totalIncome - totalExpense)
              ? '--'
              : (totalIncome - totalExpense).toFixed(2) +
                ' ' +
                resultDisplayCurrency.symbol}
          </div>
          <div className="stat-desc">Revenu Total - Dépense Total</div>
        </div>

        <div className="stat">
          <div className="stat-title">ROAS BE</div>
          <div className="stat-value">
            {isNaN(totalIncome / (totalIncome - totalExpense))
              ? '--'
              : (totalIncome / (totalIncome - totalExpense)).toFixed(2)}{' '}
          </div>
          <div className="stat-desc">Revenu Total / BEP</div>
        </div>

        <div className="stat">
          <div className="stat-title">% Margin</div>
          <div className="stat-value">
            {isNaN(((totalIncome - totalExpense) / totalIncome) * 100)
              ? '--'
              : (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(
                  0
                )}{' '}
            %
          </div>
          <div className="stat-desc">Profit / Revenu Total</div>
        </div>

        <div className="stat">
          <div className="stat-title">% Markup</div>
          <div className="stat-value">
            {isNaN(totalIncome / totalExpense - 1)
              ? '--'
              : (totalIncome / totalExpense - 1).toFixed(2)}
          </div>
          <div className="stat-desc">Revenu Total / Dépense Total - 1</div>
        </div>
      </div>
    </>
  )
}
