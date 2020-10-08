import AbstractComponent from '../abstract-component.js';
import { getTimeFromDate, getEndDate } from '../../helpers/dates';

export default class Ticket extends AbstractComponent {
  constructor(ticket) {
    super();
    this._ticket = ticket;
    this._ticketSegments = this._ticket.segments;
  }

  getTemplate() {
    return `<div class="ticket tickets__item">
          <div class="ticket__wrapper">
            <p class="ticket__price">${this._ticket.price} Р</p>
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
              <p class="ticket__value">${ticketSegment.duration}</p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">1 пересадка</p>
              <p class="ticket__value">${ticketSegment.stops.join(', ')}</p>
            </div>
          </div>`;
      })
      .join(``);
  }
}
