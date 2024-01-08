import { isValid, parse } from 'date-fns';

const DATE_FORMAT = 'dd.MM.yyyy';

export const validateDate = (dateString: string) => {
  const date = parse(dateString, DATE_FORMAT, new Date());

  if (!isValid(date)) {
    return 'Anna päivämäärä muodossa pp.kk.vvvv';
  } 
  return undefined;
};
