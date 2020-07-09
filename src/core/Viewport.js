import { MessageDispatcher } from "../messages/MessageDispatcher";
import { Rectangle } from "../geom/Rectangle";
import { Orientation } from "../display/Orientation";
import { Debug } from "./Debug";
import { Message } from "../messages/Message";
import { Black } from "../Black";

/**
 * Manages viewport, handles DOM container resize events and updates internal data.
 * When firing `resize` event stage bounds will be not up to date. Listen for stage's `resize` message instead.
 *
 * @cat core
 * @fires Viewport#resize
 * @extends black-engine~MessageDispatcher
 */
export class Viewport extends MessageDispatcher {
  /**
   * constructor
   * @param {HTMLElement|null} containerElement The native HTML element.
   * @return {void}
   */
  constructor(containerElement = null) {
    super();

    /** 
     * @private 
     * @type {HTMLElement|null} 
     */
    this.mContainerElement = containerElement;

    /** 
     * @private 
     * @type {HTMLElement|Element|null} 
     */
    this.mViewportElement = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mSize = new Rectangle();

    /** 
     * @private 
     * @type {boolean} 
     */
    this.isTransparent = true;

    /** 
     * @private 
     * @type {number} 
     */
    this.backgroundColor = 0x000000;

    /** 
     * @private 
     * @type {number} 
     */
    this.mChecksLeftSeconds = 0;

    /** 
     * @private 
     * @type {black-engine~Orientation} 
     */
    this.mOrientation = Orientation.UNIVERSAL;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mOrientationLock = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mRotation = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsPrimary = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mReflect = false;

    /**
     * @private
     * @type {Function}
     */
    this.mBoundResize;

    this.__initialize();
  }

  /**
   * @ignore
   */
  __initialize() {
    this.mViewportElement = /** @type {HTMLElement} */ (document.createElement('div'));
    this.mViewportElement.style.position = 'relative';
    this.mContainerElement.appendChild(this.mViewportElement);

    let style = this.mContainerElement.style;
    style.userSelect = 'none';
    style.touchAction = 'none';
    style.cursor = 'auto';
    style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';

    let size = this.mContainerElement.getBoundingClientRect();
    this.mSize.set(size.left, size.top, size.width, size.height);

    this.mIsPrimary = this.isPrimary();

    this.__onResize();

    this.mBoundResize = x => this.__onResize();
    window.addEventListener('resize', this.mBoundResize);
  }

  isPrimary() {
    const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;

    if (orientation === 'landscape-primary' || orientation === 'portrait-primary')
      return true;
    else if (orientation === 'landscape-secondary' || orientation === 'portrait-secondary')
      return false;

    Debug.warn('The orientation API isn\'t supported in this browser');

    return true;
  }

  /**
   * Gets/Sets stage orientation.
   *
   * @returns {black-engine~Orientation}
   */
  get orientation() {
    return this.mOrientation;
  }

  /**
   * @param {black-engine~Orientation} value
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

    this.mChecksLeftSeconds -= Black.time.delta;
  }

  /**
   * Refreshes viewport size and posts Message.RESIZE message. Make sure to refresh stage too in case container has changed its size.
   */
  refresh() {
    this.__onResize();
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

    if (this.mIsPrimary !== wasPrimary)
      this.mReflect = !this.mReflect;

    if (this.mOrientationLock && this.mOrientation !== deviceOrientation) {
      this.mRotation = this.mReflect ? -1 : 1;

      viewportElementStyle.transform = this.mReflect ? 'rotate(-90deg)' : 'rotate(90deg)';
      viewportElementStyle.left = (size.width - size.height) * 0.5 + 'px';
      viewportElementStyle.top = (size.height - size.width) * 0.5 + 'px';
      viewportElementStyle.width = size.height + 'px';
      viewportElementStyle.height = size.width + 'px';

      dispatchSize.width = size.height;
      dispatchSize.height = size.width;
    } else {
      this.mRotation = 0;

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

  dispose() {
    this.mViewportElement.remove();
    window.removeEventListener('resize', this.mBoundResize);
  }

  /**
   * Returns the size of a viewport.
   *
   * @return {black-engine~Rectangle}
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

  /**
   * Returns viewport orientation. 
   * 
   * -1 is for -90 degrees
   * 0 is for 0 degrees
   * 1 is for 90 degrees
   * 
   * @returns {number}
   */
  get rotation() {
    return this.mRotation;
  }
  // TODO: dispose, remove resize event

  /**
   * Returns true if device is in landscape orientation.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isLandscape() {
    return this.size.width >= this.size.height;
  }

  /**
   * Returns true if device is in portrait orientation.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isPortrait() {
    return !this.isLandscape;
  }
}
