import AbstractComponent from '../abstract-component';

export default class Error extends AbstractComponent {
  constructor(errorMessage) {
    super();
    this._errorMessage = errorMessage;
  }

  getTemplate() {
    return `<p>${this._errorMessage}</p>`;
  }
}
