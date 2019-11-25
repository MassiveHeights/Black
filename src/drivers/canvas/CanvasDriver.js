import { VideoNullDriver } from "../VideoNullDriver";
import { Renderer } from "../Renderer";
import { BlendMode, CanvasBlendMode } from "../BlendMode";
import { RenderSession } from "../RenderSession";
import { GameObject } from "../../core/GameObject";
import { Debug } from "../../core/Debug";
import { Black } from "../../Black";
import { DisplayObjectRendererCanvas } from "./DisplayObjectRendererCanvas";
import { SpriteRendererCanvas } from "./SpriteRendererCanvas";
import { EmitterRendererCanvas } from "./EmitterRendererCanvas";
import { TextRendererCanvas } from "./TextRendererCanvas";
import { BitmapTextRendererCanvas } from "./BitmapTextRendererCanvas";
import { GraphicsRendererCanvas } from "./GraphicsRendererCanvas";
import { Texture } from "../../textures/Texture";
import { ColorHelper } from "../../utils/ColorHelper";
import { Camera } from "../../display/Camera";

/**
 * Video driver responsible for rendering game objects onto HTML canvas element.
 *
 * @extends black-engine~VideoNullDriver
 * @cat drivers.canvas
 */
export class CanvasDriver extends VideoNullDriver {
  /**
   * Creates new instance of CanvasDriver
   *
   * @param {HTMLElement} containerElement The DOM element to draw into.
   * @param {number} width                 The width of the viewport.
   * @param {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** 
     * @private 
     * @type {CanvasRenderingContext2D|null} 
     */
    this.mCtx = null;

    this.__createCanvas();

