export const MINUTES_IN_HOUR = 60;
export const MIN_SHOWN_TICKETS = 5;

export const ServerUrl = {
  SEARCH: 'https://front-test.beta.aviasales.ru/search',
  TICKETS: 'https://front-test.beta.aviasales.ru/tickets',
};

export const Method = {
  GET: `GET`,
};

export const ResponseStatus = {
  OK: 200,
  REDIRECT: 300,
  SERVER_ERROR: 500,
};

export const ClassName = {
  HIDDEN_CLASS: 'visually-hidden',
  SORT_ACTIVE_CLASS: 'sort__button--active',
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  AFTEREND: 'afterend',
  BEFOREBEGIN: 'beforebegin',
  BEFOREEND: 'beforeend',
};

export const filterDescriptionsMap = {
  all: 'Все',
  direct: 'Без пересадок',
  '1-stop': '1 пересадка',
  '2-stops': '2 пересадки',
  '3-stops': '3 пересадки',
};

export const filterValuesMap = {
  0: 'direct',
  1: '1-stop',
  2: '2-stops',
  3: '3-stops',
};
