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
   * Measures text with a given style.
   *
   * @inheritDoc
   * @override
   * 
   * @param {TextField} textField    Text to measure.
   * @param {TextInfo} style Text style to apply onto text.
   * @param {Rectangle} bounds.
   *
   * @return {Rectangle} A Vector with width and height of the text bounds.
   */
  measureText(textField, style, bounds) {
    let lines = textField.lines;
    let widths = textField.lineWidths;
    let lineOffset = textField.lineOffset;
    let text = textField.text;
    let multiLine = textField.multiLine;
    let strokeThickness = style.strokeThickness;
    let ctx = this.mCtx;
    ctx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    ctx.textBaseline = `top`;
    
    lines.length = 0;
    widths.length = 0;
    multiLine ? lines.push(...text.split(`\n`)) : lines.push(text);

    for (let i = 0, l = lines.length; i < l; i++) {
      widths[i] = ctx.measureText(lines[i]).width + strokeThickness;
    }
    
    if (!textField.autoSize) {
      return bounds.set(0, 0, textField.fieldWidth, textField.fieldHeight);
    }
    
    return bounds.set(0, 0, Math.max(...widths), (lines.length - 1) * lineOffset + style.size);
  }

  /**
   * drawText
   *
   * @inheritDoc
   * @override
   *
   * @param {TextField} textField
   * @param {TextInfo} style
   * @param {Rectangle} bounds
   *
   * @return {void}
   */
  drawText(textField, style, bounds) {
    let lines = textField.lines;
    let widths = textField.lineWidths;
    let lineOffset = textField.lineOffset;
    let strokeThickness = style.strokeThickness;
    let align = style.align;
    let maxWidth = bounds.width;
    
    let ctx = this.mCtx;
    ctx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    ctx.fillStyle = this.hexColorToString(style.color);
    ctx.textBaseline = `top`;

    if (strokeThickness !== 0) {
      ctx.lineJoin = `round`;
      ctx.miterLimit = 2;
      ctx.lineWidth = strokeThickness;
      ctx.strokeStyle = this.hexColorToString(style.strokeColor);
    }

    if (!textField.autoSize) {
      ctx.rect(0, 0, maxWidth, bounds.height);
      ctx.clip();
    }

    // ctx.fillRect(0, 0, maxWidth, bounds.height);

    for (let i = 0, l = lines.length; i < l; i++) {
      let width = widths[i];
      let y = strokeThickness / 2 + lineOffset * i;
      let x = strokeThickness / 2;

      if (align === `center`) {
        x += maxWidth / 2 - width / 2;
      } else if (align === `right`) {
        x += maxWidth - width;
      }

      strokeThickness !== 0 && ctx.strokeText(lines[i], x, y);
      ctx.fillText(lines[i], x, y);
    }
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
