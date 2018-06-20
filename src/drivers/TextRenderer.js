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

    this.texture = null;

    /** @private @type {Matrix} @ignore */
    this.mTransformCache = new Matrix();

    /** @private @type {HTMLCanvasElement} */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** @private @type {CanvasRenderingContext2D} */
    this.mContext = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    /** */
    this.mContext.lineJoin = 'round';

    /** */
    this.mContext.miterLimit = 2;
  }

  preRender(driver, isBackBufferActive) {
    this.skipChildren = !(this.gameObject.mAlpha > 0 && this.gameObject.mVisible === true);
    this.skipSelf = false;
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
      ctx.strokeStyle = ColorHelper.hexColorToString(segment.style.strokeColor);
    } else {
      ctx.fillStyle = ColorHelper.hexColorToString(segment.style.color);
    }

    ctx.font = `${segment.style.weight} ${segment.style.style} ${segment.style.size}px ${segment.style.family}`;

    let lx = segment.bounds.x - Math.min(metrics.strokeBounds.x, metrics.shadowBounds.x);
    let ly = baseline + segment.bounds.y - Math.min(metrics.strokeBounds.y, metrics.shadowBounds.y);

    lx += this.gameObject.padding.x;
    ly += this.gameObject.padding.y;

    if (this.gameObject.align === 'center')
      lx += metrics.bounds.width * .5 - metrics.lineWidth[segment.lineIndex] * .5;
    else if (this.gameObject.align === 'right')
      lx += metrics.bounds.width - metrics.lineWidth[segment.lineIndex];

    if (isStroke === true)
      ctx.strokeText(segment.text, lx, ly);
    else
      ctx.fillText(segment.text, lx, ly);
  }

  upload(driver, isBackBufferActive, customTransform = null) {
    let transform = this.mTransformCache;

    if (this.gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      this.gameObject.onGetLocalBounds();

      this.metrics = this.gameObject.mMetrics;
      this.updateTransform();
    }

    if (isBackBufferActive === false) {
      if (customTransform === null) {
        transform = transform.clone(); // TODO: too much allocations
        transform.data[4] -= Black.stage.mX;
        transform.data[5] -= Black.stage.mY;
      } else {
        transform = transform.clone(); // TODO: too much allocations
        transform.prepend(customTransform);
      }
    }

    driver.setTransform(transform);
    driver.setGlobalAlpha(this.alpha);
    driver.setGlobalBlendMode(this.blendMode);

    if (this.endPassRequired === true)
      driver.beginClip(this.gameObject.mClipRect, this.gameObject.mPivotX, this.gameObject.mPivotY);
  }

  render(driver) {
    if (this.gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      this.gameObject.mDirty ^= DirtyFlag.RENDER_CACHE;

      const cvs = this.mCanvas;
      const ctx = this.mContext;
      ctx.textBaseline = 'alphabetic';

      let canvasBounds = this.metrics.strokeBounds.clone();
      canvasBounds.union(this.metrics.shadowBounds);
      canvasBounds.inflate(this.gameObject.padding.right, this.gameObject.padding.bottom);

      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      let fontMetrics = FontMetrics.get(this.gameObject.mDefaultStyle.family);
      let segments = this.metrics.segments;

      for (let i = 0; i < segments.length; i++) {
        if (segments[i].style.dropShadow) {
          ctx.save();
          ctx.shadowColor = ColorHelper.intToRGBA(segments[i].style.shadowColor, segments[i].style.shadowAlpha);
          ctx.shadowBlur = segments[i].style.shadowBlur;
          ctx.shadowOffsetX = segments[i].style.shadowDistanceX;
          ctx.shadowOffsetY = segments[i].style.shadowDistanceY;
          this.renderSegment(this.metrics, segments[i], ctx, driver, fontMetrics, false);
          ctx.restore();
        }
      }

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
  updateTransform() {
    let transform = this.gameObject.worldTransformation;

    let fieldXOffset = 0;
    let fieldYOffset = 0;

    let filterOffsetX = Math.min(this.metrics.strokeBounds.x, this.metrics.shadowBounds.x);
    let filterOffsetY = Math.min(this.metrics.strokeBounds.y, this.metrics.shadowBounds.y);

    const hasFilter = filterOffsetX !== 0 || filterOffsetY !== 0;

    if (this.gameObject.mAutoSize === false) {
      if (this.gameObject.align === 'center')
        fieldXOffset = (this.gameObject.mFieldWidth - this.metrics.bounds.width) * 0.5;
      else if (this.gameObject.align === 'right')
        fieldXOffset = this.gameObject.mFieldWidth - this.metrics.bounds.width;

      if (this.gameObject.mVerticalAlign === 'middle')
        fieldYOffset = (this.gameObject.mFieldHeight - this.metrics.bounds.height) * 0.5;
      else if (this.gameObject.mVerticalAlign === 'bottom')
        fieldYOffset = this.gameObject.mFieldHeight - this.metrics.bounds.height;
    }

    if (hasFilter === true || this.gameObject.mAutoSize === false) {
      transform.copyTo(this.mTransformCache);
      this.mTransformCache.translate((filterOffsetX + fieldXOffset) - this.gameObject.padding.x, (filterOffsetY + fieldYOffset) - this.gameObject.padding.y);
    } else if (this.gameObject.padding.isEmpty === false) {
      transform.copyTo(this.mTransformCache);
      this.mTransformCache.translate(-this.gameObject.padding.x, -this.gameObject.padding.y);
    } else {
      this.mTransformCache = transform;
    }
  }
}