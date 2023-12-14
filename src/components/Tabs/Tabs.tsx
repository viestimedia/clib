import { Link } from 'utils/init';
import styles from './Tabs.module.scss';
import { InputOption } from '..';

type Props = {
  inputSelectOptions: InputOption[];
  selectedOptionKey: string;
  alignment?: 'center' | 'left';
  extraClass?: string;
};

export const Tabs = ({
  inputSelectOptions,
  selectedOptionKey,
  alignment = 'center',
  extraClass,
}: Props) => {
  return (
    <div>
      <div
        className={`${styles.container} ${styles[alignment]} ${
          extraClass ? styles[extraClass] : ''
        }`}
      >
        {inputSelectOptions.map((option) => (
          <Link
            className={`${styles.tab} ${
              option.value === selectedOptionKey ? styles.selected : ''
            }`}
            key={option.id}
            href={option.value}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
