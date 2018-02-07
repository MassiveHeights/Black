/**
 * Base class for custom video drivers. VideoDriver is used to render things onto the screen.
 *
 * @cat drivers
 * @echo EXPORT
 */
class VideoNullDriver {
  /**
   * Creates new instance of VideoNullDriver.
   *
   * @param  {HTMLElement} containerElement The HTML element container for rendering.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {

    /** @protected @type {HTMLElement} */
    this.mContainerElement = containerElement;

    /** @protected @type {number} */
    this.mClientWidth = width;

    /** @protected @type {number} */
    this.mClientHeight = height;

    /** @protected @type {Matrix} Actual object - do not change */
    this.mTransform = new Matrix();

    /** @protected @type {Matrix} */
    this.mIdentityMatrix = new Matrix();

    /** @protected @type {RenderSession} */
    this.mActiveSession = new RenderSession();

    /** @protected @type {Array<RenderSession>} */
    this.mSessions = [];

    /** @protected @type {?} */
    this.mLastRenderTexture = null;

    /** @protected @type {boolean} */
    this.mSnapToPixels = false;

    /** @protected @type {number} */
    this.mRenderResolution = 1;

    /** @protected @type {number} */
    this.mStageScaleFactor = Device.getDevicePixelRatio() * this.mRenderResolution;

    /** @protected @type {BlendMode<string>|null} */
    this.mGlobalBlendMode = BlendMode.AUTO;

    /** @protected @type {number} */
    this.mGlobalAlpha = 1;

    /** @protected @type {number} */
    this.mDPR = Device.getDevicePixelRatio();

    /** @protected @type {Renderer} */
    this.mStageRenderer = new Renderer();

    /** @protected @type {number} */
    this.mStageRenderer.alpha = 1;

    /** @protected @type {BlendMode} */
    this.mStageRenderer.blendMode = BlendMode.NORMAL;

    /** @protected @type {Object.<string, function(new: Renderer)>} */
    this.mRendererMap = {};

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  /**
   * A main render function.
   *
   * @public
   * @param {GameObject} gameObject                    A GameObject instance to render onto RenderTarget.
   * @param {CanvasRenderTexture} [renderTexture=null] Destination surface to render game object on. Will be rendered
   *                                                   onto backbuffer if null.
   * @param {Matrix} [customTransform=null]            An optional extra offset.
   */
  render(gameObject, renderTexture = null, customTransform = null) {
  }

  /**
   * The scale factor of stage multiplied by DPR multiplied by render resolution.
   *
   * @returns {number}
   */
  get finalScale() {
    return this.mDPR * Black.stage.scaleFactor * this.mRenderResolution;
  }

  /**
   * The resolution of render area from 0 to 1, where 1 means 100% quality.
   *
   * @returns {number}
   */
  get renderResolution() {
    return this.mRenderResolution;
  }

  /**
   * @ignore
   * @param {number} value
   * @returns {void}
   */
  set renderResolution(value) {
    this.mRenderResolution = value;
    this.mStageScaleFactor = Device.getDevicePixelRatio() * this.mRenderResolution;
    this.__onResize(null, null);
  }

  /**
   * A factory method which returns new Renderer instance based on internal GameObject to Renderer map.
   *
   * @param {string} type The type of the GameObject to find renderer for.
   * @returns {Renderer} New renderer instance.
   */
  getRenderer(type) {
    return new this.mRendererMap[type]();
  }

  /**
   * A factory method - returns new instance of RenderTarget depending on driver type.
   *
   * @param {number} width  The width of render target.
   * @param {number} height The height of render target.
   * @returns {RenderTarget|null} New instance of just created RenderTarget.
   */
  getRenderTarget(width, height) {
    Debug.error('Abstract method');
    return null;
  }

  /**
   * @ignore
   * @private
   * @returns {RenderSession}
   */
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

