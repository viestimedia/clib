import React, { useEffect, useRef, useState } from 'react';
import styles from './InputDatePicker.module.scss';
import EventIcon from 'assets/icons/event-outlined.svg';
import { Input } from 'components/Input/Input';
import { format } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { usePopper } from 'react-popper';
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
    value ? format(value, 'd.M.yyyy') : format(Date.now(), 'd.M.yyyy')
  );
  const [inputError, setInputError] = useState<string | undefined>('');

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);

  const popperRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  // TODO: Remove this logging when done with the component
  // useEffect(() => {
  //   console.log('Datepicker data', {
  //     selected,
  //     inputValue,
  //     datepicker,
  //   });
  // }, [selected, inputValue, datepicker]);

  // I wrote this effect when TS complained about not matching
  // the correct type for onSelected. It also works with the
  // commented out handleDaySelect function.
  useEffect(() => {
    if (selected) {
      setInputValue(format(selected, 'd.M.yyyy'));
      closeDayPicker();
    } else {
      setInputValue('');
    }
  }, [selected]);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  const closeDayPicker = () => {
    setIsDayPickerOpen(false);
    buttonRef?.current?.focus();
  };

  const openDayPicker = () => {
    setIsDayPickerOpen(true);
  };

  // This also works. I'm not sure which one is better.
  // Functionally they're the same. Performance? Idk.
  // Doesn't this function get created on every render?
  // const handleDaySelect = (date?: Date) => {
  //   setSelected(date);
  //   if (date) {
  //     setInputValue(format(date, 'd.M.yyyy'));
  //     closeDayPicker();
  //   } else {
  //     setInputValue('');
  //   }
  // };

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
          ref={popperRef}
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
            style={popper.styles.popper}
            className={styles.modal}
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
          >
            <Datepicker
              mode="single"
              selected={selected}
              onSelect={(d) => setSelected(d)}
              // onSelect={(d) => handleDaySelect(d)}
              {...datepicker}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};
