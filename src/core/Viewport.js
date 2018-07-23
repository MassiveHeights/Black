/**
 * Manages viewport, handles DOM container resize events and updates internal data.
 * When firing `resize` event stage bounds will be not up to date. Listen for stage's `resize` message instead.
 * 
 * @cat core
 * @fires Viewport#resize
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Viewport extends MessageDispatcher {
  /**
   * constructor
   * @param {HTMLElement} containerElement The native HTML element.
   * @return {void}
   */
  constructor(containerElement) {
    super();

    /** @private @type {HTMLElement} */
    this.mContainerElement = containerElement;

    let style = this.mContainerElement.style;
    style.userSelect = 'none';
    style.touchAction = 'none';
    //style.overflow = 'hidden';
    style.cursor = 'auto';
    style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';

    let size = this.mContainerElement.getBoundingClientRect();

    /** @private @type {Rectangle} */
    this.mSize = new Rectangle(size.left, size.top, size.width, size.height);

    this.isTransparent = true;
    this.backgroundColor = 0x222222;

    this.mChecksLeftSeconds = 0;

    window.addEventListener('resize', x => this.__onResize());
  }

  /**
   * @private
   * @ignore
   */
  __update() {
    if (this.mChecksLeftSeconds <= 0)
      return;

    this.__onResize();

    this.mChecksLeftSeconds -= Time.delta;
  }

  /**
   * @private
   * @ignore
   */
  __onResize() {
    let size = this.mContainerElement.getBoundingClientRect();

    let newSize = Rectangle.pool.get().set(size.left, size.top, size.width, size.height);

    if (this.mSize.equals(newSize) === true)
      return;

    this.mSize.copyFrom(newSize);

    /**
     * Posted every time viewport size has changed.
     * @event Viewport#resize
     */
    this.post(Message.RESIZE, this.mSize);

    this.mChecksLeftSeconds = 1;
    Rectangle.pool.release(newSize);
  }

  /**
   * Returns the size of a viewport.
   *
   * @return {Rectangle}
   */
  get size() {
    return this.mSize;
  }

  /**
   * nativeDOM - Returns the HTML container element the engine runs in.
   * 
   * @return {Element}
   */
  get nativeDOM() {
    return this.mContainerElement;
  }

  // TODO: dispose, remove resize event
}
