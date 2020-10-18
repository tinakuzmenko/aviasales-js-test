import AbstractComponent from '../abstract-component';
import { filterMap } from '../../helpers/constants';

export default class PageFilter extends AbstractComponent {
  constructor() {
    super();

    this.filters = Object.keys(filterMap);
    this.activeFilters = ['all'];
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, evt => {
      const filter = evt.target;

      if (filter.checked) {
        this.activeFilters.push(evt.target.id);
      } else {
        this.activeFilters = this.activeFilters.filter(
          activeFilter => activeFilter !== filter.id,
        );
      }

      handler(this.activeFilters);
    });
  }

  getTemplate() {
    return `<aside class="filter main-content-wrapper__filter">
      <h2 class="filter__title">Количество пересадок</h2>
      <form action="#" method="get">
        ${this.filters
          .map(filter => this.createFilterTemplate(filter))
          .join('')}
      </form>
    </aside>`;
  }

  createFilterTemplate(filter) {
    return `<input
          class="filter__checkbox visually-hidden"
          type="checkbox"
          name="${filter}"
          id="${filter}"
          ${filter === 'all' ? 'checked' : ''}
        />
        <label class="filter__checkbox-label" for="${filter}"
          >${filterMap[filter]}</label
        >`;
  }
}
