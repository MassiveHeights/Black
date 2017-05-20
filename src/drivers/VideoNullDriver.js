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
   * @param {type} msg
   * @param {type} rect
   *
   * @returns {type}
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
  start() {}


  /**
   * Called before rendering anything. Usually used to clear back-buffer.
   *
   * @protected
   *
   * @returns {void}
   */
  beginFrame() {}


  /**
   * Called after rendering is finished.
   * @protected
   *
   * @returns {void}
   */
  endFrame() {}

  /**
   * @ignore
   * @param {HTMLElement} canvas
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas){
    return null;
  }

  /**
   * Sets world transformation for future use.
   *
   * @protected
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
   * @protected
   *
   * @param  {Texture} texture
   * @param  {Texture} bounds
   */
  drawImage(texture, bounds) {}

  /**
   * Draws text onto back-buffer.
   *
   * @protected
   *
   * @param {string} text Text string to draw.
   * @param {TextInfo} style The style information.
   * @param {Rectangle} bounds Clipping bounds, text wont be drawn outside this bounds.
   * @param {number} textWidth The width of the text.
   * @param {number} textHeight The height of the text.
   *
   * @return {void}
   */
  drawText(text, style, bounds, textWidth, textHeight) {}


  /**
   * Clears back-buffer.
   *
   * @protected
   *
   * @returns {void}
   */
  clear() {}

  /**
   * Used to save context if extists.
   *
   * @ignore
   * @protected
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void}
   */
  save(gameObject) {}


  /**
   * Used to restore context if extists.
   *
   * @protected
   * @ignore
   * @returns {type}
   */
  restore() {}


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
   * @param {string} text    Text to measure.
   * @param {TextInfo} style Text style to apply onto text.
   *
   * @return {Vector} A Vector with width and height of the text bounds.
   */
  measureText(text, style) {
    let el = this.mMeasureElement;
    el.innerHTML = text;
    el.style.whiteSpace = 'pre';
    el.style.fontSize = style.size + 'px';
    el.style.fontFamily = style.name;
    el.style.fontStyle = style.style;
    el.style.fontWeight = style.weight;

    let v = new Vector(el.offsetWidth + style.strokeThickness, el.offsetHeight + style.strokeThickness);
    el.innerHTML = '';

    return v;
  }
}
