import AbstractComponent from '../abstract-component.js';

export default class PageMain extends AbstractComponent {
  getTemplate() {
    return `<main>
      <div class="container">
        <h1 class="visually-hidden">Поиск дешевых авиабилетов</h1>
        <div class="main-content-wrapper">
        </div>
      </div>
    </main>`;
  }
}
