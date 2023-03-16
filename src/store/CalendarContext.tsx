import * as React from 'react'
import { useState } from 'react'

const examples: string[] = [
  'AE Business Meeting',
  'Holiday',
  'Quarter End',
  'Casual Day',
  'Pool party',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest'
]

const CalendarContext = React.createContext<CalendarStoreValue | undefined>(
  undefined
)

interface CalendarStoreValue {
  currentDate: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  isYearView: boolean
  changeView: (date?: Date) => void
  dayClickCount: number
  selectedDate: undefined | Date
  toggleBarOnDateClick: (num: number, date?: any) => void
  selected: string[]
  events: string[]
  handleChange: (event: { target: { value: any } }) => void
  handleNone: () => void
  handleAll: () => void
}

export const useCalendarContext = () => {
  const calendarContext = React.useContext(CalendarContext)
  if (calendarContext === undefined) {
    throw new Error('useCalendarContext must be called inside a CalendarStore')
  }
  return calendarContext
}

const CalendarStore = ({ children }: any) => {
  const [currentDate, setDate] = useState(new Date())
  const [yearView, setYearView] = useState(false)
  const [dayClickCount, setDayClickCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState<undefined | Date>(undefined)
  const [selected, setSelected] = React.useState<string[]>([])

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value
    const s: string = value
    const list = [...selected]
    const index = list.indexOf(s)
    index === -1 ? list.push(value) : list.splice(index, 1)
    setSelected(list)
  }

  const handleAll = () => {
    setSelected(examples)
    return
  }

  const handleNone = () => {
    setSelected([])
    return
  }

  const changeView = (date?: Date) => {
    setYearView(!yearView)
    if (yearView && date !== undefined) {
      setDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  const toggleBarOnDateClick = (num: number, date?: any) => {
    num === 0 ? setDayClickCount(0) : setDayClickCount(dayClickCount + 1)
    setSelectedDate(date)
  }

  const calendarStoreValues: CalendarStoreValue = {
    currentDate: currentDate,
    setDate: setDate,
    isYearView: yearView,
    changeView: changeView,
    dayClickCount: dayClickCount,
    selectedDate: selectedDate,
    toggleBarOnDateClick: toggleBarOnDateClick,
    selected: selected,
    events: examples,
    handleChange: handleChange,
    handleNone: handleNone,
    handleAll: handleAll
  }

  return (
    <CalendarContext.Provider value={calendarStoreValues}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarStore
