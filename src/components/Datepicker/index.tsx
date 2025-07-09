import { fi } from 'date-fns/locale';
import {
  DayPicker,
  getDefaultClassNames,
  type ClassNames,
} from 'react-day-picker';
import type { DateRange, DayPickerSingleProps } from 'react-day-picker';

export type { DateRange, DayPickerSingleProps };

export type DatepickerProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

/**
 * Uses tailwind classes for styling
 */
const defaultClassNames = getDefaultClassNames();

export const classNames: ClassNames = {
  ...defaultClassNames,
  root: 'text-gray-800',
  months: 'flex gap-4 relative px-4',
  month_caption: 'flex justify-center items-center h-10',
  dropdowns: 'flex gap-2',
  button_previous:
    'inline-flex justify-center items-center absolute top-0 left-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100',
  button_next:
    'inline-flex justify-center items-center absolute top-0 right-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100',
  month_grid: 'border-collapse border-spacing-0',
  weekday: 'w-10 h-10 uppercase align-middle text-center',
  day: 'w-10 h-10 align-middle text-center border-0 px-0 rounded-full transition-colors hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-sky-600 active:text-white',
  selected: 'text-white bg-sky-500 hover:bg-sky-500',
  today: 'font-bold',
  disabled: 'opacity-25 hover:bg-white active:bg-white active:text-gray-800',
  outside: 'enabled:opacity-50',
  range_middle: 'rounded-none',
  range_end: 'rounded-l-none rounded-r-full',
  range_start: 'rounded-r-none rounded-l-full',
  hidden: 'hidden',
};

export const Datepicker = (props: DatepickerProps) => (
  <DayPicker
    captionLayout="dropdown"
    locale={fi}
    classNames={classNames}
    {...props}
  />
);
