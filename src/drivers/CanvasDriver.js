/**
 * An video driver that draw everything into DOM Canvas element.
 *
 * @cat drivers
 * @extends VideoNullDriver
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

    this.mGlobalAlpha = 1;
    this.mGlobalBlendMode = BlendMode.NORMAL;
    this.mCurrentObject = null;

    this.__createCanvas();
  }

  /**
   * @private
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.id = 'canvas';
    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
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

    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  /**
   * @ignore
   * @param {Matrix} m
   *
   * @return {void}
   */
  setTransform(m) {
    super.setTransform(m);

    let v = m.value;
    this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
  }

  /**
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }

  /**
   * @inheritdoc
   * @override
   *
   * @param {string} blendMode
   *
   * @return {void}
   */
  set globalBlendMode(blendMode) {
    if (blendMode === BlendMode.AUTO)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * drawImage
   *
   * @inheritdoc
   * @override
   *
   * @param {Texture} texture
   *
   * @return {void}
   */
  drawImage(texture) {
    let w = texture.width;
    let h = texture.height;
    let localBounds = Rectangle.__cache;
    this.mCurrentObject.onGetLocalBounds(localBounds);

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, localBounds.x, localBounds.y, w, h);
  }

  /**
   * drawText
   *
   * @inheritdoc
   * @override
   *
   * @param {string} text
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   * @param {number} textWidth
   * @param {number} textHeight
   *
   * @return {void}
   */
  drawText(text, style, bounds, textWidth, textHeight) {
    this.mCtx.beginPath();
    this.mCtx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
    this.mCtx.clip();

    this.mCtx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    this.mCtx.fillStyle = this.hexColorToString(style.color);

    let x = 0;
    if (style.align === 'center')
      x = (bounds.width * 0.5) - textWidth * 0.5;

    else if (style.align === 'right')
      x = bounds.width - textWidth;

    this.mCtx.textBaseline = 'top';
    this.mCtx.fillText(text, x, 0);

    if (style.strokeThickness > 0) {
      this.mCtx.lineWidth = style.strokeThickness;
      this.mCtx.strokeStyle = this.hexColorToString(style.strokeColor);
      this.mCtx.strokeText(text, x, 0);
    }
    this.mCtx.closePath();
  }

  /**
   * clear
   * @inheritdoc
   * @override
   *
   * @return {void}
   */
  clear() {
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
  }

  /**
   * @inheritdoc
   * @override
   *
   * @return {void}
   */
  beginFrame() {
    super.beginFrame();

    this.clear();
    this.mCtx.save();
  }

  /**
   * @inheritdoc
   * @override
   *
   * @return {void}
   */
  endFrame() {
    super.endFrame();

    this.mCtx.restore();
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   *
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas, new Rectangle(0, 0, canvas.width, canvas.height));
  }

  /**
   * save
   *
   * @override
   * @param {GameObject|null} gameObject Used for internal binding.
   *
   * @return {void}
   */
  save(gameObject) {
    this.mCtx.save();
    this.mCurrentObject = gameObject;
  }

  /**
   * restore
   *
   * @return {void}
   */
  restore() {
    this.mCtx.restore();
  }
}
