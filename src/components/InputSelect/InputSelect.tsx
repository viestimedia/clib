import styles from './InputSelect.module.scss';
import { InputOption } from 'models/inputs';
import classNames from 'classnames';

interface Props {
  name: string;
  title: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?(val: string): void;
  placeholder?: string;
  options: InputOption[];
  required?: boolean;
  className?: string;
}

export const InputSelect = ({
  name,
  title,
  id,
  value,
  defaultValue,
  onChange,
  placeholder,
  options,
  required = false,
  className = '',
}: Props) => {
  const moduleExtend = styles[className] ? true : false;

  return (
    <div
      className={classNames(styles.label, {
        [styles[className]]: moduleExtend,
        [className]: !moduleExtend,
      })}
    >
      <label className={styles.hidden}>{title}</label>
      <select
        name={name}
        title={title}
        id={id || name}
        className={styles.select}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required={required}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
