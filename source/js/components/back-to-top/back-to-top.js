import AbstractComponent from '../abstract-component';
import { ClassName } from '../../utils/constants';

export default class BackToTop extends AbstractComponent {
  constructor() {
    super();
    this._button = null;
    this._setHandlers();

    this._backToTopClickHandler = this._backToTopClickHandler.bind(this);
  }

  getTemplate() {
    return `<a class="back-to-top ${ClassName.HIDDEN_CLASS}" href="#" title="Наверх"></a>`;
  }

  _setHandlers() {
    this._button = this.getElement();
    this._button.addEventListener('click', this._backToTopClickHandler);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this._show();
      } else {
        this._hide();
      }
    });
  }

  _backToTopClickHandler(evt) {
    evt.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  _show() {
    this._button.classList.remove(ClassName.HIDDEN_CLASS);
  }

  _hide() {
    this._button.classList.add(ClassName.HIDDEN_CLASS);
  }
}
