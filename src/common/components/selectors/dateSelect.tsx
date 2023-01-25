import { CalendarIcon } from '@heroicons/react/outline'
import React, { Dispatch, SetStateAction, useState } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DateSelect(props: {
  dateRange: { start: Date; end: Date }
  setDateRange: Dispatch<
    SetStateAction<{
      start: Date
      end: Date
    }>
  >
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState(props.dateRange.start)
  const [endDate, setEndDate] = useState<Date>(props.dateRange.end)
  const [selectedDateRange, setSelectedDateRange] = useState('today')
  const onChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const closeDatePicker = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  function handleDateRangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDateRange(e.target.value)

    switch (e.target.value) {
      case 'today':
        setStartDate(new Date())
        setEndDate(new Date())
        break
      case 'yesterday':
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 1)))
        setEndDate(new Date(new Date().setDate(new Date().getDate() - 1)))
        break
      case 'last 7 days':
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 7)))
        setEndDate(new Date())
        break
      case 'last 30 days':
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)))
        setEndDate(new Date())
        break
      case 'last 90 days':
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 90)))
        setEndDate(new Date())
        break
      case 'last month':
        setStartDate(
          new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
        )
        setEndDate(new Date(new Date().getFullYear(), new Date().getMonth(), 0))
        break
      case 'last year':
        setStartDate(new Date(new Date().getFullYear() - 1, 1, 1))
        setEndDate(new Date(new Date().getFullYear(), 0, 0))
        break
      case 'week to date':
        const d = new Date()
        var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
        setStartDate(new Date(d.setDate(diff)))
        setEndDate(new Date())
        break
      case 'current month':
        setStartDate(
          new Date(
            new Date(
              new Date().getFullYear() +
                '-' +
                (new Date().getMonth() + 1) +
                '-01'
            )
          )
        )
        setEndDate(new Date())
        break
      case 'current year':
        setStartDate(new Date(new Date().getFullYear() + '-01-01'))
        setEndDate(new Date())
        break

      default:
        setStartDate(new Date())
        setEndDate(new Date())
        break
    }
  }

  const CustomContainer = ({
    className,
    children,
  }: {
    className: string
    children: React.ReactNode
  }) => {
    return (
      <div className="rounded-btn absolute z-50 mt-2 bg-base-200 p-4 shadow-xl ">
        <div className="flex flex-col sm:flex-row">
          <CalendarContainer className={className}>
            <div className="relative">{children}</div>
          </CalendarContainer>
          <div className="divider my-0 sm:divider-horizontal" />

          <section className="flex flex-col gap-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Période</span>
              </label>
              <select
                onChange={(e) => handleDateRangeSelect(e)}
                className="select select-bordered"
                value={selectedDateRange}
              >
                <option value="today">Aujourd'hui</option>
                <option value="yesterday">Hier</option>
                <option value="last 7 days">7 derniers jours</option>
                <option value="last 30 days">30 derniers jours</option>
                <option value="last 90 days">90 derniers jours</option>
                <option value="last month">Mois dernier</option>
                <option value="last year">An dernier</option>
                <option value="week to date">Cette semaine à ce jour</option>
                <option value="current month">Mois actuel</option>
                <option value="current year">Année à ce jour</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">À partir du</span>
                </label>
                <input
                  defaultValue={startDate ? startDate.toLocaleDateString() : ''}
                  type="text"
                  onBlur={(e) => {
                    var dateParts = e.target.value.split('/')
                    const newDate = new Date(
                      Number(dateParts[2]),
                      Number(dateParts[1]) - 1,
                      Number(dateParts[0])
                    )
                    if (newDate && !isNaN(newDate.getTime())) {
                      setStartDate(newDate)
                    }
                  }}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Jusqu'au</span>
                </label>
                <input
                  defaultValue={endDate ? endDate.toLocaleDateString() : ''}
                  onBlur={(e) => {
                    var dateParts = e.target.value.split('/')
                    const newDate = new Date(
                      Number(dateParts[2]),
                      Number(dateParts[1]) - 1,
                      Number(dateParts[0])
                    )

                    if (
                      newDate &&
                      !isNaN(newDate.getTime()) &&
                      newDate >= startDate
                    ) {
                      setEndDate(newDate)
                    }
                  }}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </section>
        </div>
        <div className="divider my-2" />
        <footer className="flex w-full justify-end gap-2">
          <button className="btn btn-sm" onClick={closeDatePicker}>
            Fermer
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              props.setDateRange({
                start: startDate,
                end: endDate ? endDate : startDate,
              })
              setIsOpen(!isOpen)
            }}
          >
            Appliquer
          </button>
        </footer>
      </div>
    )
  }

  return (
    <div className="ml-4 mb-5">
      <button className="btn btn-sm" onClick={closeDatePicker}>
        <CalendarIcon className="mr-2 h-5 w-5" />
        {props.dateRange.start.toLocaleDateString()}
        {props.dateRange.start.toDateString() !=
        props.dateRange.end.toDateString()
          ? ` - ${props.dateRange.end.toLocaleDateString()}`
          : ''}
      </button>
      {isOpen && (
        <DatePicker
          inline
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          className="input input-bordered max-w-xs cursor-pointer"
          locale={locale}
          dateFormat="dd-MM-yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          selectsRange
          dropdownMode="select"
          shouldCloseOnSelect={false}
          calendarContainer={CustomContainer}
          disabledKeyboardNavigation
          calendarStartDay={1}
          excludeDateIntervals={[
            { start: new Date(), end: new Date(9999, 11) },
          ]}
        />
      )}
    </div>
  )
}

const locale: Locale = {
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
    ordinalNumber(...args) {
      return args[0]
    },
    era(...args) {
      return args[0]
    },
    quarter(...args) {
      return args[0]
    },
    dayPeriod(...args) {
      return args[0]
    },
  },
  formatLong: {
    date: () => 'dd/mm/yyyy',
    time: () => 'HH:mm',
    dateTime: () => 'dd/mm/yyyy HH:mm',
  },
}

const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]
