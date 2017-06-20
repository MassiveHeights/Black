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
    // if (blendMode === BlendMode.AUTO)
    //   return;

    if (this.mGlobalBlendMode === blendMode)
      return;  
    
    // small performance win
    // if (this.mCtx.globalCompositeOperation === blendMode)
    //   return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * drawImage
   *
   * @inheritDoc
   * @override
   *
   * @param {Texture} texture
   * @param {number} px
   * @param {number} py
   *
   * @return {void}
   */
  drawImage(texture, px, py) {
    let w = texture.width;
    let h = texture.height;
    let ox = texture.untrimmedRect.x;
    let oy = texture.untrimmedRect.y;

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
  }

  /**
   * drawText
   *
   * @inheritDoc
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
    let y = 0;
    if (style.align === 'center')
      x += (bounds.width - textWidth) * 0.5;
    else if (style.align === 'right')
      x += (bounds.width - textWidth);

    this.mCtx.textBaseline = 'top';    

    if (style.strokeThickness > 0) {
      this.mCtx.lineJoin = 'round';
      this.mCtx.miterLimit = 2;
      this.mCtx.lineWidth = style.strokeThickness;
      this.mCtx.strokeStyle = this.hexColorToString(style.strokeColor);
      this.mCtx.strokeText(text, x + bounds.x, y + bounds.y);
    }

    this.mCtx.fillText(text, x + bounds.x, y + bounds.y);
    
    this.mCtx.closePath();
  }

  /**
   * clear
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  clear() {
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  beginFrame() {
    super.beginFrame();

    this.clear();
    //this.mCtx.save();

    this.mCtx.globalCompositeOperation = this.mGlobalBlendMode;
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  endFrame() {
    super.endFrame();

    //this.mCtx.restore();
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
