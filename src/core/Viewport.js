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

    /** @private @type {HTMLElement} */
    this.mViewportElement = document.createElement('div');
    this.mViewportElement.style.position = 'relative';
    containerElement.appendChild(this.mViewportElement);

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

    /** @private @type {Orientation} */
    this.mOrientation = Orientation.UNIVERSAL;

    /** @private @type {boolean} */
    this.mOrientationLock = false;

    this.mIsPrimary = this.isPrimary();
    this.mReflect = false;

    this.__onResize();
    window.addEventListener('resize', x => this.__onResize());
  }

  isPrimary() {
    const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;

    if (orientation === 'landscape-primary' || orientation === 'portrait-primary') {
      return true;
    } else if (orientation === 'landscape-secondary' || orientation === 'portrait-secondary') {
      return false;
    }

    console.log('The orientation API isn\'t supported in this browser');

    return true;
  }

  /**
   * Gets/Sets stage orientation.
   *
   * @returns {Orientation}
   */
  get orientation() {
    return this.mOrientation;
  }

  /**
   * @ignore
   * @param {Orientation} value
   * @returns {void}
   */
  set orientation(value) {
    this.mOrientation = value;
    this.__onResize();
  }

  /**
   * Gets/sets whenever stage orientation should be locked. If false and orientation is not universal stage will remain same size in both orientation.
   * @returns {boolean}
   */
  get orientationLock() {
    return this.mOrientationLock;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @returns {void}
   */
  set orientationLock(value) {
    this.mOrientationLock = value;
    this.__onResize();
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
    const viewportElementStyle = this.mViewportElement.style;
    const size = this.mContainerElement.getBoundingClientRect();
    const deviceOrientation = size.width > size.height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;

    const dispatchSize = Rectangle.pool.get().copyFrom(size);
    const wasPrimary = this.mIsPrimary;
    this.mIsPrimary = this.isPrimary();

    if (this.mIsPrimary !== wasPrimary) {
      this.mReflect = !this.mReflect;
    }

    if (this.mOrientationLock && this.mOrientation !== deviceOrientation) {
      viewportElementStyle.transform = this.mReflect ? 'rotate(-90deg)' : 'rotate(90deg)';
      viewportElementStyle.left = (size.width - size.height) * 0.5 + 'px';
      viewportElementStyle.top = (size.height - size.width) * 0.5 + 'px';
      viewportElementStyle.width = size.height + 'px';
      viewportElementStyle.height = size.width + 'px';

      dispatchSize.width = size.height;
      dispatchSize.height = size.width;
    } else {
      this.mReflect = false;
      viewportElementStyle.transform = 'rotate(0deg)';
      viewportElementStyle.left = '0px';
      viewportElementStyle.top = '0px';
      viewportElementStyle.width = size.width + 'px';
      viewportElementStyle.height = size.height + 'px';
    }

    if (this.mSize.equals(dispatchSize) === true)
      return;

    this.mSize.copyFrom(dispatchSize);

    /**
     * Posted every time viewport size has changed.
     * @event Viewport#resize
     */
    this.post(Message.RESIZE, dispatchSize);

    this.mChecksLeftSeconds = 1;
    Rectangle.pool.release(dispatchSize);
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
   * Returns the HTML container element the viewport runs in.
   *
   * @return {Element}
   */
  get nativeElement() {
    return this.mViewportElement;
  }

  // TODO: dispose, remove resize event
}
