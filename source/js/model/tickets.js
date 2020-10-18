export default class TicketsModel {
  constructor(api, getAllTickets) {
    this.api = api;
    this.isServerSearchStop = false;
    this.tickets = [];
    this.getAllTickets = getAllTickets;
  }

  async fetchData() {
    const serverData = await this.api.getData(this.id.searchId);

    if (serverData) {
      this.tickets = [...this.tickets, ...serverData.tickets];

      if (serverData.stop) {
        this.isServerSearchStop = !this.isServerSearchStop;
        this.getAllTickets(this.tickets, this.isServerSearchStop);
        return;
      }
    }

    if (!serverData || !serverData.stop) {
      setTimeout(() => {
        console.log('Fetching again');
        this.fetchData(this.id.searchId);
      }, 100);
    }
  }

  async getTickets() {
    this.id = await this.api.getSearchID();
    await this.fetchData();

    if (this.isServerSearchStop) {
      this.getAllTickets(this.tickets);
    }
  }
}
