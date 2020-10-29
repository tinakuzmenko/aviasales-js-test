import { render } from '../helpers/render';
import Ticket from '../components/ticket/ticket';
import { filterValuesMap } from '../helpers/constants';

export default class TicketsModel {
  constructor(api, loader) {
    this.api = api;
    this.isServerSearchStop = false;
    this.tickets = [];
    this.loader = loader;
  }

  async fetchData() {
    const serverData = await this.api.getData(this.id.searchId);

    if (serverData) {
      this.tickets = [...this.tickets, ...serverData.tickets];

      if (serverData.stop) {
        this.isServerSearchStop = !this.isServerSearchStop;
        this.renderTickets(this.tickets);
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

  filterTickets(activeFilters) {
    this.filteredTickets = [];
    console.log(activeFilters);
    if (activeFilters.includes('all')) {
      this.filteredTickets = [...this.tickets];
    } else {
      this.filteredTickets = this.tickets.filter(ticket => {
        const seg1 = ticket.segments[0].stops.length;
        const seg2 = ticket.segments[1].stops.length;

        if (
          activeFilters.includes(filterValuesMap[seg1]) &&
          activeFilters.includes(filterValuesMap[seg2])
        ) {
          return ticket;
        }
      });
    }

    console.log(this.filteredTickets);
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
}
