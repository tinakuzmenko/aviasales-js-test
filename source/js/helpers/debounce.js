export const debounce = callback => {
  let lastTimeout = null;

  return function () {
    const parameters = arguments;

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(() => {
      callback.apply(null, parameters);
    }, 500);
  };
};
