import AbstractComponent from '../abstract-component';
import { HIDDEN_CLASS, filterMap } from '../../helpers/constants';

export default class PageFilter extends AbstractComponent {
  constructor() {
    super();

    this._filters = Object.keys(filterMap);
    this._activeFilters = ['all'];

    this._filtersElements = this.getElement().querySelectorAll(
      'input[type="checkbox"]',
    );
    this._filterAll = this.getElement().querySelector('#all');
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, evt => {
      this._activeFilters = [];

      if (evt.target.id === this._filterAll.id && this._filterAll.checked) {
        this._chooseAllTickets();
      } else {
        this._chooseFilters();
      }

      handler(this._activeFilters);
    });
  }

  getTemplate() {
    return `<aside class="filter main-content-wrapper__filter">
      <h2 class="filter__title">Количество пересадок</h2>
      <form action="#" method="get">
        ${this._filters
          .map(filter => this._createFilterTemplate(filter))
          .join('')}
      </form>
    </aside>`;
  }

  _createFilterTemplate(filter) {
    return `<input
          class="filter__checkbox ${HIDDEN_CLASS}"
          type="checkbox"
          name="${filter}"
          id="${filter}"
          ${filter === 'all' ? 'checked' : ''}
        />
        <label class="filter__checkbox-label" for="${filter}"
          >${filterMap[filter]}</label
        >`;
  }

  _chooseAllTickets() {
    this._filtersElements.forEach(filterElement => {
      filterElement.checked = filterElement.id === this._filterAll.id;
    });

    this._activeFilters.push(this._filterAll.id);
    this._activeFilters = this._activeFilters.filter(
      activeFilter => activeFilter === this._filterAll.id,
    );
  }

  _chooseFilters() {
    this._filterAll.checked = false;
    this._filtersElements.forEach(filterElement => {
      if (filterElement.checked && filterElement.id !== this._filterAll.id) {
        this._activeFilters.push(filterElement.id);
      }
    });
  }
}
