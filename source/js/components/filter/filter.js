import AbstractComponent from '../abstract-component';
import { HIDDEN_CLASS, filterMap } from '../../helpers/constants';

export default class PageFilter extends AbstractComponent {
  constructor() {
    super();
    this._filters = Object.keys(filterMap);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, evt => {
      handler(evt.target);
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
}
