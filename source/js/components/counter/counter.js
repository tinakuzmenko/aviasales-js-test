import AbstractSmartComponent from '../abstract-smart-component';

export default class Counter extends AbstractSmartComponent {
  constructor() {
    super();

    this._ticketsCounter = 0;
  }

  getTemplate() {
    return `<p class="counter">Найдено билетов: <span class="counter__value">${this._ticketsCounter}</span></p>`;
  }

  setTicketsCounter(counter) {
    this._ticketsCounter = counter;
    this.rerender();
  }
}
