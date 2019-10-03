import { Renderer } from "../Renderer";
import { CanvasRenderTexture } from "../../textures/CanvasRenderTexture";
import { Rectangle } from "../../geom/Rectangle";
import { Black } from "../../Black";
import { Matrix } from "../../geom/Matrix";
import { BlendMode } from "../BlendMode";
import { DirtyFlag } from "../../core/DirtyFlag";

/**
 * Renders `DisplayObject` objects on canvas.
 *
 * @extends black-engine~Renderer
 * @cat drivers.canvas
 */
export class DisplayObjectRendererCanvas extends Renderer {
  constructor() {
    super();

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mCacheAsBitmapDirty = true;

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     */
    this.mCacheAsBitmapMatrixCache = null;

    /** 
     * @private 
     * @type {black-engine~CanvasRenderTexture|null} 
     */
    this.mCacheTexture = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle|null} 
     */
    this.mCacheBounds = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsClipped = false;

    this.mIsCached = false;

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     */
    this.mBakeInvertedMatrix = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);

    this.mIsClipped = gameObject.mClipRect !== null;
    this.endPassRequired = this.mIsClipped;

    if (gameObject.mCacheAsBitmap === true) {
      if (gameObject.mCacheAsBitmapDynamic === false) {
        if (this.mIsCached === false) {
          this.mIsCached = true;
          gameObject.setTransformDirty();
          this.__refreshBitmapCache();
          this.mCacheAsBitmapDirty = false;
          this.endPassRequired = false;
        } else {
          gameObject.mDirty |= DirtyFlag.RENDER;
        }
      } else {
        let isStatic = gameObject.checkStatic(true);

        if (isStatic === true && this.mCacheAsBitmapDirty === true) {
          gameObject.setTransformDirty();
          this.__refreshBitmapCache();
          this.mCacheAsBitmapDirty = false;
          this.endPassRequired = false;
        } else if (isStatic === false) {
          this.mCacheAsBitmapDirty = true;
          gameObject.mDirty |= DirtyFlag.RENDER;
        }
      }
    }

    this.skipChildren = gameObject.mCacheAsBitmap === true && this.mCacheAsBitmapDirty === false || this.mIsClipped && gameObject.mClipRect.isEmpty;
    this.skipSelf = false;

    if (this.skipChildren === true) {
      this.endPassRequired = false;
      this.skipSelf = true;
    }
  }

  /** @inheritDoc */
  begin(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);
    if (this.skipChildren === true && session.isBackBufferActive === true) {
      this.alpha = 1;
      this.blendMode = BlendMode.NORMAL;
      this.color = null;
      this.skipSelf = gameObject.mAlpha <= 0 || gameObject.mVisible === false || this.mIsClipped && gameObject.mClipRect.isEmpty;
    }
    else {
      this.alpha = gameObject.mAlpha * this.parent.alpha;
      this.color = gameObject.mColor === null ? this.parent.color : gameObject.mColor;
      this.blendMode = gameObject.mBlendMode === BlendMode.AUTO ? this.parent.blendMode : gameObject.mBlendMode;

      this.skipChildren = gameObject.mAlpha <= 0 || gameObject.mVisible === false;
      this.skipSelf = this.skipChildren === true || this.mIsClipped === false || this.mIsClipped && gameObject.mClipRect.isEmpty;
    }
  }

  /** @inheritDoc */
  upload(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);
    let transform = gameObject.worldTransformation;

    if (this.skipChildren === true && this.mCacheAsBitmapMatrixCache) {
      transform = this.mCacheAsBitmapMatrixCache;

      if (gameObject.mCacheAsBitmapDynamic === false) {
        transform = new Matrix()
          .append(this.gameObject.worldTransformation)
          .append(this.mBakeInvertedMatrix)
          .append(this.mCacheAsBitmapMatrixCache);
      }
    }

    if (this.skipChildren === true || this.endPassRequired === true) {
      driver.setSnapToPixels(gameObject.snapToPixels);
      driver.setTransform(transform);
      driver.setGlobalAlpha(this.alpha);
      driver.setGlobalBlendMode(this.blendMode);
    }

    if (this.endPassRequired === true)
      driver.beginClip(gameObject.mClipRect, gameObject.mPivotX, gameObject.mPivotY);
  }

  /** @inheritDoc */
  render(driver, session) {
    if (this.skipChildren === true && session.isBackBufferActive === true)
      driver.drawTexture(this.mCacheTexture);
  }

  __refreshBitmapCache() {
    const bounds = this.gameObject.getBounds(Black.stage, true);
    const sf = Black.stage.scaleFactor;
    const fs = Black.driver.renderScaleFactor * sf;

    /** @type {Matrix} */
    let m = Matrix.pool.get();
    m.set(1, 0, 0, 1, ~~(-bounds.x * sf - Black.stage.mX), ~~(-bounds.y * sf - Black.stage.mY));

    if (this.mIsClipped === true && this.skipChildren === true) {
      m.data[4] += this.gameObject.mPivotX * sf;
      m.data[5] += this.gameObject.mPivotY * sf;
    }

    if (this.mCacheBounds === null)
      this.mCacheBounds = new Rectangle();

    bounds.copyTo(this.mCacheBounds);
    bounds.width *= fs;
    bounds.height *= fs;

    if (this.mCacheTexture === null)
      this.mCacheTexture = new CanvasRenderTexture(bounds.width, bounds.height, 1);
    else
      this.mCacheTexture.resize(bounds.width, bounds.height, 1);

    Black.driver.render(this.gameObject, this.mCacheTexture, m);
    Matrix.pool.release(m);

    if (this.mCacheAsBitmapMatrixCache === null)
      this.mCacheAsBitmapMatrixCache = new Matrix();

    this.mCacheAsBitmapMatrixCache.copyFrom(m);
    this.mCacheAsBitmapMatrixCache.scale(1 / Black.driver.renderScaleFactor, 1 / Black.driver.renderScaleFactor);
    this.mCacheAsBitmapMatrixCache.data[4] = -this.mCacheAsBitmapMatrixCache.data[4];
    this.mCacheAsBitmapMatrixCache.data[5] = -this.mCacheAsBitmapMatrixCache.data[5];

    this.mBakeInvertedMatrix = this.gameObject.worldTransformationInverted.clone();
    //this.mCacheTexture.__dumpToDocument();
  }
}
