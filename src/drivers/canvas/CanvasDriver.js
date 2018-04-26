/**
 * Video driver responsible for rendering game objects onto HTML canvas element.
 *
 * @extends VideoNullDriver
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class CanvasDriver extends VideoNullDriver {
  /**
   * Creates new instance of CanvasDriver
   *
   * @param {HTMLElement} containerElement The DOM element to draw into.
   * @param {number} width                 The width of the viewport.
   * @param {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** @private @type {CanvasRenderingContext2D|null} */
    this.mCtx = null;

    this.__createCanvas();

    /** @inheritDoc */
    this.mRendererMap = {
      'DisplayObject': DisplayObjectRendererCanvas,
      'Sprite': SpriteRendererCanvas,
      'Emitter': EmitterRendererCanvas,
      'Text': TextRendererCanvas,
      'BitmapText': BitmapTextRendererCanvas,
      'Graphics': GraphicsRendererCanvas
    };
  }

  /**
   * @inheritDoc
   */
  render(gameObject, renderTexture = null, customTransform = null) {
    let isBackBufferActive = renderTexture === null;

    if (Renderer.skipUnchangedFrames === true && isBackBufferActive === true && Renderer.__dirty === false)
      return;

    let session = this.__saveSession();

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

    session.rendererIndex = session.renderers.length;

    if (session.skipChildren === false)
      this.__collectRenderables(session, gameObject, this.mStageRenderer, isBackBufferActive);

    for (let i = 0, len = session.renderers.length; i !== len; i++) {
      /** @type {Renderer} */
      let renderer = session.renderers[i];

      /** @type {Matrix|null} */
      let transform = null;

      if (isBackBufferActive === false) {
        if (customTransform === null) {
          // TODO: too much allocations
          transform = renderer.getTransform().clone();
          transform.data[4] -= Black.stage.mX;
          transform.data[5] -= Black.stage.mY;
        } else {
          // TODO: too much allocations
          transform = renderer.getTransform().clone();
          transform.prepend(customTransform);
        }
      } else {
        transform = renderer.getTransform();
      }

      if (renderer.isRenderable === true || renderer.hasVisibleArea) {
        this.setTransform(transform);
        this.setGlobalBlendMode(renderer.getBlendMode()); // not perfect 
      }

      if (renderer.clipRect !== null && renderer.clipRect.isEmpty === false) {
        //this.setGlobalAlpha(renderer.getAlpha());
        this.beginClip(renderer.clipRect, renderer.pivotX, renderer.pivotY);
      }

      if (renderer.skip === true) {
        renderer.skip = false;
      } else {
        if (renderer.isRenderable === true) {
          this.setGlobalAlpha(renderer.getAlpha());
          this.mSnapToPixels = renderer.snapToPixels;

          renderer.render(this);
          renderer.dirty = DirtyFlag.CLEAN;
        }
      }

      if (renderer.endPassRequired === true)
        session.endPassRenderers.push(renderer);

      if (session.endPassRenderers.length > 0 && session.endPassRenderers[session.endPassRenderers.length - 1].endPassRequiredAt === i) {

        const r = session.endPassRenderers.pop();
        this.endClip();

        r.endPassRequiredAt = -1;
        r.endPassRequired = false;
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

    this.__restoreSession();
  }

  /**
   * @inheritDoc
   */
  getRenderTarget(width, height) {
    return new RenderTargetCanvas(width, height);
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
    this.mCtx.globalCompositeOperation = 'lighter';
  }

  /**
   * @ignore
   * @protected
   * @param {Message} msg
   * @param {Rectangle} rect
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
  setTransform(m) {
    const v = m.value;

    Debug.assert(!isNaN(v[0]), 'a-element cannot be NaN');
    Debug.assert(!isNaN(v[1]), 'b-element cannot be NaN');
    Debug.assert(!isNaN(v[2]), 'c-element cannot be NaN');
    Debug.assert(!isNaN(v[3]), 'd-element cannot be NaN');
    Debug.assert(!isNaN(v[4]), 'tx-element cannot be NaN');
    Debug.assert(!isNaN(v[5]), 'ty-element cannot be NaN');

    this.mTransform = m;

    let dpr = this.mDevicePixelRatio;

    if (this.mSnapToPixels === true)
      this.mCtx.setTransform(v[0], v[1], v[2], v[3], (v[4] * dpr) | 0, (v[5] * dpr) | 0);
    else
      this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4] * dpr, v[5] * dpr);
  }

  /**
   * @inheritDoc
   */
  setGlobalAlpha(value) {
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

    let viewport = Black.instance.viewport;
    if (viewport.isTransperent === false) {
      this.mCtx.fillStyle = ColorHelper.hexColorToString(viewport.backgroundColor);
      this.mCtx.fillRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
    } else {
      this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
    }
  }

  /**
   * @inheritDoc
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas);
  }

  /** 
   * Returns current rendering context or null.
   * @returns {CanvasRenderingContext2D}
   */
  get context() {
    return this.mCtx;
  }
}