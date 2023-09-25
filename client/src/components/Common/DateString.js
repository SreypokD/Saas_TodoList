import {format, parse} from 'date-fns';

export const DateString =({dateString}) => {
  const date = parse(dateString);
  const formattedDate = format(date, 'd-MMMM-YYYY');
  return formattedDate;
}