import { format, addMinutes } from 'date-fns';

export const getTimeFromDate = date => format(new Date(date), 'HH:mm');

export const getEndDate = (date, duration) => {
  const endDate = addMinutes(new Date(date), duration);
  return format(endDate, 'HH:mm');
};
