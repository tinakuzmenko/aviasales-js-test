import PageFilter from '../../components/filter/filter';
import { render } from '../../helpers/render.js';
import { debounce } from '../../helpers/debounce';

export default class FilterController {
  constructor(container, ticketsModel) {
    this._container = container;
    this._ticketsModel = ticketsModel;
    this._filterComponent = null;
    this._filtersElements = null;
    this._filterAllTickets = null;
    this._activeFilters = ['all'];

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  render() {
    this._filterComponent = new PageFilter();

    this._filterComponent.setFilterChangeHandler(
      debounce(this._filterChangeHandler),
    );

    render(this._container, this._filterComponent);

    this._filtersElements = this._filterComponent
      .getElement()
      .querySelectorAll('input[type="checkbox"]');
    this._filterAllTickets = this._filterComponent
      .getElement()
      .querySelector('#all');
  }

  _filterChangeHandler(filter) {
    this._activeFilters = [];

    if (
      filter.id === this._filterAllTickets.id &&
      this._filterAllTickets.checked
    ) {
      this._setAllTicketsFilter();
    } else {
      this._setFilters();
    }

    this._ticketsModel.filterTickets(this._activeFilters);
  }

  _setAllTicketsFilter() {
    this._filtersElements.forEach(filterElement => {
      filterElement.checked = filterElement.id === this._filterAllTickets.id;
    });

    this._activeFilters.push(this._filterAllTickets.id);
    this._activeFilters = this._activeFilters.filter(
      activeFilter => activeFilter === this._filterAllTickets.id,
    );
  }

  _setFilters() {
    this._filterAllTickets.checked = false;
    this._filtersElements.forEach(filterElement => {
      if (
        filterElement.checked &&
        filterElement.id !== this._filterAllTickets.id
      ) {
        this._activeFilters.push(filterElement.id);
      }
    });
  }
}
