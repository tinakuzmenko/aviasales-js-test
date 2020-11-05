import AbstractComponent from '../abstract-component';
import { ClassName, filterDescriptionsMap } from '../../utils/constants';

export default class PageFilter extends AbstractComponent {
  constructor() {
    super();
    this._filters = Object.keys(filterDescriptionsMap);
  }

  setFilterChangeHandler(handler) {
    this._formElement = this.getElement().querySelector('#filter-form');
    this._formElement.addEventListener(`change`, evt => {
      handler(evt.target);
    });
  }

  getTemplate() {
    return `<aside class="filter main-content-wrapper__filter">
      <h2 class="filter__title">Количество пересадок</h2>
      <form action="#" method="get" id="filter-form">
        ${this._filters
          .map(filter => this._createFilterTemplate(filter))
          .join('')}
      </form>
    </aside>`;
  }

  _createFilterTemplate(filter) {
    return `<input
          class="filter__checkbox ${ClassName.HIDDEN_CLASS}"
          type="checkbox"
          name="${filter}"
          id="${filter}"
          ${filter === 'all' ? 'checked' : ''}
        />
        <label class="filter__checkbox-label" for="${filter}"
          >${filterDescriptionsMap[filter]}</label
        >`;
  }
}
