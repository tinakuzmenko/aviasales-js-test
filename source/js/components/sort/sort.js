import AbstractComponent from '../abstract-component.js';

export default class Sort extends AbstractComponent {
  getTemplate() {
    return `<div class="sort tickets__sort">
        <button class="sort__button sort__button--active" type="button">
          Самый дешевый
        </button>
        <button class="sort__button" type="button">Самый быстрый</button>
      </div>`;
  }
}
