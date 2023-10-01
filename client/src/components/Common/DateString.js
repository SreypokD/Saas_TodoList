import {format, parse} from 'date-fns';

export const DateString =({dateString}) => {
  const date = parse( dateString);
  const formattedDate = format(date, 'd-MMMM-yyyy');
  return formattedDate;
}