  /**
   * @ignore
   * @private
   * @param {RenderSession} session
   */
  __pushSession(session) {
    this.mSessions.push(session);
    this.mActiveSession = null;
  }

  /**
   * @ignore
   * @protected
   * @param {RenderSession} session
   * @param {GameObject} gameObject
   * @param {Renderer} parentRenderer
   * @param {boolean} isBackBufferActive
   */
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

    const len = gameObject.numChildren;
    for (let i = 0; i < len; i++)
      this.__collectRenderables(session, gameObject.getChildAt(i), parentRenderer, isBackBufferActive);

    if (renderer != null && renderer.endPassRequired === true)
      renderer.endPassRequiredAt = session.rendererIndex - 1;
  }

  /**
   * @ignore
   * @protected
   * @param {RenderSession} session
   * @param {GameObject} gameObject
   * @param {Renderer} parentRenderer
   * @returns {number}
   */
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

  /**
   * Notifies renderer about new clipping.
   *
   * @protected
   * @param {Rectangle} clipRect The region to clip.
   * @param {number} px Pivot-x.
   * @param {number} py Pivot-y.
   */
  beginClip(clipRect, px, py) {
  }

  /**
   * Notifies renderer to stop last clipping.
   * @protected
   */
  endClip() {
  }

  /**
   * Puts renderer into queue for future rendering.
   *
   * @param {Renderer} renderer A Renderer instance.
   * @returns {Renderer|null} Passed renderer or null if it cannot or should not be rendered.
   */
  registerRenderer(renderer) {
    if (renderer.hasVisibleArea === false) {
      this.mActiveSession.skipChildren = true;
      return null;
    }

    this.mActiveSession.renderers.push(renderer);
    return renderer;
  }

  /**
   * @protected
   * @ignore
   * @param {Message} msg
   * @param {Rectangle} rect
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
   * @return {void}
   */
  start() {
  }

  /**
   * Called before rendering anything. Usually used to clear back-buffer.
   *
   * @protected
   * @returns {void}
   */
  beginFrame() {
    this.clear();
  }

  /**
   * Called after rendering is finished.
   *
   * @protected
   * @returns {void}
   */
  endFrame() {
  }

  /**
   * @ignore
   * @param {HTMLCanvasElement} canvas
   * @return {?Texture}
   */
  getTextureFromCanvas(canvas) {
    return null;
  }

  /**
   * Sets world transformation for future use.
   *
   * @public
   * @param {Matrix} m An transformation matrix to store.
   * @return {void}
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * Gets/Sets the global alpha. Used to calculate alpha relative to parent object.
   *
   * @protected
   * @return {number}
   */
  get globalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * Gets/Sets global blending mode. Used to calculate blend mode relative to parent object.
   *
   * @return {?BlendMode}
   */
  get globalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * @ignore
   * @param {?BlendMode} value
   * @return {void}
   */
  set globalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * Draws texture onto back-buffer. alpha, blend mode and transformation matrix must be set prior to calling this
   * method.
   *
   * @public
   * @param {Texture} texture Instance of the Texture to draw.
   * 
   */
  drawTexture(texture) {
  }

  /**
   * Draws texture onto back-buffer with given offset. alpha, blend mode and transformation matrix must be set prior to calling this
   * method.
   *
   * @param {Texture} texture Instance of the Texture to draw.
   * @param {number} ox Offset along x-axis
   * @param {number} oy Offset along y-axis
   */
  drawTextureWithOffset(texture, ox, oy) {
  }

  /**
   * Clears back-buffer.
   *
   * @protected
   * @returns {void}
   */
  clear() {
  }

  /**
   * Converts number color to hex string.
   *
   * @param {number} color The color to convert.
   * @returns {string} The resulting hex string.
   */
  static hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * Converts number color to RGBA string.
   *
   * @param {number} color The color to convert.
   * @returns {string} The resulting string.
   */
  static intToRGBA(color) {
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;
    const a = 0.5;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}
