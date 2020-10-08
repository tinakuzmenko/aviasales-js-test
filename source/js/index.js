import PageFilter from './components/filter/filter';
import PageHeader from './components/page-header/page-header';
import PageMain from './components/page-main/page-main';
import Sort from './components/sort/sort';
import Ticket from './components/ticket/ticket';
import TicketsContainer from './components/tickets/tickets';
import { RenderPosition } from './helpers/constants.js';
import { render } from './helpers/render.js';

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

const renderTickets = amount => {
  for (let i = 0; i < amount; i++) {
    const ticketComponent = new Ticket();
    render(ticketsWrapper, ticketComponent);
  }
};

renderTickets(5);
