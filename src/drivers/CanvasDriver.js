/* @echo EXPORT */
class CanvasDriver extends NullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** @type {CanvasRenderingContext2D|null} */
    this.mCtx = null;

    this.mGlobalAlpha = 1;
    this.mGlobalBlendMode = BlendMode.NORMAL;

    this.__createCanvas();
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement("canvas"));
    cvs.id = "canvas";
    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  /**
   * setTransform
   *
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
   * globalAlpha
   *
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }


  /**
   * globalBlendMode
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
   * @param {Texture} texture
   *
   * @return {void}
   */
  drawImage(texture) {
    let w = texture.width;
    let h = texture.height;
    let ox = texture.untrimmedRect.x;
    let oy = texture.untrimmedRect.y;

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
  }

  /**
   * drawText
   *
   * @override
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
   *
   * @return {void}
   */
  clear() {
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
  }

  /**
   * beginFrame
   *
   * @return {void}
   */
  beginFrame() {
    super.beginFrame();

    this.clear();
    this.mCtx.save();
  }

  /**
   * endFrame
   *
   * @return {void}
   */
  endFrame() {
    super.endFrame();

    this.mCtx.restore();
  }

  /**
   * getTextureFromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture|null} Description
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
