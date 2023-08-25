import { fi } from 'date-fns/locale';
import { DayPicker, DayPickerDefaultProps } from 'react-day-picker';
import type { DateRange, DayPickerSingleProps } from 'react-day-picker';

export type { DateRange, DayPickerSingleProps };

export type DatepickerProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

/**
 * Uses tailwind classes for styling
 */
export const Datepicker = (props: DatepickerProps) => (
  <DayPicker
    captionLayout="dropdown-buttons"
    locale={fi}
    classNames={classNames}
    {...props}
  />
);

export const classNames: DayPickerDefaultProps['classNames'] = {
  vhidden: 'sr-only',
  caption: 'flex justify-center items-center h-10',
  root: 'text-gray-800',
  months: 'flex gap-4 relative px-4',
  // This doesn't work with captionLayout="dropdown"
  // caption_label: 'text-xl px-1',

  // Not sure what the consequence of this is. It was ugly.
  // Might be bad for a11y.
  caption_label: 'hidden',
  caption_dropdowns: 'flex gap-2',
  nav_button:
    'inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100',
  nav_button_next: 'right-0',
  nav_button_previous: 'left-0',
  table: 'border-collapse border-spacing-0',
  head_cell: 'w-10 h-10 uppercase align-middle text-center',
  cell: 'w-10 h-10 align-middle text-center border-0 px-0',
  day: 'rounded-full w-10 h-10 transition-colors hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-sky-600 active:text-white',
  day_selected: 'text-white bg-sky-500 hover:bg-sky-500',
  day_today: 'font-bold',
  day_disabled:
    'opacity-25 hover:bg-white active:bg-white active:text-gray-800',
  day_outside: 'enabled:opacity-50',
  day_range_middle: 'rounded-none',
  day_range_end: 'rounded-l-none rounded-r-full',
  day_range_start: 'rounded-r-none rounded-l-full',
  day_hidden: 'hidden',
};
