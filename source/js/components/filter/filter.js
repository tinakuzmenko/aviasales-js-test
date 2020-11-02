import AbstractComponent from '../abstract-component';
import { ClassName, filterDescriptionsMap } from '../../helpers/constants';

export default class PageFilter extends AbstractComponent {
  constructor() {
    super();
    this._filters = Object.keys(filterDescriptionsMap);
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
