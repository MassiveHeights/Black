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
     * Actual object - do not change
     * @private
     * @type {Matrix}
     */
    this.mTransform = new Matrix();

    this.mIdentityMatrix = new Matrix();

    this.mRenderers = [];
    this.mSkipChildren = false;
    this.mEndPassRenderer = null;
    this.mRendererIndex = 0;
    this.mLastRenderTexture = null;
    this.mCurrentRenderTexture = null;

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

    this.mStageRenderer = new Renderer();
    this.mStageRenderer.alpha = 1;
    this.mStageRenderer.blendMode = BlendMode.NORMAL;

    // @ifdef DEBUG
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.id = 'debug-canvas';
    cvs.style.position = 'absolute';
    cvs.style.zIndex = 2;
    cvs.width = this.mClientWidth;
    cvs.height = this.mClientHeight;
    this.mContainerElement.appendChild(cvs);

    this.__debugContext = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
    // @endif

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  getRenderer(type) {
    return new this.mRendererMap[type]();
  }

  getRenderTarget(width, height) {
    throw new Error('Not Implemented Error');
  }

  render(gameObject, renderTexture) {
    let numEndClipsRequired = 0;
    if (renderTexture != null) {
      this.mLastRenderTexture = this.mCtx;
      this.mCtx = renderTexture.renderTarget.context;

      // collect parents alpha, blending, clipping and masking
      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;
      this.mRenderers.splice(0, this.mRenderers.length);
      this.mSkipChildren = false;

      numEndClipsRequired = this.__collectParentRenderables(gameObject, this.mStageRenderer);
    }

    this.mRendererIndex = 0;

    this.__collectRenderables(gameObject, this.mStageRenderer);

    for (let i = 0, len = this.mRenderers.length; i !== len; i++) {
      let renderer = this.mRenderers[i];

      this.setTransform(renderer.getTransform());
      this.globalAlpha = renderer.getAlpha();
      this.globalBlendMode = renderer.getBlendMode();

      if (renderer.clipRect !== null && renderer.clipRect.isEmpty === false)
        this.beginClip(renderer.clipRect, renderer.pivotX, renderer.pivotY);

      renderer.render(this);
      renderer.dirty = 0;

      if (renderer.endPassRequired === true)
        this.mEndPassRenderer = renderer;

      if (this.mEndPassRenderer !== null && this.mEndPassRenderer.endPassRequiredAt === i) {
        this.endClip();

        this.mEndPassRenderer.endPassRequiredAt = -1;
        this.mEndPassRenderer.endPassRequired = false;
        this.mEndPassRenderer = null;
      }
    }

    if (renderTexture != null) {
      for (let i = 0; i < numEndClipsRequired; i++)
        this.endClip();

      this.mCtx = this.mLastRenderTexture;

      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;
      this.mRenderers.splice(0, this.mRenderers.length);
      this.mSkipChildren = false;
    }
  }

  __collectRenderables(gameObject, parentRenderer) {
    let renderer = gameObject.onRender(this, parentRenderer);

    if (renderer != null) {
      if (renderer.clipRect !== null)
        renderer.endPassRequired = true;

      parentRenderer = renderer;
      this.mRendererIndex++;
    }

    if (this.mSkipChildren === true)
      return;

    const len = gameObject.numChildren;
    for (let i = 0; i < len; i++)
      this.__collectRenderables(gameObject.mChildren[i], parentRenderer);

    if (renderer != null && renderer.endPassRequired === true)
      renderer.endPassRequiredAt = this.mRendererIndex - 1;
  }

  __collectParentRenderables(gameObject, parentRenderer) {
    let numClippedParents = 0;

    let current = gameObject;
    if (current === null)
      return numClippedParents;

    let parents = [];

    for (current = current.parent; current !== null; current = current.parent)
      parents.splice(0, 0, current);

    for (let i = 0; i < parents.length; i++) {
      let parent = parents[i];

      let oldDirty = parent.mDirty;
      let renderer = parent.onRender(this, parentRenderer);
      parent.mDirty = oldDirty;

      if (renderer != null) {
        if (renderer.clipRect !== null)
          numClippedParents++;

        parentRenderer = renderer;
      }

      if (this.mSkipChildren === true)
        return numClippedParents;
    }

    return numClippedParents;
  }

  beginClip(clipRect, px, py) {
  }

  endClip() {
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

    // @ifdef DEBUG
    this.__debugContext.canvas.width = this.mClientWidth;
    this.__debugContext.canvas.height = this.mClientHeight;
    // @endif
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
  }

  /**
   * Called after rendering is finished.
   * @protected
   *
   * @returns {void}
   */
  endFrame() {
    this.mRenderers.splice(0, this.mRenderers.length);
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
    // @ifdef DEBUG
    if (this.__debugContext !== null) {
      this.__debugContext.setTransform(1, 0, 0, 1, 0, 0);
      this.__debugContext.clearRect(0, 0, this.__debugContext.canvas.width, this.__debugContext.canvas.height);
    }
    // @endif
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
