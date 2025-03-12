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
  ImageElement,
  ListFooter,
  ListHeading,
  ListItem,
  Tabs,
  Tag,
  Teaser,
  TeaserType,
  ListItemType,
  AVPlayer,
  TagType,
  ListHeadingType,
  InputCheckbox,
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
import ArrowForwardIcon from 'assets/icons/arrow-forward-outline.svg';
import { ImageCarousel } from './components/Image/ImageCarousel';

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
  // TODO: Remove all references to Source Serif Pro after all fonts have been updated to use New Design System (2025) fonts
  '--brandFontFamily': '"Source Serif Pro", Georgia, serif',
  '--brandFontFamilySerif':
    '"Source Serif 4 Variable", "Source Serif 4", Georgia, serif',
  '--brandFontFamilySansSerif':
    '"Red Hat Text Variable", "Red Hat Text", sans-serif',

  '--brown': '#815109',
  '--blue': '#27659f',
  '--darkOrange': '#c1532f',
  '--brandMarketingDark': '#344454',
  '--brandCategoryColor': '#1b1b1b',

  '--avPlayerBg': '#195745',
  '--avPlayerHeaderBg': '#268267',
  '--avPlayerSeeker': '#268267',
  '--avPlayerSeekerBg': '#0E2F26',
  '--avPlayerSeekerThumb': '#F1F1F1',
  '--avPlayerPlayPauseBg': '#1B1B1B',
};

