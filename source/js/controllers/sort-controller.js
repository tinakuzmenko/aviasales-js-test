import { render } from '../utils/render.js';
import { debounce } from '../utils/debounce';
import Sort from '../components/sort/sort';
import { RenderPosition } from '../utils/constants';

export default class SortController {
  constructor(container, ticketsModel) {
    this._container = container;
    this._ticketsModel = ticketsModel;
    this._sortComponent = null;
    this._activeSort = 'cheap';

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  render() {
    this._sortComponent = new Sort();

    this._sortComponent.setSortChangeHandler(debounce(this._sortChangeHandler));

    render(this._container, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _sortChangeHandler(activeSort) {
    this._activeSort = activeSort;
    this._ticketsModel.setActiveSort(this._activeSort);
  }
}
