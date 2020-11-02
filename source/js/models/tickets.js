import { render } from '../helpers/render';
import Ticket from '../components/ticket/ticket';
import { filterValuesMap } from '../helpers/constants';

export default class TicketsModel {
  constructor(api, loader) {
    this.api = api;
    this.loader = loader;

    this.isServerSearchStop = false;
    this.tickets = [];
    this.filteredTickets = [];
    this._sortType = '';
  }

  async fetchData() {
    const serverData = await this.api.getData(this.id.searchId);

    if (serverData) {
      this.tickets = [...this.tickets, ...serverData.tickets];

      if (serverData.stop) {
        this.isServerSearchStop = !this.isServerSearchStop;

        this.filteredTickets = this._sortTickets(this.tickets.slice());
        this.renderTickets(this.filteredTickets);
        return;
      }
    }

    if (!serverData || !serverData.stop) {
      setTimeout(() => {
        this.fetchData(this.id.searchId);
      }, 100);
    }
  }

  async initTickets(ticketsWrapper) {
    this.ticketsWrapper = ticketsWrapper;
    this.id = await this.api.getSearchID();
    await this.fetchData();
  }

  setActiveSort(activeSort) {
    this._sortType = activeSort;
    this.filteredTickets = this._sortTickets(
      this.filteredTickets,
      this._sortType,
    );
    this.removeTickets();
    this.renderTickets(this.filteredTickets);
  }

  filterTickets(activeFilters) {
    this.filteredTickets = [];

    if (activeFilters.includes('all')) {
      this.filteredTickets = [...this.tickets];
    } else {
      this.filteredTickets = this.tickets.filter(ticket => {
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

    this.filteredTickets = this._sortTickets(
      this.filteredTickets,
      this._sortType,
    );
    this.renderTickets(this.filteredTickets);
  }

  renderTickets(tickets) {
    if (this.isServerSearchStop) {
      this.removeTickets();

      for (let i = 0; i < 5; i++) {
        const ticketComponent = new Ticket(tickets[i]);
        render(this.ticketsWrapper, ticketComponent);
      }
    }
  }

  removeTickets() {
    this.ticketsWrapper.innerHTML = '';
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
      default:
        return;
    }
  }
}
