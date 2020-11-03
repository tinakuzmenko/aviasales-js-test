import Ticket from '../components/ticket/ticket';
import { filterValuesMap, MIN_SHOWN_TICKETS } from '../helpers/constants';
import { render } from '../helpers/render';
import Error from '../components/error/error';
import LazyLoadingObserver from '../observers/lazy-loading-observer';

export default class TicketsModel {
  constructor(api) {
    this._api = api;
    this._isServerSearchStop = false;
    this._tickets = [];
    this._filteredTickets = [];
    this._sortType = 'cheap';
    this._shownTickets = 0;

    this._intersectionHandler = this._intersectionHandler.bind(this);
  }

  async fetchData() {
    const serverData = await this._api.getData(this._id.searchId);

    if (serverData) {
      this._tickets = [...this._tickets, ...serverData.tickets];

      if (serverData.stop) {
        this._isServerSearchStop = !this._isServerSearchStop;
        this._filteredTickets = this._sortTickets([...this._tickets]);

        this._clearTicketsBoard();
        this._renderTickets(this._filteredTickets);
        this._initLazyLoading();
        this._lazyLoadingObserver.observeIntersection();

        return;
      }
    }

    if (!serverData || !serverData.stop) {
      setTimeout(() => {
        this.fetchData(this._id.searchId);
      }, 100);
    }
  }

  async initTickets(ticketsWrapper) {
    this._ticketsWrapper = ticketsWrapper;
    this._id = await this._api.getSearchID();
    await this.fetchData();
  }

  setActiveSort(activeSort) {
    this._sortType = activeSort;
    this._shownTickets = 0;

    this._filteredTickets = this._sortTickets(
      this._filteredTickets,
      this._sortType,
    );

    this._clearTicketsBoard();
    this._renderTickets(this._filteredTickets);
    this._lazyLoadingObserver.observeIntersection();
  }

  filterTickets(activeFilters) {
    this._filteredTickets = [];
    this._shownTickets = 0;

    if (!activeFilters || activeFilters.includes('all')) {
      this._filteredTickets = [...this._tickets];
    } else {
      this._filteredTickets = this._tickets.filter(ticket => {
        if (
          activeFilters.includes(
            filterValuesMap[ticket.segments[0].stops.length],
          ) &&
          activeFilters.includes(
            filterValuesMap[ticket.segments[1].stops.length],
          )
        ) {
          return ticket;
        }
      });
    }

    this._filteredTickets = this._sortTickets(
      this._filteredTickets,
      this._sortType,
    );

    this._clearTicketsBoard();
    this._renderTickets(this._filteredTickets);
    this._lazyLoadingObserver.observeIntersection();
  }

  _renderError(errorMessage) {
    const errorComponent = new Error(errorMessage);
    render(this._ticketsWrapper, errorComponent);
  }

  _renderTickets(tickets) {
    if (tickets.length !== 0) {
      const shownTicketsAmount = this._shownTickets + MIN_SHOWN_TICKETS;

      for (let i = this._shownTickets; i < shownTicketsAmount; i++) {
        this._renderTicket(tickets[i]);
        this._shownTickets++;
      }

      console.log('rendering new pack of tickets!');
      console.log(this._shownTickets);
    }

    if (tickets.length === 0 && this._shownTickets === 0) {
      this._renderError(
        'Извините, по выбранным вами параметрам ничего не найдено.',
      );
    }

    if (tickets.length === 0) {
      this._renderError('Это все найденные билеты.');
    }
  }

  _renderTicket(ticket) {
    const ticketComponent = new Ticket(ticket);
    render(this._ticketsWrapper, ticketComponent);
  }

  _clearTicketsBoard() {
    this._ticketsWrapper.innerHTML = '';
  }

  _sortTickets(tickets, sortType = 'cheap') {
    switch (sortType) {
      case 'cheap':
        return tickets.sort(
          (prevTicket, nextTicket) => prevTicket.price - nextTicket.price,
        );
      case 'fast':
        return tickets.sort((prevTicket, nextTicket) => {
          const prevTicketDuration = parseInt(
            prevTicket.segments[0].duration + prevTicket.segments[1].duration,
            10,
          );
          const nextTicketDuration = parseInt(
            nextTicket.segments[0].duration + nextTicket.segments[1].duration,
            10,
          );
          return prevTicketDuration - nextTicketDuration;
        });
    }
  }

  _intersectionHandler() {
    setTimeout(() => this._renderTickets(this._filteredTickets), 1000);
  }

  _initLazyLoading() {
    this._options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    this._lazyLoadingObserver = new LazyLoadingObserver(
      this._ticketsWrapper,
      this._intersectionHandler,
      this._options,
    );
  }
}
