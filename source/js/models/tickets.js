import Ticket from '../components/ticket/ticket';
import { filterValuesMap } from '../helpers/constants';
import { render } from '../helpers/render';
import Error from '../components/error/error';

export default class TicketsModel {
  constructor(api) {
    this._api = api;
    this._isServerSearchStop = false;
    this._tickets = [];
    this._filteredTickets = [];
    this._sortType = 'cheap';
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
    this._filteredTickets = this._sortTickets(
      this._filteredTickets,
      this._sortType,
    );

    this._clearTicketsBoard();
    this._renderTickets(this._filteredTickets);
  }

  filterTickets(activeFilters) {
    this._filteredTickets = [];

    if (!activeFilters || activeFilters.includes('all')) {
      this._filteredTickets = [...this._tickets];
    } else {
      this._filteredTickets = this._tickets.filter(ticket => {
        const firstSegmentStops = ticket.segments[0].stops.length;
        const secondSegmentStops = ticket.segments[1].stops.length;

        if (
          activeFilters.includes(filterValuesMap[firstSegmentStops]) &&
          activeFilters.includes(filterValuesMap[secondSegmentStops])
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
  }

  _renderTickets(tickets) {
    if (tickets.length !== 0) {
      for (let i = 0; i < 5; i++) {
        this._renderTicket(tickets[i]);
      }
    } else {
      this._renderError(
        'Извините, по выбранным вами параметрам ничего не найдено.',
      );
    }
  }

  _renderTicket(ticket) {
    const ticketComponent = new Ticket(ticket);
    render(this._ticketsWrapper, ticketComponent);
  }

  _renderError(errorMessage) {
    const errorComponent = new Error(errorMessage);
    render(this._ticketsWrapper, errorComponent);
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
}
