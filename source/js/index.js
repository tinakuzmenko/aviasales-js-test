import PageFilter from './components/filter/filter';
import PageHeader from './components/page-header/page-header';
import PageMain from './components/page-main/page-main';
import Sort from './components/sort/sort';
import Ticket from './components/ticket/ticket';
import TicketsContainer from './components/tickets/tickets';
import { RenderPosition } from './helpers/constants.js';
import { render } from './helpers/render.js';
import API from './api/api';
import TicketsModel from './model/tickets';

const api = new API();

const pageHeaderComponent = new PageHeader();
const pageMainComponent = new PageMain();
const pageFilterComponent = new PageFilter();
const ticketsContainerComponent = new TicketsContainer();
const sortComponent = new Sort();

render(document.body, pageHeaderComponent);
render(document.body, pageMainComponent);

const mainContentWrapper = document.querySelector('.main-content-wrapper');

render(mainContentWrapper, pageFilterComponent);
render(mainContentWrapper, ticketsContainerComponent);

const ticketsWrapper = mainContentWrapper.querySelector('.tickets__wrapper');

render(ticketsWrapper, sortComponent, RenderPosition.BEFOREBEGIN);

const renderTicket = ticket => {
  const ticketComponent = new Ticket(ticket);
  render(ticketsWrapper, ticketComponent);
};

const getAllTickets = (tickets, status) => {
  if (status) {
    for (let i = 0; i < 5; i++) {
      renderTicket(tickets[i]);
    }
  }
};

const ticketsModel = new TicketsModel(api, getAllTickets);
ticketsModel.getTickets();
