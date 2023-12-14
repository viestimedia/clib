import styles from './InputRadio.module.scss';
import { InputMessage } from 'components/InputMessage/InputMessage';
import classNames from 'classnames';
import { InputOption } from '..';

interface Props {
  label?: string;
  name: string;
  value: string;
  options: InputOption[];
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
  message?: string;
  messageType?: 'success' | 'error' | 'warning' | 'info';

  inline?: boolean;
  required?: boolean;
  className?: string;
}

export const InputRadio = ({
  label,
  name,
  value,
  options,
  onChange,
  message,
  messageType = 'error',
  inline,
  required,
  className = '',
}: Props) => {
  if (options.some((opt) => !opt.children && !opt.label)) {
    console.error(
      `Radio button group ${name}: option(s) missing labels AND children - one is required!`
    );
  }
  if (!options.length) {
    return null;
  }

  const moduleExtend = styles[className] ? true : false;
  const messageId = message && name ? `${name}-message` : '';

  // If onChange is provided, this is a controlled component.
  // In Remix, uncontrolled components are preferred, as forms are handled as wholes and not as individual inputs.
  const uncontrolled = !Boolean(onChange);

  console.log('Uncontrolled radio check', { name, uncontrolled, onChange });

  return (
    <>
      <div
        className={classNames({
          [styles.inline]: Boolean(inline),
          [styles[className]]: moduleExtend,
          [className]: !moduleExtend,
        })}
      >
        {label && (
          <label htmlFor={name}>
            <span className={styles.name}>{label}</span>
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.options}>
          {options.map((option) => (
            <label
              key={option.id}
              className={styles.option}
              htmlFor={option.id}
            >
              <span className={styles.field}>
                <input
                  className={styles.input}
                  type="radio"
                  id={option.id}
                  name={name}
                  value={option.value}
                  checked={!uncontrolled ? value === option.value : undefined}
                  defaultChecked={
                    // This allows changing the value without onChange
                    uncontrolled ? value === option.value : undefined
                  }
                  onChange={
                    onChange ? (e) => onChange(e.target.value) : undefined
                  }
                />
                <span className={styles.customRadioControl} />
              </span>
              <span className={styles.label}>
                {option.label} {option.children}
              </span>
            </label>
          ))}
        </div>
      </div>
      <InputMessage text={message} id={messageId} type={messageType} />
    </>
  );
};
