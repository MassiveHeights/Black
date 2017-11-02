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
     * @protected
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

    this.mIdentityMatrix = new Matrix();

    this.mRenderers = [];
    this.mSkipChildren = false;
    this.mEndPassStack = [];
    this.mEndPassRenderer = null;

    /**
     * @private
     * @type {string}
     */
    this.mGlobalBlendMode = BlendMode.AUTO;

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

  getRenderer(type) {
    return new this.mRendererMap[type]();
  }

  render(driver) {
    //debugger
    for (let i = 0, len = this.mRenderers.length; i !== len; i++) {
      let renderer = this.mRenderers[i];

      if (renderer.endPassRequired === true) {
        this.mEndPassStack.push(renderer);
        this.mEndPassRenderer = renderer;
      }

      renderer.render(driver);
      renderer.dirty = 0;

      if (this.mEndPassRenderer !== null && this.mEndPassRenderer.endPassRequiredAt === i) {
        this.mEndPassRenderer.childrenRendered(driver);

        this.mEndPassStack.pop();
        //this.mEndPassRenderer.endPassRequired = false;
        //this.mEndPassRenderer.endPassRequiredAt = -1;
        this.mEndPassRenderer = null;
      }
    }
  }

  registerRenderer(renderer) {
    if (renderer.isRenderable === false) {
      this.mSkipChildren = true;
      return;
    }

    this.mSkipChildren = false;
    this.mRenderers.push(renderer);

    return renderer;
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
    this.clear();
    this.mSkipChildren = false;

    this.mRenderers.splice(0, this.mRenderers.length);
    this.mEndPassStack.splice(0, this.mEndPassStack.length);
    this.mEndPassRenderer = null;
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
   * Draws texture onto back-buffer. GlobalAlpha, BlendMode and transformation
   * matrix must be set prior to calling this method.
   *
   * @public
   *
   * @param  {Texture} texture
   * 
   */
  drawTexture(texture) {
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
}
