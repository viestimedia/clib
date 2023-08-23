import {
  Datepicker,
  Input,
  InputDatePicker,
  InputMessage,
} from './components';
import { Button } from './components';
import { CSSModule } from './components/CSSModule';

import { useState } from 'react';
import { add, sub } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useHash } from 'react-use';
import { ButtonVariant } from 'models/button';
import CheckIcon from 'assets/icons/check-circle-filled.svg';

// import { Datepicker } from './components/-picker';

const oneWeekLater = add(new Date(), { days: 7 });
const oneWeekBefore = sub(new Date(), { days: 7 });

function App() {
  // react-router would be a little overkill for this use
  const [_route, setRoute] = useHash();
  const route = _route || '#datepicker';

  return (
    <>
      <AppNav setRoute={setRoute} />

      {route === '#datepicker' && <DatepickerRoute />}
      {route === '#somethingelse' && <SomethingelseRoute />}

      <CSSModule />
    </>
  );
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
  );
}

function SomethingelseRoute() {
  return (
    <>
      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Buttons</h2>
        <div className="bg-white p-3 border">
          <Button label="Primary button" variant={ButtonVariant.Primary} />
          <Button label="Naked button" variant={ButtonVariant.Naked} />
          <Button label="Secondary button" variant={ButtonVariant.Secondary} />
        </div>

        <div className="bg-black p-3 border">
          <Button label="Primary button" variant={ButtonVariant.Primary} />
          <Button label="Naked button" variant={ButtonVariant.Naked} />
          <Button label="Secondary button" variant={ButtonVariant.Secondary} />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Inputs</h2>

        <div className="font-bold pt-3">Input Message</div>
        <div className="bg-white p-3 border">
          <InputMessage
            id="inputError"
            type="error"
            text="Input message lorem ipsum."
          />
        </div>

        <div className="font-bold pt-3">Input Text</div>
        <div className="bg-white p-3 border">
          <Input
            label="Label"
            required={true}
            name="textInputName"
            placeholder="Text input placeholder"
            onChange={() => null}
          />
        </div>

        <div className="font-bold pt-3">Input with icon button</div>
        <div className="bg-white p-3 border">
          <Input
            required
            label="Label"
            name="inputWithIcon"
            onChange={() => null}
            className="withPasswordToggle"
            iconButton={
              <Button icon={<CheckIcon />} variant={ButtonVariant.Naked} />
            }
          />
        </div>

        <div className="font-bold pt-3">Input Date Picker</div>
        <div className="bg-white p-3 border">
          <InputDatePicker label="Date" required={true} />
        </div>
      </div>
    </>
  );
}

function DatepickerRoute() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [multipleSelected, setMultipleSelected] = useState<
    Array<Date> | undefined
  >([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <main className="w-full mx-auto px-3 py-6 bg-stone-300">
      <div className="flex flex-col items-center xl:flex-row xl:flex-wrap xl:justify-around gap-12">
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Single
          </h2>
          <div>
            <Datepicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Multiple
          </h2>
          <Datepicker
            mode="multiple"
            selected={multipleSelected}
            onSelect={setMultipleSelected}
          />
        </section>
        <section className="flex items-center gap-3">
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Range
          </h2>
          <Datepicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
          />
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
          <h2 className="text-xl w-36 text-right font-bold text-gray-600 ">
            Show Two Months
          </h2>
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
  );
}

export default App;
