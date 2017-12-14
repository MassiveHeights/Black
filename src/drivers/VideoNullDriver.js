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
    this.mContainerElement = containerElement;

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

    this.mActiveSession = new RenderSession();
    this.mSessions = [];

    this.mLastRenderTexture = null;
    this.mSnapToPixels = false;
    this.mRenderResolution = 1;
    this.mStageScaleFactor = Device.getDevicePixelRatio() * this.mRenderResolution;

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

    let scale = this.mStageScaleFactor;
    cvs.width = this.mClientWidth * scale;
    cvs.height = this.mClientHeight * scale;
    cvs.style.width = this.mClientWidth + 'px';
    cvs.style.height = this.mClientHeight + 'px';
    this.mContainerElement.appendChild(cvs);

    this.__debugContext = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
    // @endif

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  get scaleFactor() {
    //return this.mStageScaleFactor;
    return Device.getDevicePixelRatio() * Black.instance.stage.scaleFactor * this.mRenderResolution;
  }

  get renderResolution() {
    return this.mRenderResolution;
  }

  set renderResolution(value) {
    this.mRenderResolution = value;
    this.mStageScaleFactor = Device.getDevicePixelRatio() * this.mRenderResolution;
    this.__onResize();
  }

  getRenderer(type) {
    return new this.mRendererMap[type]();
  }

  getRenderTarget(width, height) {
    Debug.erorr('Abstract method');
  }

  __popSession() {
    let session = this.mSessions.pop();

    if (session == null) {
      session = new RenderSession();
    } else {
      session.skipChildren = false;
      session.reset();
    }

    this.mActiveSession = session;
    return session;
  }

  __pushSession(session) {
    this.mSessions.push(session);
    this.mActiveSession = null;
  }

  // NOTE: Do not call this method from this method
  render(gameObject, renderTexture = null, transform = null) {
    let session = this.__popSession();

    let isBackBufferActive = renderTexture === null;

    let numEndClipsRequired = 0;
    if (renderTexture != null) {
      this.mLastRenderTexture = this.mCtx;
      this.mCtx = renderTexture.renderTarget.context;

      // collect parents alpha, blending, clipping and masking
      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;

      session.clean();
      session.skipChildren = false;

      numEndClipsRequired = this.__collectParentRenderables(session, gameObject, this.mStageRenderer);
    }

    session.rendererIndex = 0;

    this.__collectRenderables(session, gameObject, this.mStageRenderer, isBackBufferActive);

    for (let i = 0, len = session.renderers.length; i !== len; i++) {
      let renderer = session.renderers[i];

      this.mSnapToPixels = renderer.snapToPixels;

      if (transform) {
        let t = renderer.getTransform().clone();
        t.prepend(transform)

        this.setTransform(t);
      } else {
        this.setTransform(renderer.getTransform());
      }

      this.globalAlpha = renderer.getAlpha();
      this.globalBlendMode = renderer.getBlendMode();

      if (renderer.clipRect !== null && renderer.clipRect.isEmpty === false)
        this.beginClip(renderer.clipRect, renderer.pivotX, renderer.pivotY);

      renderer.render(this);
      renderer.dirty = 0;

      if (renderer.endPassRequired === true)
        session.endPassRenderer = renderer;

      if (session.endPassRenderer !== null && session.endPassRenderer.endPassRequiredAt === i) {
        this.endClip();

        session.endPassRenderer.endPassRequiredAt = -1;
        session.endPassRenderer.endPassRequired = false;
        session.endPassRenderer = null;
      }
    }

    if (renderTexture != null) {
      for (let i = 0; i < numEndClipsRequired; i++)
        this.endClip();

      this.mCtx = this.mLastRenderTexture;

      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;
      session.clean();
      session.skipChildren = false;
    }

    this.__pushSession(session);
  }

  __collectRenderables(session, gameObject, parentRenderer, isBackBufferActive) {
    let renderer = gameObject.onRender(this, parentRenderer, isBackBufferActive);

    if (renderer != null) {
      if (renderer.clipRect !== null)
        renderer.endPassRequired = true;

      parentRenderer = renderer;
      session.rendererIndex++;
    }

    if (renderer != null && renderer.skipChildren)
      return;

    if (session.skipChildren === true)
      return;

    const len = gameObject.mChildren.length;
    for (let i = 0; i < len; i++)
      this.__collectRenderables(session, gameObject.mChildren[i], parentRenderer, isBackBufferActive);

    if (renderer != null && renderer.endPassRequired === true)
      renderer.endPassRequiredAt = session.rendererIndex - 1;
  }

  __collectParentRenderables(session, gameObject, parentRenderer) {
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

      if (session.skipChildren === true)
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
      this.mActiveSession.skipChildren = true;
      return;
    }

    this.mActiveSession.renderers.push(renderer);
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
    let scale = this.mStageScaleFactor;
    this.__debugContext.canvas.width = this.mClientWidth * scale;
    this.__debugContext.canvas.height = this.mClientHeight * scale;
    this.__debugContext.canvas.style.width = this.mClientWidth + 'px';
    this.__debugContext.canvas.style.height = this.mClientHeight + 'px';
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
