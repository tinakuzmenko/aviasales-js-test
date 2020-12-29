import AbstractComponent from '../abstract-component.js';
import { MINUTES_IN_HOUR } from '../../utils/constants';
import { addMinutes, format } from 'date-fns';

export default class Ticket extends AbstractComponent {
  constructor(ticket) {
    super();
    this._ticket = ticket;
    this._ticketSegments = this._ticket.segments;
  }

  getTemplate() {
    const ticketPrice = this._formatTicketPrice(this._ticket.price);

    return `<div class="ticket tickets__item">
          <div class="ticket__wrapper">
            <p class="ticket__price">${ticketPrice} Р</p>
            <img
              class="ticket__avia-logo"
              src="https://pics.avs.io/99/36/${this._ticket.carrier}.png"
              alt="${this._ticket.carrier}"
            />
          </div>
          ${this._renderSegment()}
        </div>`;
  }

  _renderSegment() {
    return this._ticketSegments
      .map(ticketSegment => {
        const startDate = this._getTimeFromDate(ticketSegment.date);
        const endDate = this._getEndDate(
          ticketSegment.date,
          ticketSegment.duration,
        );
        const flightDuration = this._convertMinutesToHours(
          ticketSegment.duration,
        );
        const stopsLabel = this._countStops(ticketSegment.stops.length);

        return `<div class="ticket__row">
            <div class="ticket__col">
              <p class="ticket__label">
                ${ticketSegment.origin} – ${ticketSegment.destination}
              </p>
              <p class="ticket__value">
                <time class="ticket__start-time">${startDate}</time>
                –
                <time class="ticket__end-time">${endDate}</time>
              </p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">В пути</p>
              <p class="ticket__value">${flightDuration}</p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">${stopsLabel}</p>
              <p class="ticket__value">${ticketSegment.stops.join(', ')}</p>
            </div>
          </div>`;
      })
      .join(``);
  }

  _getTimeFromDate(date) {
    return format(new Date(date), 'HH:mm');
  }

  _getEndDate(date, duration) {
    const endDate = addMinutes(new Date(date), duration);
    return format(endDate, 'HH:mm');
  }

  _convertMinutesToHours(duration) {
    if (duration / MINUTES_IN_HOUR >= 1) {
      const hours = `${Math.trunc(duration / MINUTES_IN_HOUR)}ч`;
      const minutes =
        duration % MINUTES_IN_HOUR > 0 ? `${duration % MINUTES_IN_HOUR}м` : ``;

      return `${hours} ${minutes}`;
    }

    return `${duration}м`;
  }

  _countStops(stopsLength) {
    switch (true) {
      case stopsLength === 0:
        return 'Без пересадок';
      case stopsLength === 1:
        return `${stopsLength} пересадка`;
      case stopsLength > 1 && stopsLength < 5:
        return `${stopsLength} пересадки`;
      case stopsLength >= 5:
        return `${stopsLength} пересадок`;
      default:
        return `Без пересадок`;
    }
  }

  _formatTicketPrice(price) {
    const priceString = price.toString();
    return (
      priceString.substring(0, priceString.length - 3) +
      ' ' +
      priceString.substring(priceString.length, priceString.length - 3)
    );
  }
}
