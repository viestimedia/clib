import { fi } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import type {
  DateRange,
  PropsBase,
  PropsSingle,
  PropsSingleRequired,
} from 'react-day-picker';
import 'react-day-picker/style.css';

import './Datepicker.scss';

export type { DateRange };

// `DayPickerSingleProps` was removed in react-day-picker v10; this
// reconstructs the equivalent (base props + single-selection mode props).
export type DayPickerSingleProps = PropsBase &
  (PropsSingle | PropsSingleRequired);

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
