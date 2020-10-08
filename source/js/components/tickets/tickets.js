import AbstractComponent from '../abstract-component.js';

export default class TicketsContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="tickets">
      <h2 class="visually-hidden">Результаты поиска</h2>
      <div class="tickets__wrapper">
      </div>
    </section>`;
  }
}
