import { Matrix } from "../geom/Matrix";
import { Renderer } from "./Renderer";
import { DirtyFlag } from "../core/DirtyFlag";
import { ColorHelper } from "../utils/ColorHelper";
import { FontMetrics } from "../display/text/FontMetrics";
import { Texture } from "../textures/Texture";

/**
 * Responsible for rendering `TextField` objects by different drivers.
 *
 * @extends black-engine~Renderer
 * @cat drivers
 */
export class TextRenderer extends Renderer {
  /**
   * Creates new instance of TextRenderer.
   */
  constructor() {
    super();

    this.texture = null;

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     * @ignore 
     */
    this.mTransformCache = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     * @ignore 
     */
    this.mTransform = null;

    /** 
     * @private 
     * @type {boolean} 
     * @ignore 
     */
    this.mUseTransformCache = false;

    /** 
     * @private 
     * @type {HTMLCanvasElement} 
     */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** 
     * @private 
     * @type {CanvasRenderingContext2D} 
     */
    this.mContext = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    /** 
     * @ignore
     */
    this.mContext.lineJoin = 'round';

    /** 
     * @ignore
     */
    this.mContext.miterLimit = 2;

    /** 
     * @private 
     * @type {black-engine~TextMetricsData|null} 
     */
    this.mMetrics = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;

    this.skipChildren = !(this.gameObject.mAlpha > 0 && this.gameObject.mVisible === true);
    this.skipSelf = this.skipChildren === true;
  }

