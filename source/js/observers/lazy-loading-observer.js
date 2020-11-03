export default class LazyLoadingObserver {
  constructor(wrapper, handler, options) {
    this._wrapper = wrapper;
    this._handler = handler;
    this._options = options;
  }

  observeIntersection() {
    const observer = new IntersectionObserver(this._handler, this._options);
    observer.observe(this._wrapper);
  }
}
