import PageFilter from '../../components/filter/filter';
import { render } from '../../utils/render.js';
import { debounce } from '../../utils/debounce';

export default class FilterController {
  constructor(container, ticketsModel) {
    this._container = container;
    this._ticketsModel = ticketsModel;

    this._activeFilters = ['all'];
    this._filterAllTicketsElement = null;
    this._filterComponent = null;
    this._filtersElements = null;

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
    this._filterAllTicketsElement = this._filterComponent
      .getElement()
      .querySelector('#all');
  }

  _filterChangeHandler(filter) {
    this._activeFilters = [];

    if (
      filter.id === this._filterAllTicketsElement.id &&
      this._filterAllTicketsElement.checked
    ) {
      this._setAllTicketsFilter();
    } else {
      this._setFilters();
    }

    this._ticketsModel.setActiveFilters(this._activeFilters);
  }

  _setAllTicketsFilter() {
    this._filtersElements.forEach(filterElement => {
      filterElement.checked =
        filterElement.id === this._filterAllTicketsElement.id;
    });

    this._activeFilters.push(this._filterAllTicketsElement.id);
    this._activeFilters = this._activeFilters.filter(
      activeFilter => activeFilter === this._filterAllTicketsElement.id,
    );
  }

  _setFilters() {
    this._filterAllTicketsElement.checked = false;
    this._filtersElements.forEach(filterElement => {
      if (
        filterElement.checked &&
        filterElement.id !== this._filterAllTicketsElement.id
      ) {
        this._activeFilters.push(filterElement.id);
      }
    });
  }
}
