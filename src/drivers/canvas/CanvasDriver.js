/**
 * @cat drivers
 */
/* @echo EXPORT */
class CanvasDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /**
     * @private
     * @type {CanvasRenderingContext2D|null}
     */
    this.mCtx = null;

    this.__createCanvas();

    this.mRendererMap = {
      DisplayObject: DisplayObjectRendererCanvas,
      Sprite: SpriteRendererCanvas,
      Emitter: EmitterRendererCanvas,
      Text: TextRendererCanvas,
      BitmapText: BitmapTextRendererCanvas
    };
  }

  getRenderTarget(width, height) {
    return new RenderTargetCanvas(width, height);
  }

  /**
   * @private
   * @return {void}
   */
  __createCanvas() {
    let scale = this.mStageScaleFactor;

    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.style.position = 'absolute';
    cvs.id = 'canvas';

    cvs.width = this.mClientWidth * scale;
    cvs.height = this.mClientHeight * scale;
    cvs.style.width = this.mClientWidth + 'px';
    cvs.style.height = this.mClientHeight + 'px';

    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
  }

  /**
   * @private
   * @param {Message} msg
   * @param {Rectangle} rect
   *
   * @returns {void}
   */
  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    // canvas will reset state after changing size
    this.mGlobalBlendMode = null;
    this.mGlobalAlpha = -1;

    let scale = this.mStageScaleFactor;
    this.mCtx.canvas.width = this.mClientWidth * scale;
    this.mCtx.canvas.height = this.mClientHeight * scale;
    this.mCtx.canvas.style.width = this.mClientWidth + 'px';
    this.mCtx.canvas.style.height = this.mClientHeight + 'px';
  }

  drawTexture(texture) {
    if (texture.isValid === false)
      return;

    let scale = this.mStageScaleFactor;
    let tr = texture.resolution;

    var sourceX = texture.region.x;
    var sourceY = texture.region.y;
    var sourceWidth = texture.width;
    var sourceHeight = texture.height;

    var destX = (texture.untrimmedRect.x / tr) * scale;
    var destY = (texture.untrimmedRect.y / tr) * scale;
    var destWidth = (texture.width / tr) * scale;
    var destHeight = (texture.height / tr) * scale;

    this.mCtx.drawImage(texture.native, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  }

  endFrame() {
    super.endFrame();

    if (this.data) {
      this.mCtx.putImageData(this.data, 0, 100);
    }
  }

  beginClip(clipRect, px, py) {
    let r = this.mStageScaleFactor;

    this.mCtx.save();
    this.mCtx.beginPath();
    this.mCtx.rect((clipRect.x + px) * r, (clipRect.y + py) * r, clipRect.width * r, clipRect.height * r);

    this.mCtx.clip();
  }

  endClip() {
    this.mCtx.restore();
  }

  /**
   * @ignore
   * @param {Matrix} m
   *
   * @return {void}
   */
  setTransform(m) {
    this.mTransform = m;

    let scale = this.mStageScaleFactor;
    const v = m.value;

    if (this.mSnapToPixels === true)
      this.mCtx.setTransform(v[0], v[1], v[2], v[3], (v[4] * scale) | 0, (v[5] * scale) | 0);
    else
      this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4] * scale, v[5] * scale);

  }

  /**
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    if (value == this.mGlobalAlpha)
      return;

    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }

  /**
   * @inheritDoc
   * @override
   *
   * @param {string} blendMode
   *
   * @return {void}
   */
  set globalBlendMode(blendMode) {
    blendMode = CanvasBlendMode[blendMode];

    if (this.mGlobalBlendMode === blendMode)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * clear
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  clear() {
    // TODO: clear only changed region
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);

    let viewport = Black.instance.viewport;
    if (viewport.isTransperent === false) {
      this.mCtx.fillStyle = this.hexColorToString(viewport.backgroundColor);
      this.mCtx.fillRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
    }

    super.clear();
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   *
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas);
  }
}