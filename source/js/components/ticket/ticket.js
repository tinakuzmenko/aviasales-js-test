import AbstractComponent from '../abstract-component.js';
import { countStops, formatTicketPrice } from '../../helpers/utils';
import {
  getTimeFromDate,
  getEndDate,
  convertMinutesToHours,
} from '../../helpers/dates';

export default class Ticket extends AbstractComponent {
  constructor(ticket) {
    super();
    this._ticket = ticket;
    this._ticketSegments = this._ticket.segments;
  }

  getTemplate() {
    const ticketPrice = formatTicketPrice(this._ticket.price);

    return `<div class="ticket tickets__item">
          <div class="ticket__wrapper">
            <p class="ticket__price">${ticketPrice} Р</p>
            <img
              class="ticket__avia-logo"
              src="https://pics.avs.io/99/36/${this._ticket.carrier}.png"
              alt="${this._ticket.carrier}"
            />
          </div>
          ${this.renderSegment()}
        </div>`;
  }

  renderSegment() {
    return this._ticketSegments
      .map(ticketSegment => {
        const startDate = getTimeFromDate(ticketSegment.date);
        const endDate = getEndDate(ticketSegment.date, ticketSegment.duration);
        const flightDuration = convertMinutesToHours(ticketSegment.duration);
        const stopsLabel = countStops(ticketSegment.stops);

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
}
