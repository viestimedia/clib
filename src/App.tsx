import {
  Button,
  ButtonVariant,
  ButtonSize,
  Datepicker,
  HeaderBanner,
  Heading,
  HeadingStyle,
  Input,
  InputDatePicker,
  InputMessage,
  InputSelect,
  ListFooter,
  ListHeading,
  ListItem,
  Tabs,
  Tag,
  Teaser,
  TeaserType,
} from './components';

import { useState } from 'react';
import { add, sub } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useHash } from 'react-use';
import CheckIcon from 'assets/icons/check-circle-filled.svg';
import MTLogo from 'assets/mt-logo.svg';

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
        <div className=" p-3 border">
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
        <div className=" p-3 border">
          <InputMessage
            id="inputError"
            type="error"
            text="Input message lorem ipsum."
          />
        </div>

        <div className="font-bold pt-3">Input Text</div>
        <div className=" p-3 border">
          <Input
            label="Label"
            required={true}
            name="textInputName"
            placeholder="Text input placeholder"
            onChange={() => null}
            onFocus={() => console.log('FOCUS')}
            onBlur={() => console.log('BLUR')}
            message="Virheviestin testaus"
          />
          <Input
            label="Label 2"
            required={true}
            name="textInputName2"
            placeholder="Text input placeholder 2"
            onChange={() => null}
          />
        </div>

        <div className="font-bold pt-3">Input with datalist</div>
        <div className=" p-3 border">
          <Input
            label="Label"
            required={true}
            name="datalistInput"
            datalist={['Autocomplete', 'Datalist', 'Test']}
            message="Kokeile kirjoittaa kenttään. Aloita vaikka T kirjaimella."
            messageType="info"
          />
        </div>

        <div className="font-bold pt-3">Input with icon button</div>
        <div className=" p-3 border">
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

        <div className="font-bold pt-3">Input Select</div>
        <div className=" p-3 border">
          <InputSelect
            title="Options"
            required={true}
            name="option"
            onChange={() => null}
            id="optiontest"
            options={[
              {
                label: 'Select option',
                value: '',
                id: '',
              },
              {
                label: 'Option number one',
                value: '1',
                id: 'option1',
              },
              {
                label: 'Second option',
                value: '2',
                id: 'option2',
              },
            ]}
          />
          <div className="mt-5">
            <InputSelect
              title="Options with nobg"
              required={true}
              name="option-nobg"
              id="optiontest-nobg"
              className="noBg"
              options={[
                {
                  label: 'Select nobg option',
                  value: '',
                  id: '',
                },
                {
                  label: 'Option number one',
                  value: '1',
                  id: 'option1',
                },
                {
                  label: 'Second option',
                  value: '2',
                  id: 'option2',
                },
              ]}
            />
          </div>
        </div>

        <div className="font-bold pt-3">Input Date Picker</div>
        <div className=" p-3 border">
          <InputDatePicker label="Date" required={true} />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Tags</h2>

        <div className=" p-3 border flex flex-wrap gap-3">
          <Tag
            text="Ostetaan"
            className="border border-[#815109] !text-[#815109] !leading-4"
          />
          <Tag text="Myydään" className="bg-[#815109]" />
          <Tag text="Tilaajalle" className="bg-black uppercase" />
          <Tag text="Tilaajalle" className="text-[#1b1b1b] uppercase" />
          <Tag text="Haku sulkeutuu pian" className="bg-[#E65100] uppercase" />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Headings</h2>

        <div className=" p-3 border">
          <Heading
            text="Default heading"
            style={HeadingStyle.Default}
            level="h1"
          />
          <Heading
            text="Secondary heading"
            style={HeadingStyle.Secondary}
            level="h2"
          />
          <Heading
            text="Subheading"
            style={HeadingStyle.Subheading}
            level="h3"
          />
          <Heading
            level="h2"
            style={HeadingStyle.Subheading}
            text="Suomen Parhaat subheading"
            className="suomenParhaat"
          />
          <Heading
            level="h2"
            style={HeadingStyle.Subheading}
            text="Native Ad subheading"
            className="nativeAd"
          />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Tabs</h2>

        <div className=" p-3 border">
          <Tabs
            inputSelectOptions={[
              { label: 'Selected tab', value: '/selected-tab', id: '1' },
              { label: 'Other tab', value: '/other-tab', id: '2' },
            ]}
            selectedOptionKey={'/selected-tab'}
          />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Header banner</h2>

        <div className=" p-3 border">
          <HeaderBanner
            mainLogo={<MTLogo />}
            className="headerBannerDemo"
            type="compact"
            button={
              <Button
                label="Palaa MT:n etusivulle"
                variant={ButtonVariant.Blend}
                size={ButtonSize.S}
              />
            }
          />
        </div>
        <div className=" p-3 border">
          <HeaderBanner
            mainLogo={<MTLogo />}
            subLogo={<img src="https://picsum.photos/100/20" />}
            className="headerBannerDemo"
            button={
              <Button
                label="Palaa MT:n etusivulle"
                variant={ButtonVariant.Blend}
                size={ButtonSize.S}
              />
            }
          />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">List</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading text="Katsotuimmat hevoset" />
          <ul>
            <ListItem
              heading="Kuvallinen tilaajalle-otsikko lorem ipsum dolor sit amet"
              linkUrl="/art1"
              date="09:22"
              image={<img src="https://picsum.photos/200" />}
              tag={
                <Tag text="Tilaajalle" className="text-[#1b1b1b] uppercase" />
              }
            />
            <ListItem
              heading="Kuvaton uutisotsikko lorem ipsum dolor sit amet"
              linkUrl="/art2"
              date="19.8. 05:11"
            />
            <ListItem
              heading="Kuvallinen hevosilmoitus"
              subheading="3 v, Tamma, 6000 €"
              linkUrl="/art3"
              image={<img src="https://picsum.photos/200" />}
              tag={<Tag text="Myydään" className="bg-[#815109]" />}
            />
            <ListItem
              heading="Kuvaton hevosilmoitus"
              subheading="3 v, Tamma, 6000 €"
              linkUrl="/art4"
              tag={
                <Tag
                  text="Ostetaan"
                  className="border border-[#815109] !text-[#815109] !leading-4"
                />
              }
            />
          </ul>
          <ListFooter text="Näytä lisää" linkUrl="/" />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Teaser</h2>

        <div className="bg-gray-200 p-3 border flex flex-col gap-4 max-w-2xl">
          <Teaser
            heading="Kuvallinen hevosilmoitus"
            subheading="2 v 6 kk, tamma, suomenhevonen, 6000 €"
            linkUrl="/art1"
            image={<img src="https://picsum.photos/920/516" />}
            tag={<Tag text="Myydään" className="bg-[#815109]" />}
            id="art1"
            teaserType={TeaserType.Medium}
            className="hasBorder"
          />
          <Teaser
            heading="Kuvaton medium-teaser hevosilmoitus"
            subheading="4 v 6 kk, tamma"
            linkUrl="/art2"
            tag={
              <Tag
                text="Ostetaan"
                className="border border-[#815109] !text-[#815109] !leading-4"
              />
            }
            id="art2"
            teaserType={TeaserType.Medium}
            className="hasBorder"
          />
          <Teaser
            heading="Small-teaser lorem ipsum dolor sit amet"
            linkUrl="/art3"
            image={<img src="https://picsum.photos/200" />}
            id="art3"
            teaserType={TeaserType.Compact}
            metadata={
              <div className="italic">
                Metadata-placeholder (styles in vm-web)
              </div>
            }
          />
          <Teaser
            heading="Large-teaser lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
            linkUrl="/art4"
            image={<img src="https://picsum.photos/800/450" />}
            id="art3"
            teaserType={TeaserType.Large}
            metadata={
              <div className="italic">
                Metadata-placeholder (styles in vm-web)
              </div>
            }
          />
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
