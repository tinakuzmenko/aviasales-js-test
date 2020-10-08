import PageFilter from './components/filter/filter';
import PageHeader from './components/page-header/page-header';
import PageMain from './components/page-main/page-main';
import Sort from './components/sort/sort';
import Ticket from './components/ticket/ticket';
import TicketsContainer from './components/tickets/tickets';
import { RenderPosition } from './helpers/constants.js';
import { render } from './helpers/render.js';
import API from './api/api';

const pageHeaderComponent = new PageHeader();
const pageMainComponent = new PageMain();
const pageFilterComponent = new PageFilter();
const ticketsContainerComponent = new TicketsContainer();
const sortComponent = new Sort();
const api = new API();

render(document.body, pageHeaderComponent);
render(document.body, pageMainComponent);

const mainContentWrapper = document.querySelector('.main-content-wrapper');

render(mainContentWrapper, pageFilterComponent);
render(mainContentWrapper, ticketsContainerComponent);

const ticketsWrapper = mainContentWrapper.querySelector('.tickets__wrapper');

render(ticketsWrapper, sortComponent, RenderPosition.BEFOREBEGIN);

api.getSearchID().then(response => {
  const searchId = response.searchId;

  api.getData(searchId).then(serverData => {
    const tickets = serverData.tickets;

    tickets.forEach(ticket => {
      const ticketComponent = new Ticket(ticket);
      render(ticketsWrapper, ticketComponent);
    });
  });
});