const carouselImages = Array.from({ length: 8 }, (_, index) => ({
  srcSet: `https://picsum.photos/460/345?${index + 1}`,
  source: `https://picsum.photos/920/690?${index + 1}`,
  alt: `Image ${index + 1}`,
  caption: `Image ${index + 1} caption`,
}));

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
        type="small"
        className="headerBannerDemo"
      />
      <br />
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

        <div className="font-bold pt-3">XS variations:</div>
        <div className="mb-2 p-3 border">
          <div className="flex flex-row items-start flex-wrap gap-3 mt-2">
            <Button
              label="Transparent button"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.XS}
            />
            <Button
              label="Secondary button"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.XS}
            />
            <Button
              label="Outline button"
              variant={ButtonVariant.Outline}
              size={ButtonSize.XS}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 mt-2">
            <Button
              label="Transparent button"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.XS}
              isLoading={true}
            />
            <Button
              label="Secondary button"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.XS}
              isLoading={true}
            />
            <Button
              label="Outline button"
              variant={ButtonVariant.Outline}
              size={ButtonSize.XS}
              isLoading={true}
            />
          </div>

          <div className="flex flex-row items-start flex-wrap gap-3 mt-2">
            <Button
              label="Transparent arrow"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Secondary arrow"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Outline arrow"
              variant={ButtonVariant.Outline}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 mt-2">
            <Button
              label="Transparent arrow"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Secondary arrow"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Outline arrow"
              variant={ButtonVariant.Outline}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent disabled"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
            <Button
              label="Secondary disabled"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
            <Button
              label="Outline disabled"
              variant={ButtonVariant.Outline}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 mt-2">
            <Button
              variant={ButtonVariant.Transparent}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Secondary}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.XS}
              icon={<ArrowForwardIcon />}
            />
          </div>
        </div>

        <div className="font-bold pt-3">S variations:</div>
        <div className="mb-2 p-3 border">
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent button"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.S}
            />
            <Button
              label="Secondary button"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.S}
            />
            <Button
              label="Secondary bold"
              variant={ButtonVariant.SecondaryBold}
              size={ButtonSize.S}
            />
            <Button
              label="Outline button"
              variant={ButtonVariant.Outline}
              size={ButtonSize.S}
            />
            <Button
              label="Outline bold"
              variant={ButtonVariant.OutlineBold}
              size={ButtonSize.S}
            />
            <Button
              label="Primary button"
              variant={ButtonVariant.Primary}
              size={ButtonSize.S}
            />
            <Button
              label="Sales button"
              variant={ButtonVariant.Sales}
              size={ButtonSize.S}
            />
            <Button
              label="Link button"
              variant={ButtonVariant.Naked}
              size={ButtonSize.S}
            />
          </div>

          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent disabled"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Secondary disabled"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Outline disabled"
              variant={ButtonVariant.Outline}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Primary disabled"
              variant={ButtonVariant.Primary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Sales disabled"
              variant={ButtonVariant.Sales}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent disabled"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Secondary disabled"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Outline disabled"
              variant={ButtonVariant.Outline}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Primary disabled"
              variant={ButtonVariant.Primary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Sales disabled"
              variant={ButtonVariant.Sales}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent disabled"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
            <Button
              label="Secondary disabled"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
            <Button
              label="Outline disabled"
              variant={ButtonVariant.Outline}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
            <Button
              label="Primary disabled"
              variant={ButtonVariant.Primary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
            <Button
              label="Sales disabled"
              variant={ButtonVariant.Sales}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
              disabled={true}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              variant={ButtonVariant.Transparent}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Secondary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Sales}
              size={ButtonSize.S}
              icon={<ArrowForwardIcon />}
            />
          </div>
        </div>

        <div className="font-bold pt-3">M variations:</div>
        <div className="p-3 border">
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent button"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.M}
            />
            <Button
              label="Secondary button"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.M}
            />
            <Button
              label="Secondary bold"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.M}
              className="bold"
            />
            <Button
              label="Outline button"
              variant={ButtonVariant.Outline}
              size={ButtonSize.M}
            />
            <Button
              label="Outline bold"
              variant={ButtonVariant.Outline}
              size={ButtonSize.M}
              className="bold"
            />
            <Button
              label="Primary button"
              variant={ButtonVariant.Primary}
              size={ButtonSize.M}
            />
            <Button
              label="Sales button"
              variant={ButtonVariant.Sales}
              size={ButtonSize.M}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent arrow"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Secondary arrow"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Outline arrow"
              variant={ButtonVariant.Outline}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Primary arrow"
              variant={ButtonVariant.Primary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              label="Sales arrow"
              variant={ButtonVariant.Sales}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent arrow"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Secondary arrow"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Outline arrow"
              variant={ButtonVariant.Outline}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Primary arrow"
              variant={ButtonVariant.Primary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
            <Button
              label="Sales arrow"
              variant={ButtonVariant.Sales}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              iconPosition="right"
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              label="Transparent disabled"
              variant={ButtonVariant.Transparent}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              disabled={true}
            />
            <Button
              label="Secondary disabled"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              disabled={true}
            />
            <Button
              label="Outline disabled"
              variant={ButtonVariant.Outline}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              disabled={true}
            />
            <Button
              label="Primary disabled"
              variant={ButtonVariant.Primary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              disabled={true}
            />
            <Button
              label="Sales disabled"
              variant={ButtonVariant.Sales}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
              disabled={true}
            />
          </div>
          <div className="flex flex-row items-start flex-wrap gap-3 pt-2">
            <Button
              variant={ButtonVariant.Transparent}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Secondary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
            <Button
              variant={ButtonVariant.Sales}
              size={ButtonSize.M}
              icon={<ArrowForwardIcon />}
            />
          </div>
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

        <div className="font-bold pt-3">Input Checkbox</div>
        <div className=" p-3 border">
          <InputCheckbox
            label="Label"
            required={true}
            name="option"
            onChange={() => null}
            options={[
              {
                label: 'Select option',
                value: '1',
                id: 'option1',
              },
              {
                label: 'Option number one',
                value: '2',
                id: 'option2',
              },
              {
                label: 'Second option',
                value: '3',
                id: 'option3',
              },
            ]}
            values={['1', '3']}
          />
        </div>

        <div className="font-bold pt-3">Input Date Picker</div>
        <div className=" p-3 border">
          <InputDatePicker label="Date" required={true} />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Tags</h2>

        <div className="p-3 border flex flex-wrap gap-3 items-start justify-start">
          <Tag
            text="Ostetaan"
            className="border border-[#815109] !text-[#815109] !leading-4"
          />
          <Tag text="Myydään" className="bg-[#815109]" />
          <Tag text="Haku sulkeutuu pian" className="bg-[#E65100] uppercase" />
        </div>

        <div className="p-3 border flex flex-wrap gap-3 items-start justify-start">
          <Tag text="Tilaajalle" type={TagType.Premium} />
          <Tag text="Tlaajalle" type={TagType.PremiumPlain} />
          <Tag text="Näytä kaikki" type={TagType.Primary} />
          <Tag text="Konemalli" type={TagType.Outline} />
          <Tag
            text="Napilla"
            type={TagType.Primary}
            onClose={() => console.log('close')}
          />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Headings</h2>

        <div className="p-3 border flex flex-col gap-2">
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
          <div className="mt-4 text-md">Uudet otsikkotyylit:</div>
          <Heading
            level="h2"
            text="Extra large teaser heading"
            style={HeadingStyle.TeaserXL}
          />
          <Heading
            level="h2"
            text="Large teaser heading"
            style={HeadingStyle.TeaserL}
          />
          <Heading
            level="h2"
            text="Medium teaser heading"
            style={HeadingStyle.TeaserM}
          />
          <Heading
            level="h2"
            text="Small teaser heading"
            style={HeadingStyle.TeaserS}
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
        <h2 className="text-xl font-bold">Horse ad list with images</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading text="Katsotuimmat hevoset" />
          <ul>
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
          <ListHeading text="Uusimmat hevoset" />
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

        <h2 className="text-xl font-bold mt-6">News list</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading
            text="Uusimmat uutiset"
            type={ListHeadingType.NewsLarge}
          />
          <ul className="flex flex-col gap-0.5 mt-0.5">
            <Teaser
              id="list-art1"
              heading="Kuvaton uutisotsikko lorem ipsum dolor sit amet"
              linkUrl="/art1"
              date="05:11"
              teaserType={TeaserType.Small}
              tag={<Tag text="Tilaajalle" type={TagType.PremiumPlain} />}
            />
            <Teaser
              id="list-art2"
              heading="Kuvallinen artikkeliotsikko loprem ipsum dolor sit amet"
              linkUrl="/art3"
              date="24.11. 13:26"
              teaserType={TeaserType.Small}
              image={<img src="https://picsum.photos/200" />}
            />
            <Teaser
              id="list-art"
              heading="Kuvallinen tilaaja-artikkeliotsikko loprem ipsum dolor sit amet"
              linkUrl="/art3"
              date="24.11. 13:26"
              teaserType={TeaserType.Small}
              image={<img src="https://picsum.photos/200" />}
              tag={<Tag text="Tilaajalle" type={TagType.PremiumPlain} />}
            />
          </ul>
          <ListFooter text="Näytä lisää" linkUrl="/" />
        </div>

        <h2 className="text-xl font-bold mt-6">Most popular news list</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading
            text="Luetuimmat uutiset"
            type={ListHeadingType.NewsLarge}
            button={
              <Button
                label="Testinappi"
                variant={ButtonVariant.Secondary}
                size={ButtonSize.XS}
              />
            }
          />
          <ul className="flex flex-col gap-0.5 mt-0.5">
            <Teaser
              id="list-art1"
              heading="Kuvaton uutisotsikko lorem ipsum dolor sit amet"
              linkUrl="/art1"
              rankNumber={1}
              teaserType={TeaserType.MostPopular}
              tag={<Tag text="Tilaajalle" type={TagType.PremiumPlain} />}
            />
            <Teaser
              id="list-art2"
              heading="Kuvallinen artikkeliotsikko loprem ipsum dolor sit amet"
              linkUrl="/art3"
              rankNumber={2}
              teaserType={TeaserType.MostPopular}
              image={<img src="https://picsum.photos/200" />}
            />
            <Teaser
              id="list-art"
              heading="Kuvallinen tilaaja-artikkeliotsikko loprem ipsum dolor sit amet"
              linkUrl="/art3"
              rankNumber={3}
              teaserType={TeaserType.MostPopular}
              image={<img src="https://picsum.photos/200" />}
              tag={<Tag text="Tilaajalle" type={TagType.PremiumPlain} />}
            />
          </ul>
          <ListFooter text="Näytä lisää" linkUrl="/" />
        </div>

        <h2 className="text-xl font-bold mt-6">Job ad list</h2>

        <div className="bg-gray-200 p-3 border">
          <ListHeading text="Uusimmat työpaikat" />
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
            heading="Case IH Axial-Flow 6160–7160"
            text="2024-"
            linkUrl="/art1"
            image={<img src="https://picsum.photos/200" />}
            tag={<Tag text="Puimurit" type={TagType.Primary} />}
            id="art1"
            teaserType={TeaserType.Machine}
          />
          <Teaser
            heading="Large teaser lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
            category="Kategoria"
            linkUrl="/art4"
            image={<img src="https://picsum.photos/800/450" />}
            id="art3"
            teaserType={TeaserType.Large}
            tag={<Tag text="Tilaajalle" type={TagType.Premium} />}
          />
          <Teaser
            heading="Compact teaser lorem ipsum dolor sit amet"
            linkUrl="/art4"
            image={<img src="https://picsum.photos/200" />}
            id="art4"
            teaserType={TeaserType.Compact}
            tag={<Tag text="Tilaajalle" type={TagType.Premium} />}
          />
          <Teaser
            heading="Compact teaser with author lorem ipsum dolor sit amet"
            linkUrl="/art4"
            image={<img src="https://picsum.photos/200" />}
            id="art4"
            teaserType={TeaserType.Compact}
            author={<div className="italic">Author placeholder</div>}
          />
          <Teaser
            heading="Related article teaser lorem ipsum dolor sit amet"
            linkUrl="/art5"
            image={<img src="https://picsum.photos/200" />}
            id="art5"
            teaserType={TeaserType.RelatedArticle}
            tag={<Tag text="Tilaajalle" type={TagType.PremiumPlain} />}
          />
          <Teaser
            heading="Small article teaser lorem ipsum dolor sit amet"
            linkUrl="/art6"
            image={<img src="https://picsum.photos/200" />}
            id="art6"
            teaserType={TeaserType.Small}
            tag={<Tag text="Tilaajalle" type={TagType.PremiumPlain} />}
          />
          <Teaser
            heading="Large teaser lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed ac lacus elit. Sed quis mi molestie, tristique justo eu feugiat. Nulla non  ipsum vitae metus pharetra consectetur."
            linkUrl="/art7"
            image={<img src="https://picsum.photos/800" />}
            id="art7"
            teaserType={TeaserType.ExtraLarge}
            tag={<Tag text="Tilaajalle" type={TagType.Premium} />}
            author={<div className="italic">Author placeholder</div>}
          />
        </div>
      </div>

      <div className="py-6 text-left">
        <h2 className="text-xl font-bold">Kuvat</h2>

        <div className="bg-gray-200 p-3 border flex flex-col gap-4 max-w-2xl">
          <ImageElement
            image={{
              srcSet: 'https://picsum.photos/460/258',
              source: 'https://picsum.photos/920/516',
              alt: 'Hevonen',
              caption: 'Kuvallinen hevosilmoitus lorem ipsum dolor sit amet.',
              credit: 'Picsum',
            }}
            showCaption={true}
          />
        </div>
        <div className="bg-gray-200 p-3 border flex flex-col gap-4 max-w-2xl">
          <ImageCarousel images={carouselImages} />
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
