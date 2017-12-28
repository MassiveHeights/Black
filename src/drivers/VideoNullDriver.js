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

    this.mDPR = Device.getDevicePixelRatio();

    this.mStageRenderer = new Renderer();
    this.mStageRenderer.alpha = 1;
    this.mStageRenderer.blendMode = BlendMode.NORMAL;

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  get finalScale() {
    return this.mDPR * Black.stage.scaleFactor * this.mRenderResolution;
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

  // NOTE: Do not call this method inside OnRender - stack overflow will happen
  render(gameObject, renderTexture = null, customTransform = null, ignoreParents = false) {
    let session = this.__popSession();

    let isBackBufferActive = renderTexture === null;

    let numEndClipsRequired = 0;
    if (renderTexture != null) {
      this.mLastRenderTexture = this.mCtx;
      this.mCtx = renderTexture.renderTarget.context;

      // collect parents alpha, blending, clipping and masking
      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;

      this.mStageRenderer.alpha = 1;
      this.mStageRenderer.blendMode = BlendMode.NORMAL;

      // alpha, blendmode will be overwritten into this.mStageRenderer
      numEndClipsRequired = this.__collectParentRenderables(session, gameObject, this.mStageRenderer);
    } else {
      this.mStageRenderer.alpha = 1;
      this.mStageRenderer.blendMode = BlendMode.NORMAL;
    }

    session.rendererIndex = 0;

    if (session.skipChildren === false)
      this.__collectRenderables(session, gameObject, this.mStageRenderer, isBackBufferActive);

    for (let i = 0, len = session.renderers.length; i !== len; i++) {
      let renderer = session.renderers[i];
      let transform = null;

      if (isBackBufferActive === false) {
        if (customTransform === null) {
          transform = renderer.getTransform().clone();
          // transform.invert();
           transform.data[4] -= Black.stage.mX;
           transform.data[5] -= Black.stage.mY;
          //this.setTransform(t);
        } else {
          transform = renderer.getTransform().clone();
          transform.prepend(customTransform);
        }
      } else {
        transform = renderer.getTransform();
      }

      if (renderer.isRenderable === true)
        this.setTransform(transform);

      if (renderer.clipRect !== null && renderer.clipRect.isEmpty === false)
        this.beginClip(renderer.clipRect, renderer.pivotX, renderer.pivotY);

      if (renderer.skip === true) {
        renderer.skip = false;
      } else {
        if (renderer.isRenderable === true) {
          this.globalAlpha = renderer.getAlpha();
          this.globalBlendMode = renderer.getBlendMode();
          this.mSnapToPixels = renderer.snapToPixels;

          renderer.render(this);
          renderer.dirty = 0;
        }
      }

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
      session.clear();
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

    if (session.skipChildren === true) {
      session.skipChildren = false;
      return;
    }

    const len = gameObject.mChildren.length;
    for (let i = 0; i < len; i++)
      this.__collectRenderables(session, gameObject.mChildren[i], parentRenderer, isBackBufferActive);

    if (renderer != null && renderer.endPassRequired === true)
      renderer.endPassRequiredAt = session.rendererIndex - 1;
  }

  __collectParentRenderables(session, gameObject, parentRenderer) {
    // parents needed to make sure that game object is visible, world alpha > 0 etc
    // but parents should not be rendered
    let numClippedParents = 0;

    let current = gameObject;
    if (current === null)
      return numClippedParents;

    let parents = [];

    // TODO: one line parent gathering 
    for (current = current.parent; current !== null; current = current.parent)
      parents.splice(0, 0, current);

    for (let i = 0; i < parents.length; i++) {
      let parent = parents[i];

      let oldDirty = parent.mDirty;
      let renderer = parent.onRender(this, parentRenderer);
      parent.mDirty = oldDirty;

      if (renderer != null) {
        renderer.skip = true;

        if (renderer.clipRect !== null)
          numClippedParents++;

        parentRenderer.alpha = renderer.alpha;
        parentRenderer.blendMode = renderer.blendMode;
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
    if (renderer.hasVisibleArea === false) {
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
  }

  /**
   * Convers number color to hex string.
   *
   * @deprecated
   * @param {number} color The color to convert.
   *
   * @returns {string} The resuling hex string.
   */
  hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  static hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  static intToRGBA(color) {
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    const a = 0.5;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }
}
