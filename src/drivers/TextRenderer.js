/**
 * Responsible for rendering `TextField` objects by different drivers.
 *
 * @extends Renderer
 * @cat drivers
 */
/* @echo EXPORT */
class TextRenderer extends Renderer {
  /**
   * Creates new instance of TextRenderer.
   */
  constructor() {
    super();

    /** @type {string} @ignore */
    this.text = null;

    /** @type {TextInfo} @ignore */
    this.style = null;

    /** @type {boolean} @ignore */
    this.multiline = false;

    /** @type {boolean} @ignore */
    this.autoSize = false;

    /** @type {Rectangle} @ignore */
    this.bounds = new Rectangle(0, 0, 100, 100);

    /** @type {Array} @ignore */
    this.lineBounds = null;

    /** @type {TextInfo.FontAlign} @ignore */
    this.align = null;

    /** @type {boolean} @ignore */
    this.drawBounds = false;

    /** @type {Rectangle} @ignore */
    this.padding = new Rectangle(0, 0, 0, 0);

    /** @type {string} @ignore */
    this.vAlign = 'top';

    /** @type {number} @ignore */
    this.fieldWidth = 0;

    /** @type {number} @ignore */
    this.fieldHeight = 0;

    /** @private @type {Matrix} @ignore */
    this.__transformCache = new Matrix();

    /** @private @type {HTMLCanvasElement} */
    this.__canvas = document.createElement('canvas');

    /** @private @type {CanvasRenderingContext2D} */
    this.__context = this.__canvas.getContext('2d');

    this.__context.lineJoin = 'round';
    this.__context.miterLimit = 2;
  }

  /**
   * @ignore
   * @private
   * @param {CanvasRenderingContext2D} ctx
   * @param {VideoNullDriver} driver
   * @param {Array<string>} lines
   * @param {FontMetrics} fontMetrics
   * @param {boolean} isStroke
   */
  __renderLines(ctx, driver, lines, fontMetrics, isStroke = false) {
    let baseline = fontMetrics.baselineNormalized * this.style.size;

    const strokeThickness = this.style.strokeThickness;

    if (isStroke === true) {
      ctx.lineWidth = strokeThickness;
      ctx.strokeStyle = VideoNullDriver.hexColorToString(this.style.strokeColor);
    } else {
      ctx.fillStyle = VideoNullDriver.hexColorToString(this.style.color);
    }

    let width = this.bounds.width;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let lineBound = this.lineBounds[i];
      let lx = strokeThickness;
      let ly = (baseline + (baseline * i * this.lineHeight)) + strokeThickness;

      if (this.align === 'center')
        lx += (width - lineBound.width) * 0.5;
      else if (this.align === 'right')
        lx += width - lineBound.width;

      lx += this.padding.x;
      ly += this.padding.y;

      if (isStroke === true)
        ctx.strokeText(line, lx, ly);
      else
        ctx.fillText(line, lx, ly);
    }
  }

  /**
   * @inheritDoc
   */
  render(driver) {
    if (this.text === null)
      return;

    const strokeThickness = this.style.strokeThickness;
    const cvs = this.__canvas;
    const ctx = this.__context;

    let canvasBounds = this.bounds.clone().inflate(strokeThickness + this.padding.right, strokeThickness + this.padding.bottom);

    if (this.dirty & DirtyFlag.RENDER_CACHE) {
      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      let fontMetrics = FontMetrics.get(this.style.name);

      if (this.drawBounds === true) {
        ctx.strokeStyle = VideoNullDriver.hexColorToString(0xff0000);
        ctx.strokeRect(0, 0, cvs.width, cvs.height);

        ctx.strokeStyle = VideoNullDriver.hexColorToString(0xff00ff);
        ctx.strokeRect(0, 0, this.bounds.width, this.bounds.height);
      }

      ctx.font = `${this.style.size}px ${this.style.name}`;
      ctx.textBaseline = 'alphabetic'; // alphabetic

      const lines = this.multiline === true ? this.text.split('\n') : [this.text.replace(/\n/g, '')];

      if (this.drawBounds === true) {
        for (let i = 0; i < lines.length; i++) {
          let line = this.lineBounds[i];
          ctx.strokeRect(line.x, line.y, line.width, line.height);
        }
      }

      if (strokeThickness > 0) {
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        this.__renderLines(ctx, driver, lines, fontMetrics, true)
      }

      this.__renderLines(ctx, driver, lines, fontMetrics, false);

      if (this.texture === null)
        this.texture = new Texture(cvs);
      else
        this.texture.set(cvs);
    }
  }

  /**
   * @inheritDoc
   */
  getTransform() {
    const strokeThickness = this.style.strokeThickness;

    let fieldXOffset = 0;
    let fieldYOffset = 0;

    if (this.autoSize === false) {
      if (this.align === 'center')
        fieldXOffset = (this.fieldWidth - this.bounds.width) * 0.5;
      else if (this.align === 'right')
        fieldXOffset = this.fieldWidth - this.bounds.width;

      if (this.vAlign === 'middle')
        fieldYOffset = (this.fieldHeight - this.bounds.height) * 0.5;
      else if (this.vAlign === 'bottom')
        fieldYOffset = this.fieldHeight - this.bounds.height;
    }

    if (strokeThickness !== 0 || this.autoSize === false) {
      this.transform.copyTo(this.__transformCache);
      this.__transformCache.translate(-strokeThickness + fieldXOffset, -strokeThickness + fieldYOffset);
      return this.__transformCache;
    } else {
      return this.transform;
    }
  }

  /**
   * @inheritDoc
   */
  get isRenderable() {
    return this.text !== null;
  }
}