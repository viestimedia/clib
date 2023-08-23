import styles from './Tag.module.scss';

type Props = {
  text: string;
  color: string;
  uppercase?: boolean;
  hasBackground?: boolean;
	hasBorder?: boolean;
};

export const Tag = ({ text, color, uppercase, hasBackground, hasBorder }: Props) => {
	const style = hasBackground
    ? { backgroundColor: color }
    : hasBorder
    ? { color: color, borderColor: color }
    : { color: color };
	
  return (
    <div
      className={`${styles.tag} ${uppercase ? styles.uppercase : ''} ${
        hasBorder ? styles.hasBorder : ''
      }`}
      style={style}
    >
      <span>{text}</span>
    </div>
  );
};
