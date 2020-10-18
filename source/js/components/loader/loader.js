import AbstractComponent from '../abstract-component.js';

export default class Loader extends AbstractComponent {
  getTemplate() {
    return `<img src="/img/loader.svg" alt="Loader" width="100%" />`;
  }
}