  /** @inheritDoc */
  upload(driver, session) {
    let gameObject = /** @type {TextField} */ (this.gameObject);

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      gameObject.onGetLocalBounds();
      this.mMetrics = gameObject.mMetrics;
    }

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE || gameObject.mDirty & DirtyFlag.RENDER)
      this.updateTransform();

    this.mTransform = this.mUseTransformCache === true ? this.mTransformCache : this.gameObject.worldTransformation;

    driver.setSnapToPixels(gameObject.snapToPixels);
    driver.setTransform(this.mTransform);
    driver.setGlobalAlpha(this.alpha);
    driver.setGlobalBlendMode(this.blendMode);

    if (this.endPassRequired === true) {
      driver.beginClip(gameObject.mClipRect, gameObject.mPivotX, gameObject.mPivotY);
    }
  }

  /**
   * @ignore
   * @private
   * @param {black-engine~TextMetricsData} metrics
   * @param {black-engine~TextSegmentMetricsData} segment
   * @param {CanvasRenderingContext2D} ctx
   * @param {black-engine~VideoNullDriver} driver
   * @param {black-engine~FontMetrics} fontMetrics
   * @param {boolean} isStroke
   */
  renderSegment(metrics, segment, ctx, driver, fontMetrics, isStroke) {
    let gameObject = /** @type {TextField} */ (this.gameObject);

    let baseline = fontMetrics.baselineNormalized * segment.style.size;

    if (isStroke === true) {
      ctx.lineWidth = segment.style.strokeThickness;
      ctx.strokeStyle = ColorHelper.intToRGBA(segment.style.strokeColor, segment.style.strokeAlpha);
    } else {
      ctx.fillStyle = ColorHelper.intToRGBA(segment.style.color, segment.style.alpha);
    }

    ctx.font = `${segment.style.weight} ${segment.style.style} ${segment.style.size}px "${segment.style.family}"`;

    let lx = segment.bounds.x - Math.min(metrics.strokeBounds.x, metrics.shadowBounds.x);
    let ly = baseline + segment.bounds.y - Math.min(metrics.strokeBounds.y, metrics.shadowBounds.y);

    lx += gameObject.padding.x;
    ly += gameObject.padding.y;

    if (gameObject.align === 'center')
      lx += metrics.bounds.width * 0.5 - metrics.lineWidth[segment.lineIndex] * 0.5;
    else if (gameObject.align === 'right')
      lx += metrics.bounds.width - metrics.lineWidth[segment.lineIndex];

    if (isStroke === true)
      ctx.strokeText(segment.text, lx, ly);
    else
      ctx.fillText(segment.text, lx, ly);
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {TextField} */ (this.gameObject);

    if (gameObject.mHighQuality === true && gameObject.mDirty & DirtyFlag.RENDER) {
      gameObject.mDirty ^= DirtyFlag.RENDER;
      gameObject.mDirty |= DirtyFlag.RENDER_CACHE;
    }

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      gameObject.mDirty ^= DirtyFlag.RENDER_CACHE;

      const cvs = this.mCanvas;
      const ctx = this.mContext;
      let scale = 1;
      ctx.textBaseline = 'alphabetic';

      if (gameObject.mHighQuality === true) {
        let data = this.mTransform.data;
        let gameObjectScaleX = Math.sqrt((data[0] * data[0]) + (data[2] * data[2]));
        let gameObjectScaleY = Math.sqrt((data[1] * data[1]) + (data[3] * data[3]));
        scale = Math.max(gameObjectScaleX, gameObjectScaleY) * driver.renderScaleFactor;
      }

      let canvasBounds = this.mMetrics.strokeBounds.clone();
      canvasBounds.union(this.mMetrics.shadowBounds);
      canvasBounds.inflate(gameObject.padding.right, gameObject.padding.bottom);
      canvasBounds.scale(scale, scale);

      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      let fontMetrics = FontMetrics.get(gameObject.mDefaultStyle.family);
      let segments = this.mMetrics.segments;

      ctx.save();
      ctx.scale(scale, scale);

      for (let i = 0; i < segments.length; i++) {
        if (segments[i].style.dropShadow) {
          ctx.save();
          ctx.shadowColor = ColorHelper.intToRGBA(segments[i].style.shadowColor, segments[i].style.shadowAlpha);
          ctx.shadowBlur = segments[i].style.shadowBlur;
          ctx.shadowOffsetX = segments[i].style.shadowDistanceX * scale;
          ctx.shadowOffsetY = segments[i].style.shadowDistanceY * scale;
          this.renderSegment(this.mMetrics, segments[i], ctx, driver, fontMetrics, false);
          ctx.restore();
        }
      }

      for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        if (segment.style.strokeThickness > 0) {
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          this.renderSegment(this.mMetrics, segment, ctx, driver, fontMetrics, true);
        }
      }

      for (let i = 0; i < segments.length; i++)
        this.renderSegment(this.mMetrics, segments[i], ctx, driver, fontMetrics, false);

      ctx.restore();

      // whats the max texture size?
      if (this.texture === null)
        this.texture = new Texture(cvs, null, null, 1 / scale);
      else
        this.texture.set(cvs, null, null, 1 / scale);
    }
  }

  /** @ignore */
  updateTransform() {
    let gameObject = /** @type {TextField} */ (this.gameObject);
    let transform = gameObject.worldTransformation;

    let fieldXOffset = 0;
    let fieldYOffset = 0;

    let filterOffsetX = Math.min(this.mMetrics.strokeBounds.x, this.mMetrics.shadowBounds.x);
    let filterOffsetY = Math.min(this.mMetrics.strokeBounds.y, this.mMetrics.shadowBounds.y);

    const hasFilter = filterOffsetX !== 0 || filterOffsetY !== 0;

    if (gameObject.mAutoSize === false) {
      if (gameObject.align === 'center')
        fieldXOffset = (gameObject.mFieldWidth - this.mMetrics.bounds.width) * 0.5;
      else if (gameObject.align === 'right')
        fieldXOffset = gameObject.mFieldWidth - this.mMetrics.bounds.width;

      if (gameObject.mVerticalAlign === 'middle')
        fieldYOffset = (gameObject.mFieldHeight - this.mMetrics.bounds.height) * 0.5;
      else if (gameObject.mVerticalAlign === 'bottom')
        fieldYOffset = gameObject.mFieldHeight - this.mMetrics.bounds.height;
    }

    if (hasFilter === true || gameObject.mAutoSize === false) {
      this.mUseTransformCache = true;
      transform.copyTo(this.mTransformCache);
      this.mTransformCache.translate((filterOffsetX + fieldXOffset) - gameObject.padding.x, (filterOffsetY + fieldYOffset) - gameObject.padding.y);
    } else if (gameObject.padding.isEmpty === false) {
      this.mUseTransformCache = true;
      transform.copyTo(this.mTransformCache);
      this.mTransformCache.translate(-gameObject.padding.x, -gameObject.padding.y);
    } else {
      this.mUseTransformCache = false;
    }
  }
}