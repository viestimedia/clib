import { Datepicker } from './components'
import { CSSModule } from './components/CSSModule'

import { useState } from 'react'
import { add, sub } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { useHash } from 'react-use'
// import { Datepicker } from './components/-picker';

const oneWeekLater = add(new Date(), { days: 7 })
const oneWeekBefore = sub(new Date(), { days: 7 })

function App() {
  // react-router would be a little overkill for this use
  const [_route, setRoute] = useHash()
  const route = _route || '#datepicker'

  console.log('route', route)

  return (
    <>
      <AppNav setRoute={setRoute} />

      {route === '#datepicker' && <DatepickerRoute />}

      <CSSModule />
    </>
  )
}

function AppNav({ setRoute }: { setRoute: (v: string) => void }) {
  return (
    <nav className="my-4">
      <ul className="flex justify-center gap-2">
        <li>
          <a href="#datepicker" onClick={() => setRoute('datepicker')}>
            Datepicker
          </a>
        </li>

        <li>
          <a href="#somethingelse" onClick={() => setRoute('somethingelse')}>
            Something else
          </a>
        </li>
      </ul>
    </nav>
  )
}

function DatepickerRoute() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const [multipleSelected, setMultipleSelected] = useState<Array<Date> | undefined>([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  return (
    <main className="w-full mx-auto px-3 py-6 bg-stone-300">
      <div className="flex flex-col items-center xl:flex-row xl:flex-wrap xl:justify-around gap-12">
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">Single</h2>
          <div>
            <Datepicker mode="single" selected={selected} onSelect={setSelected} />
          </div>
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">Multiple</h2>
          <Datepicker mode="multiple" selected={multipleSelected} onSelect={setMultipleSelected} />
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">Range</h2>
          <Datepicker mode="range" selected={dateRange} onSelect={setDateRange} />
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Single with Min and Max
          </h2>
          <div>
            <Datepicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              disabled={[{ before: oneWeekBefore }, { after: oneWeekLater }]}
            />
          </div>
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Single with Outside Days
          </h2>
          <div>
            <Datepicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              showOutsideDays
              disabled={[(date) => date.getDay() === 6 || date.getDay() === 0]}
            />
          </div>
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">Show Two Months</h2>
          <div>
            <Datepicker
              mode="single"
              numberOfMonths={2}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Range Show Two Months
          </h2>
          <div>
            <Datepicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
