import API from './api/api';
import Loader from './components/loader/loader';
import PageHeader from './components/page-header/page-header';
import PageMain from './components/page-main/page-main';
import TicketsContainer from './components/tickets/tickets';
import TicketsModel from './models/tickets';
import FilterController from './controllers/filter-controller/filter-controller';
import SortController from './controllers/sort-controller/sort-controller';
import { render } from './helpers/render.js';

const api = new API();
const loader = new Loader();
const ticketsModel = new TicketsModel(api);
const pageHeaderComponent = new PageHeader();
const pageMainComponent = new PageMain();
const ticketsContainerComponent = new TicketsContainer();

render(document.body, pageHeaderComponent);
render(document.body, pageMainComponent);

const mainContentWrapper = document.querySelector('.main-content-wrapper');
const filterController = new FilterController(mainContentWrapper, ticketsModel);

filterController.render();

render(mainContentWrapper, ticketsContainerComponent);

const ticketsWrapper = mainContentWrapper.querySelector('.tickets__wrapper');
const sortController = new SortController(ticketsWrapper, ticketsModel);

sortController.render();

render(ticketsWrapper, loader);

ticketsModel.initTickets(ticketsWrapper);
