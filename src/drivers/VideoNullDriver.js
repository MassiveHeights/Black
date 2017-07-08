/**
 * Base class for custom video drivers. VideoDriver is used to render things
 * onto the screen.
 *
 * @cat drivers
 */
/* @echo EXPORT */
class VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement
   * @param  {number} width
   * @param  {number} height
   */
  constructor(containerElement, width, height) {
    /**
     * @private
     * @type {string}
     */
    this.mGlobalBlendMode = 'auto';

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mContainerElement = /**
     * @private
     * @type {HTMLElement} */ (containerElement
    );

    /**
     * @private
     * @type {number}
     */
    this.mClientWidth = width;

    /**
     * @private
     * @type {number}
     */
    this.mClientHeight = height;

    /**
     * @private
     * @type {Matrix}
     */
    this.mTransform = new Matrix();

    /**
     * @private
     * @type {number}
     */
    this.mGlobalAlpha = 1;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mMeasureElement = /** @type {HTMLElement} */ (document.createElement('span'));
    this.mMeasureElement.style.position = 'absolute';
    this.mContainerElement.appendChild(this.mMeasureElement);

    Black.instance.viewport.on('resize', this.__onResize, this);
  }


  /**
   * @protected
   * @ignore
   * @param {Message} msg
   * @param {Rectangle} rect
   *
   * @returns {void}
   */
  __onResize(msg, rect) {
    let w = this.mContainerElement.clientWidth;
    let h = this.mContainerElement.clientHeight;

    this.mClientWidth = w;
    this.mClientHeight = h;
  }

  /**
   * Initialization function.
   *
   * @protected
   *
   * @return {void}
   */
  start() {
  }


  /**
   * Called before rendering anything. Usually used to clear back-buffer.
   *
   * @protected
   *
   * @returns {void}
   */
  beginFrame() {
  }


  /**
   * Called after rendering is finished.
   * @protected
   *
   * @returns {void}
   */
  endFrame() {
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return null;
  }

  /**
   * Sets world transformation for future use.
   *
   * @public
   * @param {Matrix} m An transformation matrix to store.
   *
   * @return {void}
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * Gets/Sets the global alpha. Used to calculate alpha relative to parent
   * object.
   *
   * @protected
   *
   * @return {number}
   */
  get globalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * Gets/Sets global blending mode. Used to calculate blend mode relative to
   * parent object.
   *
   * @return {string}
   */
  get globalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * @ignore
   * @param {string} value
   *
   * @return {void}
   */
  set globalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * Draws image onto the back-buffer. GlobalAlpha, BlendMode and transformation
   * matrix must be set prior to calling this method.
   *
   * @public
   *
   * @param  {Texture} texture
   * @param  {number} px
   * @param  {number} py
   */
  drawImage(texture, px, py) {
  }

  /**
   * Draws text onto back-buffer.
   *
   * @public
   *
   * @param {TextField} text TextField object to draw.
   * @param {TextInfo} style The style information.
   * @param {Rectangle} bounds Clipping bounds, text will be drawn outside this bounds.
   *
   * @return {void}
   */
  drawText(text, style, bounds) {
  }


  /**
   * Clears back-buffer.
   *
   * @protected
   *
   * @returns {void}
   */
  clear() {
  }

  /**
   * Used to save context if extists.
   *
   * @ignore
   * @protected
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void}
   */
  save(gameObject) {
  }

  /**
   * Used to restore context if extists.
   *
   * @protected
   * @ignore
   * @returns {type}
   */
  restore() {
  }


  /**
   * Convers number color to hex string.
   *
   * @param {number} color The color to convert.
   *
   * @returns {string} The resuling hex string.
   */
  hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * Measures text with a given style.
   *
   * @param {TextField} textField    Text to measure.
   * @param {TextInfo} style Text style to apply onto text.
   * @param {Rectangle} bounds.
   *
   * @return {Rectangle} Local bounds.
   */
  measureText(textField, style, bounds) {
  }
}
