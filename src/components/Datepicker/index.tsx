import { fi } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import type { DateRange, DayPickerSingleProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import './Datepicker.scss';

export type { DateRange, DayPickerSingleProps };

export type DatepickerProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

export const Datepicker = (props: DatepickerProps) => (
  <DayPicker
    captionLayout="dropdown"
    locale={fi}
    modifiersClassNames={{
      today: 'rdp-today',
    }}
    {...props}
  />
);
