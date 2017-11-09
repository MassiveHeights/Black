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
      Text: TextRendererCanvas
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
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.style.position = 'absolute';
    cvs.id = 'canvas';
    cvs.width = this.mClientWidth;
    cvs.height = this.mClientHeight;
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
    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  drawTexture(texture) {
    if (texture.isValid === false)
      return;

    const w = texture.width;
    const h = texture.height;
    const ox = texture.untrimmedRect.x;
    const oy = texture.untrimmedRect.y;

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
  }

  beginClip(clipRect, px, py) {
    this.mCtx.save();
    this.mCtx.beginPath();
    this.mCtx.rect(clipRect.x + px, clipRect.y + py, clipRect.width, clipRect.height);
    
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

    const v = m.value;
    this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
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