    /**
     * @private 
     * @inheritDoc 
     */
    this.mRendererMap = {
      'DisplayObject': DisplayObjectRendererCanvas,
      'Sprite': SpriteRendererCanvas,
      'Emitter': EmitterRendererCanvas,
      'Text': TextRendererCanvas,
      'BitmapText': BitmapTextRendererCanvas,
      'Graphics': GraphicsRendererCanvas
    };
  }

  getRenderer(type, owner) {
    let renderer = new this.mRendererMap[type]();
    renderer.gameObject = /** @type {DisplayObject} */ (owner);
    return renderer;
  }

  /**
   * @inheritDoc
   */
  render(gameObject, renderTexture = null, customTransform = null) {
    let isBackBufferActive = renderTexture === null;

    if (Renderer.skipUnchangedFrames === true && isBackBufferActive === true && Renderer.__dirty === false)
      return;

    let session = this.__saveSession();
    session.isBackBufferActive = isBackBufferActive;
    session.customTransform = customTransform;

    let parentRenderer = this.mStageRenderer;

    // RenderTexture related
    if (renderTexture !== null) {
      // Swap context
      this.mLastRenderTexture = this.mCtx;
      this.mCtx = renderTexture.renderTarget.context;

      // clear context cache
      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;

      parentRenderer.alpha = 1;
      parentRenderer.blendMode = BlendMode.NORMAL;
      parentRenderer.color = null;

      // collect parents of given GameObject
      this.__collectParentRenderables(session, gameObject, this.mStageRenderer);

      for (let i = 0, len = session.parentRenderers.length; i !== len; i++) {
        let renderer = session.parentRenderers[i];
        renderer.begin(this, session);

        if (renderer.skipSelf === false)
          renderer.upload(this, session);
      }

      if (session.parentRenderers.length > 0)
        parentRenderer = session.parentRenderers[session.parentRenderers.length - 1];
    }

    this.renderObject(gameObject, session, parentRenderer);

    if (renderTexture !== null) {
      while (session.endPassParentRenderers.length > 0)
        session.endPassParentRenderers.pop().end(this, session);

      this.mCtx = this.mLastRenderTexture;

      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;
    }

    this.__restoreSession();
  }

  /**
   * @ignore
   * @param {black-engine~GameObject} child 
   * @param {black-engine~RenderSession} session 
   * @param {black-engine~Renderer} parentRenderer
   */
  renderObject(child, session, parentRenderer) {
    let skipChildren = false;
    let renderer = /** @type {DisplayObject} */ (child).mRenderer;

    if (renderer != null) {
      renderer.parent = parentRenderer;
      renderer.preRender(this, session);

      for (let i = 0; i < child.mComponents.length; i++) {
        const comp = child.mComponents[i];
        comp.onRender();
      }
      /** @type {DisplayObject} */ (child).onRender();

      renderer.begin(this, session);

      if (renderer.skipSelf === false) {
        renderer.upload(this, session);
        renderer.render(this, session);
      }

      skipChildren = renderer.skipChildren;
    }

    if (skipChildren === false) {
      for (let i = 0; i < child.mChildren.length; i++)
        this.renderObject(child.mChildren[i], session, renderer || parentRenderer);
    }

    if (renderer != null && renderer.endPassRequired === true)
      renderer.end(this, session);
  }

  /**
   * @ignore
   * @private
   * @return {void}
   */
  __createCanvas() {
    let dpr = this.mDevicePixelRatio;

    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.style.position = 'absolute';
    cvs.id = 'canvas';

    cvs.width = this.mClientWidth * dpr;
    cvs.height = this.mClientHeight * dpr;
    cvs.style.width = this.mClientWidth + 'px';
    cvs.style.height = this.mClientHeight + 'px';

    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
  }

  /**
   * @ignore
   * @protected
   * @param {black-engine~Message} msg
   * @param {black-engine~Rectangle} rect
   * @returns {void}
   */
  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    // canvas will reset state after changing size
    this.mGlobalBlendMode = null;
    this.mGlobalAlpha = -1;

    let dpr = this.mDevicePixelRatio;
    this.mCtx.canvas.width = this.mClientWidth * dpr;
    this.mCtx.canvas.height = this.mClientHeight * dpr;
    this.mCtx.canvas.style.width = this.mClientWidth + 'px';
    this.mCtx.canvas.style.height = this.mClientHeight + 'px';
  }

  /**
   * @inheritDoc
   */
  drawTexture(texture) {
    if (texture.isValid === false)
      return;

    let dpr = this.mDevicePixelRatio;

    let sourceX = texture.region.x;
    let sourceY = texture.region.y;
    let sourceWidth = texture.region.width;
    let sourceHeight = texture.region.height;

    let destX = texture.untrimmedRegion.x * dpr;
    let destY = texture.untrimmedRegion.y * dpr;
    let destWidth = texture.renderWidth * dpr;
    let destHeight = texture.renderHeight * dpr;

    this.mCtx.drawImage(texture.native, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  }

  /**
   * @inheritDoc
   */
  drawTextureWithOffset(texture, ox, oy) {
    if (texture.isValid === false)
      return;

    let dpr = this.mDevicePixelRatio;

    let sourceX = texture.region.x;
    let sourceY = texture.region.y;
    let sourceWidth = texture.region.width;
    let sourceHeight = texture.region.height;

    let destX = (ox + texture.untrimmedRegion.x) * dpr;
    let destY = (oy + texture.untrimmedRegion.y) * dpr;
    let destWidth = texture.renderWidth * dpr;
    let destHeight = texture.renderHeight * dpr;

    this.mCtx.drawImage(texture.native, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  }

  /**
   * @inheritDoc
   */
  beginClip(clipRect, px, py) {
    let dpr = this.mDevicePixelRatio;

    this.mCtx.save();
    this.mCtx.beginPath();
    this.mCtx.rect((clipRect.x + px) * dpr, (clipRect.y + py) * dpr, clipRect.width * dpr, clipRect.height * dpr);

    this.mCtx.clip();
  }

  /**
   * @inheritDoc
   */
  endClip() {
    this.mCtx.restore();

    this.mGlobalAlpha = -1;
    this.mGlobalBlendMode = null;
  }

  /**
   * @inheritDoc
   */
  setTransform(transform) {
    let dpr = this.mDevicePixelRatio;
    let session = this.mActiveSession;

    if (session.isBackBufferActive === false) {
      if (session.customTransform === null) {
        transform = transform.clone(); // TODO: too much allocations
        transform.data[4] -= Black.stage.mX;
        transform.data[5] -= Black.stage.mY;
      } else {
        transform = transform.clone(); // TODO: too much allocations
        transform.prepend(session.customTransform);
      }
    }

    if (Black.camera !== null) {
      transform = transform.clone();
      transform.prepend(Black.camera.worldTransformationInverted);
    }

    this.mTransform = transform;

    let mv = transform.value;
    Debug.isNumber(mv[0], mv[1], mv[2], mv[3], mv[4], mv[5]);

    if (this.mSnapToPixels === true)
      this.mCtx.setTransform(mv[0], mv[1], mv[2], mv[3], (mv[4] * dpr) | 0, (mv[5] * dpr) | 0);
    else
      this.mCtx.setTransform(mv[0], mv[1], mv[2], mv[3], mv[4] * dpr, mv[5] * dpr);
  }

  /**
   * @inheritDoc
   */
  setGlobalAlpha(value) {
    Debug.isNumber(value);

    if (value == this.mGlobalAlpha)
      return;

    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }

  /**
   * @inheritDoc
   */
  setGlobalBlendMode(blendMode) {
    if (blendMode === BlendMode.AUTO)
      return;

    blendMode = CanvasBlendMode[blendMode];

    if (this.mGlobalBlendMode === blendMode)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * @inheritDoc
   */
  clear() {
    if (Renderer.skipUnchangedFrames === true && Renderer.__dirty === false)
      return;

    // TODO: clear only changed region
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);

    let viewport = Black.engine.viewport;
    if (viewport.isTransparent === false) {
      this.mCtx.fillStyle = ColorHelper.hexColorToString(viewport.backgroundColor);
      this.mCtx.fillRect(0, 0, viewport.size.width * this.mDevicePixelRatio, viewport.size.height * this.mDevicePixelRatio);
    } else {
      this.mCtx.clearRect(0, 0, viewport.size.width * this.mDevicePixelRatio, viewport.size.height * this.mDevicePixelRatio);
    }
  }

  /**
   * @inheritDoc
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas);
  }

  /**
   * @override
   */
  dispose() {
    super.dispose();

    if (this.mCtx !== null)
      this.mCtx.canvas.remove();
  }

  /** 
   * Returns current rendering context or null.
   * @returns {CanvasRenderingContext2D}
   */
  get context() {
    return this.mCtx;
  }
}