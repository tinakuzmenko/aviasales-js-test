export const formatTicketPrice = price => {
  const priceString = price.toString();
  return (
    priceString.substring(0, priceString.length - 3) +
    ' ' +
    priceString.substring(priceString.length, priceString.length - 3)
  );
};

export const countStops = stops => {
  if (stops.length === 0) {
    return 'Без пересадок';
  }

  if (stops.length === 1) {
    return '1 пересадка';
  }

  if (stops.length > 1 && stops.length < 5) {
    return `${stops.length} пересадки`;
  }

  if (stops.length >= 5) {
    return `${stops.length} пересадок`;
  }
};
