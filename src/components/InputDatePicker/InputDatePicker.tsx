import { useRef, useState } from 'react';
import styles from './InputDatePicker.module.scss';
import EventIcon from 'assets/icons/event-outlined.svg';
import { Input } from 'components/Input/Input';
import { format } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { usePopper } from 'react-popper';
import { Datepicker } from 'components/Datepicker';

type Props = {
  label: string;
	required: boolean;
};

export const InputDatePicker = ({
  label,
  required,
}: Props) => {
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>(format(Date.now(), 'd.M.yyyy'));
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);


  const popperRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

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
				<Input ref={popperRef} label={label} required={required} value={inputValue} className='iconOnRight' onChange={() => null} icon={<EventIcon/>} onClick={openDayPicker}/>
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
						<Datepicker mode="single" selected={selected} onSelect={(d) => handleDaySelect(d)} />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};
