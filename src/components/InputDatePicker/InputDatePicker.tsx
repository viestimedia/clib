import React, { useRef, useState } from 'react';
import styles from './InputDatePicker.module.scss';
import EventIcon from 'assets/icons/event-outlined.svg?react';
import { Input } from 'components/Input/Input';
import { format } from 'date-fns';
import { FocusTrap } from 'focus-trap-react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react';
import { Datepicker, DatepickerProps } from 'components/Datepicker';
import { validateDate } from 'utils/validate';

type Props = {
  label: string;
  required: boolean;

  /**
   * The name of the input will be used on a hidden input field
   * containing the date in a machine friendly format.
   * The human friendly format is not even sent to the server.
   */
  name?: string;
  value?: Date;

  datepicker?: Omit<DatepickerProps, 'onSelect' | 'selected' | 'mode'>;

  // Input spesific props:
  input?: React.ComponentProps<typeof Input>;
};

export const InputDatePicker = ({
  label,
  required,
  name,
  value,
  datepicker,
  input,
}: Props) => {
  if (!(value instanceof Date) && value !== undefined) {
    console.warn(
      "InputDatePicker: value isn't a Date object. This would cause a crash, but we're fixing it for you. Please use a Date object.",
      value
    );

    // There seems to be no difference between these two
    // value = parseISO(value);
    value = new Date(value);
  }

  /**
   * selected should be a machine friendly date
   * inputValue should be a human friendly date
   *
   * The reason for two dates is that the human friendly date
   * is hostile to computers. It's easier to send the computer
   * friendly date so it doesn't have to parse it first.
   */
  const [selected, setSelected] = useState<Date | undefined>(
    value ? value : undefined
  );
  const [inputValue, setInputValue] = useState<string>(
    // TODO: wrap the initializer in a lazy `() =>` callback to satisfy
    // react-hooks/purity. Deferred to a follow-up PR.
    // eslint-disable-next-line react-hooks/purity
    value ? format(value, 'd.M.yyyy') : format(Date.now(), 'd.M.yyyy')
  );
  const [inputError, setInputError] = useState<string | undefined>('');

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift()],
  });

  const closeDayPicker = () => {
    setIsDayPickerOpen(false);
    buttonRef?.current?.focus();
  };

  const openDayPicker = () => {
    setIsDayPickerOpen(true);
  };

  const handleDaySelect = (date?: Date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, 'd.M.yyyy'));
      closeDayPicker();
    } else {
      setInputValue('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="hidden"
          name={name}
          readOnly
          value={selected?.toISOString() || ''} // Fixes: A component is changing an uncontrolled input to be controlled.
        />
        <Input
          ref={(node) => refs.setReference(node)}
          label={label}
          required={required}
          value={inputValue}
          className="iconOnRight"
          onChange={(val) => {
            setInputValue(val as string);
            setInputError(validateDate(val as string));
          }}
          message={inputError}
          icon={<EventIcon />}
          onClick={openDayPicker}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              openDayPicker();
            }
            if (e.key === 'Escape') {
              closeDayPicker();
            }
          }}
          onFocus={!inputValue ? openDayPicker : undefined}
          {...input}
        />
      </div>
      {isDayPickerOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onActivate: openDayPicker,
            onDeactivate: closeDayPicker,
          }}
        >
          <div
            tabIndex={-1}
            style={floatingStyles}
            className={styles.modal}
            ref={(node) => refs.setFloating(node)}
            role="dialog"
            aria-label="DayPicker calendar"
          >
            <Datepicker
              mode="single"
              selected={selected}
              onSelect={handleDaySelect}
              {...datepicker}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};
