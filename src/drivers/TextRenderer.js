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

    /** @type {string|null} @ignore */
    this.text = null;

    /** @type {TextStyle} @ignore */
    this.style = null;

    /** @type {boolean} @ignore */
    this.multiline = false;

    /** @type {boolean} @ignore */
    this.autoSize = false;

    /** @type {TextMetricsData} @ignore */
    this.metrics = null;

    /** @type {TextStyle.FontAlign} @ignore */
    this.align = TextStyle.FontAlign.NONE;

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

    /** @type {number} @ignore */
    this.lineHeight = 0;

    /** @private @type {Matrix} @ignore */
    this.__transformCache = new Matrix();

    /** @private @type {HTMLCanvasElement} */
    this.__canvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** @private @type {CanvasRenderingContext2D} */
    this.__context = /** @type {CanvasRenderingContext2D} */ (this.__canvas.getContext('2d'));

    /** */
    this.__context.lineJoin = 'round';

    /** */
    this.__context.miterLimit = 2;
  }

  /**
   * @ignore
   * @private
   * @param {TextSegmentMetricsData} segment
   * @param {CanvasRenderingContext2D} ctx
   * @param {VideoNullDriver} driver
   * @param {FontMetrics} fontMetrics
   * @param {boolean} isStroke
   */
  renderSegment(metrics, segment, ctx, driver, fontMetrics, isStroke) {
    let baseline = fontMetrics.baselineNormalized * segment.style.size;

    if (isStroke === true) {
      ctx.lineWidth = segment.style.strokeThickness;
      ctx.strokeStyle = VideoNullDriver.hexColorToString(segment.style.strokeColor);
    } else {
      ctx.fillStyle = VideoNullDriver.hexColorToString(segment.style.color);
    }

    ctx.font = `${segment.style.weight} ${segment.style.style} ${segment.style.size}px ${segment.style.family}`;

    let lx = segment.bounds.x - metrics.strokeBounds.x;
    let ly = baseline + segment.bounds.y - metrics.strokeBounds.y;
    
    if (this.align === 'center')
      lx += metrics.bounds.width * .5 - metrics.lineWidth[segment.lineIndex] * .5;
    else if (this.align === 'right')
      lx += metrics.bounds.width - metrics.lineWidth[segment.lineIndex];

    if (isStroke === true)
      ctx.strokeText(segment.text, lx, ly);
    else
      ctx.fillText(segment.text, lx, ly);
  }

  render(driver) {
    if (this.text === null)
      return;

    const cvs = this.__canvas;
    const ctx = this.__context;
    ctx.textBaseline = 'alphabetic';

    // find canvas bounds
    let canvasBounds = this.metrics.strokeBounds.clone();

    if (this.dirty & DirtyFlag.RENDER_CACHE) {
      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      let fontMetrics = FontMetrics.get(this.style.family);
      let segments = this.metrics.segments;

      for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        if (segment.style.strokeThickness > 0) {
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          this.renderSegment(this.metrics, segment, ctx, driver, fontMetrics, true);
        }
      }

      for (let i = 0; i < segments.length; i++)
        this.renderSegment(this.metrics, segments[i], ctx, driver, fontMetrics, false);

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
    const hasStroke = this.metrics.strokeBounds.x !== 0 || this.metrics.strokeBounds.y !== 0;

    let fieldXOffset = 0;
    let fieldYOffset = 0;

    if (this.autoSize === false) {
      if (this.align === 'center')
        fieldXOffset = (this.fieldWidth - this.metrics.bounds.width) * 0.5;
      else if (this.align === 'right')
        fieldXOffset = this.fieldWidth - this.metrics.bounds.width;

      if (this.vAlign === 'middle')
        fieldYOffset = (this.fieldHeight - this.metrics.bounds.height) * 0.5;
      else if (this.vAlign === 'bottom')
        fieldYOffset = this.fieldHeight - this.metrics.bounds.height;
    }

    if (hasStroke === true || this.autoSize === false) {
      this.transform.copyTo(this.__transformCache);
      this.__transformCache.translate(this.metrics.strokeBounds.x + fieldXOffset, this.metrics.strokeBounds.y + fieldYOffset);
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