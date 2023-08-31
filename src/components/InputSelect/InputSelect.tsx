import styles from './InputSelect.module.scss';
import { InputOption } from 'models/inputs';

interface Props {
  name: string;
  title: string;
  id: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange(val: string): void;
  placeholder?: string;
  options: InputOption[];
  required?: boolean;
}

export const InputSelect = ({
  name,
  title,
  id,
  value,
  onChange,
  placeholder,
  options,
  required = true,
}: Props) => {
  return (
    <div className={styles.label}>
      <select
        name={name}
        title={title}
        id={id}
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
