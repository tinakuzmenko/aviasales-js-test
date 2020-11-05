export default class ScrollObserver {
  constructor(handler) {
    this._handler = handler;

    this._options = {
      root: null,
      rootMargin: '0px 0px 500px 0px',
      threshold: 1.0,
    };
    this._observer = new IntersectionObserver(this._handler, this._options);
    this._prevTarget = null;
  }

  setTarget(target) {
    if (this._prevTarget) {
      this._observer.unobserve(this._prevTarget);
    }

    if (target === this._prevTarget) {
      return;
    }

    this._observer.observe(target);
    this._prevTarget = target;
  }
}
