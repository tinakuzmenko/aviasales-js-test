import { format, addMinutes } from 'date-fns';

const MINUTES_IN_HOUR = 60;

export const getTimeFromDate = date => format(new Date(date), 'HH:mm');

export const getEndDate = (date, duration) => {
  const endDate = addMinutes(new Date(date), duration);
  return format(endDate, 'HH:mm');
};

export const convertMinutesToHours = duration => {
  if (duration / MINUTES_IN_HOUR >= 1) {
    const hours = `${Math.trunc(duration / MINUTES_IN_HOUR)}ч`;
    const minutes =
      duration % MINUTES_IN_HOUR > 0 ? `${duration % MINUTES_IN_HOUR}м` : ``;

    return `${hours} ${minutes}`;
  }

  return `${duration}м`;
};
