import AbstractComponent from '../abstract-component.js';

export default class Ticket extends AbstractComponent {
  constructor(ticket) {
    super();
    this._ticket = ticket;
    this._ticketFirstSegment = this._ticket.segments[0];
    this._ticketSecondSegment = this._ticket.segments[1];
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
          <div class="ticket__row">
            <div class="ticket__col">
              <p class="ticket__label">
                ${this._ticketFirstSegment.origin} – ${
      this._ticketFirstSegment.destination
    }
              </p>
              <p class="ticket__value">
                <time class="ticket__start-time">10:45</time>
                –
                <time class="ticket__end-time">08:00</time>
              </p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">В пути</p>
              <p class="ticket__value">${this._ticketFirstSegment.duration}</p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">2 пересадки</p>
              <p class="ticket__value">${this._ticketFirstSegment.stops.join(
                ', ',
              )}</p>
            </div>
          </div>
          <div class="ticket__row">
            <div class="ticket__col">
              <p class="ticket__label">
                ${this._ticketSecondSegment.origin} – ${
      this._ticketSecondSegment.destination
    }
              </p>
              <p class="ticket__value">
                <time class="ticket__start-time">11:20</time>
                –
                <time class="ticket__end-time">00:50</time>
              </p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">В пути</p>
              <p class="ticket__value">${this._ticketSecondSegment.duration}</p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">1 пересадка</p>
              <p class="ticket__value">${this._ticketSecondSegment.stops.join(
                ', ',
              )}</p>
            </div>
          </div>
        </div>`;
  }
}
