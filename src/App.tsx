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
  ListItemType,
  AVPlayer,
} from './components';

import { useState } from 'react';
import { add, sub } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useHash } from 'react-use';
import MTLogo from 'assets/mt-logo.svg';
import VMLogo from 'assets/vm-logo-white.svg';
import { Footer } from 'components/Footer/Footer';
import { Brand } from 'components/Link/Link';
import { CookieSettingsLink } from 'components/CookieSettingsLink/CookieSettingsLink';
import { ViestimediaFooter } from 'components/ViestimediaFooter/ViestimediaFooter';

const oneWeekLater = add(new Date(), { days: 7 });
const oneWeekBefore = sub(new Date(), { days: 7 });


/**
 * Copied from vm-web, consider moving theme stuff to 
 * this library?
 */
const defaultTheme = {
  '--brandColorLight': '#7AC74C',
  '--brandColorMedium': '#54942E',
  '--brandColorDark': '#336118',
  '--brandFontFamily': '"Source Serif Pro", Georgia, serif',

  '--brown': '#815109',
  '--blue': '#27659f',
  '--darkOrange': '#c1532f',
  '--brandMarketingDark': '#344454',

  '--avPlayerBg': '#195745',
  '--avPlayerHeaderBg': '#268267',
  '--avPlayerSeeker': '#268267',
  '--avPlayerSeekerBg': '#0E2F26',
  '--avPlayerSeekerThumb': '#F1F1F1',
  '--avPlayerPlayPauseBg': '#1B1B1B',
};

function App() {
  // react-router would be a little overkill for this use
  const [_route, setRoute] = useHash();
  const route = _route || '#datepicker';

  const styleVariables = Object.entries(defaultTheme).reduce(
    (acc, curr) => `${acc} ${curr[0]}: ${curr[1]};`,
    ''
  );
  const styleStr = `:root {${styleVariables}}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleStr }} />
      <AppNav setRoute={setRoute} />

      {route === '#datepicker' && <DatepickerRoute />}
      {route === '#header' && <HeaderRoute />}
      {route === '#footer' && <FooterRoute />}
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
          <a href="#header" onClick={() => setRoute('header')}>
            Header
          </a>
        </li>
        <li>
          <a href="#footer" onClick={() => setRoute('footer')}>
            Footer
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

function HeaderRoute() {
  return (
    <div className="absolute top-36 left-0 right-0">
      <HeaderBanner
        mainLogo={<MTLogo />}
        type="compact"
        className="headerBannerDemo"
        button={
          <Button
            label="Palaa MT:n etusivulle"
            variant={ButtonVariant.Blend}
            size={ButtonSize.S}
          />
        }
      />
      <br />
      <HeaderBanner
        mainLogo={<MTLogo />}
        className="headerBannerDemo"
        subLogo={<img src="https://picsum.photos/100/20" />}
        button={
          <Button
            label="Palaa MT:n etusivulle"
            variant={ButtonVariant.Blend}
            size={ButtonSize.S}
          />
        }
      />
    </div>
  );
}

function FooterRoute() {
  return (
    <div className="absolute top-36 left-0 right-0">
      <ViestimediaFooter />

      <br />

      <Footer
        footer={{
          top: {
            actions: <p>Some actions</p>,
            logo: <VMLogo />,
          },
          main: {
            columns: <p>Insert menu columns here</p>,
          },
          bottom: {
            paperName: 'Viestimedia Oy',
            menu: [
              {
                title: 'Linkki 1',
                url: '/',
                openInNewTab: false,
                brand: Brand.VM,
              },
              {
                title: 'Linkki 2',
                url: '/',
                openInNewTab: false,
                brand: Brand.VM,
              },
              {
                title: 'Linkki 3',
                url: '/',
                openInNewTab: false,
                brand: Brand.VM,
              },
            ],
            children: <CookieSettingsLink />,
          },
        }}
      />
    </div>
  );
}

function SomethingelseRoute() {
  return (
    <>
      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Audio & video player</h2>
        <div className=" p-3 border">
          <AVPlayer
            player={{
              url: 'https://media-develop.viestimedia.net/sidetrack.mp4',
            }}
          />
        </div>

        <div className="bg-black p-3 border">
          <AVPlayer
            player={{
              url: 'https://media-develop.viestimedia.net/podcast.m4a',
            }}
          />
        </div>
      </div>

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
            labelInfo="(Label info lorem ipsum)"
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
            type="password"
            label="Label"
            name="inputWithIcon"
            onChange={() => null}
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
        <h2 className="text-xl font-bold">List with images</h2>

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

        <h2 className="text-xl font-bold mt-6">Horse ad list</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading text="Uusimmat hevoset" className="noBorder" />
          <ul>
            <ListItem
              heading="Superpitkä hepan nimi lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
              subheading="6000 €"
              linkUrl="/art1"
              tag={<Tag text="Vuokrataan" className="bg-[#815109]" />}
              type={ListItemType.HorseAdItem}
            />
            <ListItem
              heading="Ravihevonen"
              subheading="3000 €"
              linkUrl="/art2"
              type={ListItemType.HorseAdItem}
            />
            <ListItem
              heading="Heppa lorem ipsum"
              subheading="6000 €"
              linkUrl="/art3"
              tag={<Tag text="Myydään" className="bg-[#815109]" />}
              type={ListItemType.HorseAdItem}
            />
            <ListItem
              heading="Heppa 1"
              subheading="1600000 €"
              linkUrl="/art4"
              tag={
                <Tag
                  text="Ostetaan"
                  className="border border-[#815109] !text-[#815109] !leading-4"
                />
              }
              type={ListItemType.HorseAdItem}
            />
          </ul>
        </div>

        <h2 className="text-xl font-bold mt-6">Job ad list</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading text="Uusimmat työpaikat" className="noBorder" />
          <ul>
            <ListItem
              heading="Superpitkä työpaikan nimi lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
              subheading="HAKU PÄÄTTYY: 12.5.2024"
              linkUrl="/art1"
              tag={<Tag text="Rakennusala" className="bg-[#815109]" />}
              type={ListItemType.JobAdItem}
            />
            <ListItem
              heading="Hae työpaikkaa"
              subheading="HAKU PÄÄTTYY: 12.5.2024"
              linkUrl="/art2"
              type={ListItemType.JobAdItem}
            />
            <ListItem
              heading="Työpaikka"
              subheading="HAKU PÄÄTTYY: 12.5.2024"
              linkUrl="/art3"
              tag={<Tag text="Rakennusala" className="bg-[#815109]" />}
              type={ListItemType.JobAdItem}
            />
            <ListItem
              heading="Työpaikka"
              subheading="HAKU PÄÄTTYY: 12.5.2024"
              linkUrl="/art4"
              tag={
                <Tag
                  text="Kuljetusala"
                  className="border border-[#815109] !text-[#815109] !leading-4"
                />
              }
              type={ListItemType.JobAdItem}
            />
          </ul>
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
