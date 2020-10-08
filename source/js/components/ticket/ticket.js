import AbstractComponent from '../abstract-component.js';

export default class Ticket extends AbstractComponent {
  getTemplate() {
    return `<div class="ticket tickets__item">
          <div class="ticket__wrapper">
            <p class="ticket__price">13 400 Р</p>
            <img
              class="ticket__avia-logo"
              src="./img/s7-logo.png"
              alt="Логотип авиакомпании"
              width="110"
              height="36"
            />
          </div>
          <div class="ticket__row">
            <div class="ticket__col">
              <p class="ticket__label">
                <span class="ticket__origin"> MOW </span>
                –
                <span class="ticket__destination">HKT</span>
              </p>
              <p class="ticket__value">
                <time class="ticket__start-time">10:45</time>
                –
                <time class="ticket__end-time">08:00</time>
              </p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">В пути</p>
              <p class="ticket__value">21ч 15м</p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">2 пересадки</p>
              <p class="ticket__value">HKG, JNB</p>
            </div>
          </div>
          <div class="ticket__row">
            <div class="ticket__col">
              <p class="ticket__label">
                <span class="ticket__origin"> MOW </span>
                –
                <span class="ticket__destination">HKT</span>
              </p>
              <p class="ticket__value">
                <time class="ticket__start-time">11:20</time>
                –
                <time class="ticket__end-time">00:50</time>
              </p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">В пути</p>
              <p class="ticket__value">13ч 30м</p>
            </div>
            <div class="ticket__col">
              <p class="ticket__label">1 пересадка</p>
              <p class="ticket__value">HKG</p>
            </div>
          </div>
        </div>`;
  }
}
