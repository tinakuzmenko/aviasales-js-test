import PageFilter from '../components/filter/filter';
import { render } from '../helpers/render.js';
import { debounce } from '../helpers/debounce';

export default class FilterController {
  constructor(container, ticketsModel) {
    this._container = container;
    this._ticketsModel = ticketsModel;
    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  render() {
    this._filterComponent = new PageFilter();

    this._filterComponent.setFilterChangeHandler(
      debounce(this._filterChangeHandler),
    );
    render(this._container, this._filterComponent);
  }

  _filterChangeHandler(activeFilters) {
    this._ticketsModel.filterTickets(activeFilters);
    console.log(activeFilters);
    // this._activeFilter = filter;
  }
}
