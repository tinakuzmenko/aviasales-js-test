import AbstractComponent from '../abstract-component.js';
import { ClassName } from '../../helpers/constants';

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._sort = 'cheap';
    this._currentActiveSortElement = null;
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`click`, evt => {
      if (evt.target.id !== this._sort) {
        this._changeActiveClass(evt.target);
        this._sort = evt.target.id;
        handler(this._sort);
      }
    });
  }

  getTemplate() {
    return `<div class="sort tickets__sort">
        <button class="sort__button sort__button--active" type="button" id="cheap">
          Самый дешевый
        </button>
        <button class="sort__button" type="button" id="fast">Самый быстрый</button>
      </div>`;
  }

  _changeActiveClass(newSortElement) {
    this._currentActiveSortElement = this.getElement().querySelector(
      `#${this._sort}`,
    );
    this._currentActiveSortElement.classList.remove(
      ClassName.SORT_ACTIVE_CLASS,
    );
    newSortElement.classList.add(ClassName.SORT_ACTIVE_CLASS);
  }
}
