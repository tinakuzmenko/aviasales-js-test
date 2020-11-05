import Ticket from '../components/ticket/ticket';
import Error from '../components/error/error';
import ScrollObserver from '../observers/scroll-observer';
import { filterValuesMap, MIN_SHOWN_TICKETS } from '../utils/constants';
import { remove, render } from '../utils/render';

export default class TicketsModel {
  constructor(api, counter, loader) {
    this._api = api;
    this._counter = counter;
    this._loader = loader;

    this._filteredTickets = [];
    this._id = '';
    this._shownTickets = 0;
    this._sortType = 'cheap';
    this._tickets = [];
    this._ticketsWrapper = null;

    this._catchLoadErrorHandler = this._catchLoadErrorHandler.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);
  }

  async fetchData() {
    const serverData = await this._api
      .getData(this._id.searchId)
      .catch(this._catchLoadErrorHandler);

    if (serverData) {
      this._tickets = [...this._tickets, ...serverData.tickets];

      if (serverData.stop) {
        this._filteredTickets = this._sortTickets([...this._tickets]);
        this._rerenderTicketsBoard();

        return;
      }
    }

    if (!serverData || !serverData.stop) {
      setTimeout(() => {
        this.fetchData();
      }, 100);
    }
  }

  async initTickets(ticketsWrapper) {
    this._ticketsWrapper = ticketsWrapper;
    this._id = await this._api.getSearchID().catch(this._catchLoadErrorHandler);
    await this.fetchData();
  }

  setActiveSort(activeSort) {
    this._sortType = activeSort;
    this._shownTickets = 0;

    this._filteredTickets = this._sortTickets(
      this._filteredTickets,
      this._sortType,
    );

    this._rerenderTicketsBoard();
  }

  setActiveFilters(activeFilters) {
    this._filteredTickets = [];
    this._shownTickets = 0;

    if (!activeFilters || activeFilters.includes('all')) {
      this._filteredTickets = [...this._tickets];
    } else {
      this._applyFilters(activeFilters);
    }

    this._filteredTickets = this._sortTickets(
      this._filteredTickets,
      this._sortType,
    );

    this._rerenderTicketsBoard();
  }

  _renderTickets() {
    if (!this._scrollObserver) {
      this._createScrollObserver();
    }

    if (this._filteredTickets.length !== 0) {
      const shownTicketsAmount = this._shownTickets + MIN_SHOWN_TICKETS;

      for (let i = this._shownTickets; i < shownTicketsAmount; i++) {
        this._renderTicket(this._filteredTickets[i]);
        this._shownTickets++;
      }

      const newTarget = this._ticketsWrapper.lastChild;
      this._scrollObserver.setTarget(newTarget);
    }

    if (this._filteredTickets.length === 0 && this._shownTickets === 0) {
      this._renderError(
        'Извините, по выбранным вами параметрам ничего не найдено.',
      );
    }
  }

  _renderTicket(ticket) {
    if (!ticket) {
      return;
    }

    const ticketComponent = new Ticket(ticket);
    render(this._ticketsWrapper, ticketComponent);
  }

  _renderError(errorMessage) {
    const errorComponent = new Error(errorMessage);

    this._clearTicketsBoard();
    render(this._ticketsWrapper, errorComponent);
  }

  _sortTickets(tickets, sortType = 'cheap') {
    switch (sortType) {
      case 'cheap':
        return tickets.sort(
          (prevTicket, nextTicket) => prevTicket.price - nextTicket.price,
        );
      case 'fast':
        return tickets.sort((prevTicket, nextTicket) => {
          const prevDuration =
            prevTicket.segments[0].duration + prevTicket.segments[1].duration;
          const nextDuration =
            nextTicket.segments[0].duration + nextTicket.segments[1].duration;
          return prevDuration - nextDuration;
        });
    }
  }

  _applyFilters(activeFilters) {
    this._filteredTickets = this._tickets.filter(ticket => {
      if (
        activeFilters.includes(
          filterValuesMap[ticket.segments[0].stops.length],
        ) &&
        activeFilters.includes(filterValuesMap[ticket.segments[1].stops.length])
      ) {
        return ticket;
      }
    });
  }

  _clearTicketsBoard() {
    this._ticketsWrapper.innerHTML = '';
  }

  _rerenderTicketsBoard() {
    this._counter.setTicketsCounter(this._filteredTickets.length);
    this._clearTicketsBoard();
    this._renderTickets();
  }

  _catchLoadErrorHandler() {
    this._renderError(
      'Произошла ошибка загрузки данных, пожалуйста, попробуйте позже',
    );
  }

  _createScrollObserver() {
    this._scrollObserver = new ScrollObserver(this._scrollHandler);
  }

  _scrollHandler(entries) {
    entries.forEach(entry => {
      render(this._ticketsWrapper, this._loader);

      if (entry.isIntersecting) {
        setTimeout(() => {
          remove(this._loader);
          this._renderTickets();
        }, 2000);
      }
    });
  }
}
