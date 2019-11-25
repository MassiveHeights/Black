import { Black } from "../Black";
import { BlendMode } from "./BlendMode";
import { Renderer } from "./Renderer";
import { RenderSession } from "./RenderSession";
import { Device } from "../system/Device";
import { ObjectPool } from "../utils/ObjectPool";
import { Matrix } from "../geom/Matrix";

/**
 * Base class for custom video drivers. VideoDriver is used to render things onto the screen.
 *
 * @cat drivers
 */
export class VideoNullDriver {
  /**
   * Creates new instance of VideoNullDriver.
   *
   * @param  {HTMLElement} containerElement The HTML element container for rendering.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {

    /** 
     * @protected 
     * @type {HTMLElement} 
     */
    this.mContainerElement = containerElement;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mClientWidth = width;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mClientHeight = height;

    /** 
     * @protected 
     * @type {black-engine~Matrix} Actual object - do not change 
     */
    this.mTransform = new Matrix();

    /** 
     * @protected 
     * @type {black-engine~Matrix} 
     */
    this.mIdentityMatrix = new Matrix();

    /** 
     * @protected 
     * @type {black-engine~RenderSession} 
     */
    this.mActiveSession = new RenderSession();

    /** 
     * @protected 
     * @type {Array<black-engine~RenderSession>} 
     */
    this.mSessions = [];

    /** 
     * @protected 
     * @type {*} 
     */
    this.mLastRenderTexture = null;

    /** 
     * @protected 
     * @type {boolean} 
     */
    this.mSnapToPixels = false;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mDevicePixelRatio = Black.engine.useHiDPR === true ? Black.device.getDevicePixelRatio() : 1;

    /** 
     * @protected 
     * @type {black-engine~BlendMode|null} 
     */
    this.mGlobalBlendMode = BlendMode.AUTO;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mGlobalAlpha = 1;

    /** 
     * @protected 
     * @type {black-engine~Renderer} 
     */
    this.mStageRenderer = new Renderer();

    /** 
     * @protected 
     * @type {Object.<string, function(new: black-engine~Renderer)>} 
     */
    this.mRendererMap = {};

    Black.engine.viewport.on('resize', this.__onResize, this);
  }

  /**
   * A main render function.
   *
   * @public
   * @param {black-engine~GameObject} gameObject                    A GameObject instance to render onto RenderTarget.
   * @param {black-engine~CanvasRenderTexture} [renderTexture=null] Destination surface to render game object on. Will be rendered
   *                                                   onto backbuffer if null.
   * @param {black-engine~Matrix} [customTransform=null]            An optional extra offset.
   */
  render(gameObject, renderTexture = null, customTransform = null) {
  }

  /**
   * A factory method which returns new Renderer instance based on internal GameObject to Renderer map.
   *
   * @param {string} type      The type of the GameObject to find renderer for.
   * @param {black-engine~GameObject} owner The owner of this renderer.
   * @returns {black-engine~Renderer} New renderer instance.
   */
  getRenderer(type, owner) {
    return null;
  }

  /**
   * @ignore
   * @private
   * @returns {black-engine~RenderSession}
   */
  __saveSession() {
    let session = VideoNullDriver.sessionPool.get();
    session.reset();

    this.mSessions.push(session);

    this.mActiveSession = session;
    return session;
  }

  /**
   * @ignore
   * @private
   */
  __restoreSession() {
    this.mSessions.pop();
    this.mActiveSession = this.mSessions[this.mSessions.length - 1] || null;
  }

  /**
   * @ignore
   * @protected
   * @param {black-engine~RenderSession} session
   * @param {black-engine~GameObject} gameObject
   * @param {black-engine~Renderer} parentRenderer
   * @returns {void}
   */
  __collectParentRenderables(session, gameObject, parentRenderer) {
    let current = gameObject;
    if (current === null)
      return;

    let parents = [];
    for (current = current.parent; current !== null; current = current.parent)
      parents.splice(0, 0, current);

    for (let i = 0; i < parents.length; i++) {
      current = parents[i];

      let renderer = current.mRenderer;

      if (renderer == null)
        continue;

      session.parentRenderers.push(renderer);
      renderer.parent = parentRenderer;
      parentRenderer = renderer;

      renderer.preRender(this, session);

      if (renderer.endPassRequired === true)
        session.endPassParentRenderers.push(renderer);
    }
  }

  /**
   * Notifies renderer about new clipping.
   *
   * @protected
   * @param {black-engine~Rectangle} clipRect The region to clip.
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
   * @protected
   * @ignore
   * @param {black-engine~Message} msg
   * @param {black-engine~Rectangle} rect
   * @returns {void}
   */
  __onResize(msg, rect) {
    Renderer.__dirty = true;

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
   * @param {HTMLCanvasElement} canvas
   * @return {?black-engine~Texture}
   */
  getTextureFromCanvas(canvas) {
    return null;
  }

  /**
   * Sets world transformation for future use.
   *
   * @public
   * @param {black-engine~Matrix} m An transformation matrix to store.
   * @returns {void}
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * Indicates if transform should be snapped to pixels.
   * @param {boolean} value 
   * @returns {void}
   */
  setSnapToPixels(value) {
    this.mSnapToPixels = value;
  }

  /**
   * Gets/Sets the global alpha. Used to calculate alpha relative to parent object.
   *
   * @protected
   * @return {number}
   */
  getGlobalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  setGlobalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * Gets/Sets global blending mode. Used to calculate blend mode relative to parent object.
   *
   * @return {?black-engine~BlendMode}
   */
  getGlobalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * @param {?black-engine~BlendMode} value
   * @return {void}
   */
  setGlobalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * Draws texture onto back-buffer. alpha, blend mode and transformation matrix must be set prior to calling this
   * method.
   *
   * @public
   * @param {black-engine~Texture} texture Instance of the Texture to draw.
   * 
   */
  drawTexture(texture) {
  }

  /**
   * Draws texture onto back-buffer with given offset. alpha, blend mode and transformation matrix must be set prior to calling this
   * method.
   *
   * @param {black-engine~Texture} texture Instance of the Texture to draw.
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
   * Disposes all allocated resources.
   */
  dispose() {
    VideoNullDriver.sessionPool.releaseAll();
  }

  /** 
   * Returns current rendering context or null.
   * @returns {*}
   */
  get context() {
    return null;
  }

  /**
   * Returns device pixel ratio or 1 in case high DPR support is disabled.
   * 
   * @returns {number}
   */
  get renderScaleFactor() {
    return this.mDevicePixelRatio;
  }
}

/**
 * Recyclable session pool. Do not recycle manually.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
VideoNullDriver.sessionPool = new ObjectPool(RenderSession);