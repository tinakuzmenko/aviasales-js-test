import AbstractComponent from '../abstract-component.js';

export default class PageFilter extends AbstractComponent {
  getTemplate() {
    return `<aside class="filter main-content-wrapper__filter">
      <h2 class="filter__title">Количество пересадок</h2>
      <form action="#" method="get">
        <input
          class="filter__checkbox visually-hidden"
          type="checkbox"
          name="all"
          id="all"
        />
        <label class="filter__checkbox-label" for="all">Все</label>
        <input
          class="filter__checkbox visually-hidden"
          type="checkbox"
          name="direct"
          id="direct"
        />
        <label class="filter__checkbox-label" for="direct">Без пересадок</label>
        <input
          class="filter__checkbox visually-hidden"
          type="checkbox"
          name="1-transfer"
          id="1-transfer"
        />
        <label class="filter__checkbox-label" for="1-transfer"
          >1 пересадка</label
        >
        <input
          class="filter__checkbox visually-hidden"
          type="checkbox"
          name="2-transfers"
          id="2-transfers"
        />
        <label class="filter__checkbox-label" for="2-transfers"
          >2 пересадки</label
        >
        <input
          class="filter__checkbox visually-hidden"
          type="checkbox"
          name="3-transfers"
          id="3-transfers"
        />
        <label class="filter__checkbox-label" for="3-transfers"
          >3 пересадки</label
        >
      </form>
    </aside>`;
  }
}
