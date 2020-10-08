import AbstractComponent from '../abstract-component.js';

export default class PageHeader extends AbstractComponent {
  getTemplate() {
    return `<header class="page-header">
      <div class="container">
        <img
          class="logo"
          src="./img/Logo.svg"
          alt="Логотип Aviasales"
          width="82"
          height="89"
        />
      </div>
    </header>`;
  }
}
