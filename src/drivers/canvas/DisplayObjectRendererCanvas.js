/**
 * Renders `DisplayObject` objects on canvas.
 *
 * @extends Renderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class DisplayObjectRendererCanvas extends Renderer {
  constructor() {
    super();

    /** @private @type {boolean} */
    this.mCacheAsBitmapDirty = true;

    /** @private @type {Matrix|null} */
    this.mCacheAsBitmapMatrixCache = null;

    /** @private @type {CanvasRenderTexture|null} */
    this.mCacheTexture = null;

    /** @private @type {Rectangle|null} */
    this.mCacheBounds = null;
  }

  preRender(driver) {
    super.preRender(driver);

    if (this.gameObject.mCacheAsBitmap === true) {
      let isStatic = this.gameObject.checkStatic(true);
      if (isStatic === true && this.mCacheAsBitmapDirty === true) {
        this.gameObject.setTransformDirty();
        this.__refreshBitmapCache();
        this.mCacheAsBitmapDirty = false;
      } else if (isStatic === false) {
        this.mCacheAsBitmapDirty = true;
        this.gameObject.mDirty |= DirtyFlag.RENDER;
      }
    }

    this.skipChildren = this.gameObject.mCacheAsBitmap === true && this.mCacheAsBitmapDirty === false;
    this.skipSelf = false;
  }

  begin(driver, isBackBufferActive, customTransform = null) {
    if (this.gameObject.mCacheAsBitmap === true && isBackBufferActive === true && this.mCacheAsBitmapDirty === false) {
      this.alpha = 1;
      this.blendMode = BlendMode.NORMAL;
      this.color = null;
    }
    else {
      this.alpha = this.gameObject.mAlpha * this.parent.alpha;
      this.color = this.gameObject.mColor === null ? this.parent.color : this.gameObject.mColor;
      this.blendMode = this.gameObject.mBlendMode === BlendMode.AUTO ? this.parent.blendMode : this.gameObject.mBlendMode;
    }
  }

  upload(driver, isBackBufferActive, customTransform = null) {
    let transform = this.gameObject.worldTransformation;

    if (this.gameObject.mCacheAsBitmap === true && this.mCacheAsBitmapDirty === false)
      transform = this.mCacheAsBitmapMatrixCache;

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

  /**
   * @inheritDoc
   */
  render(driver, isBackBufferActive) {
    if (this.gameObject.mCacheAsBitmap === true && isBackBufferActive === true && this.mCacheAsBitmapDirty === false)
      driver.drawTexture(this.mCacheTexture);
  }

  __refreshBitmapCache() {
    const bounds = this.gameObject.getBounds(Black.stage, true);
    const sf = Black.stage.scaleFactor;
    const fs = Black.driver.finalScale;

    /** @type {Matrix} */
    let m = Matrix.pool.get();
    m.set(1, 0, 0, 1, ~~(-bounds.x * sf - Black.stage.mX), ~~(-bounds.y * sf - Black.stage.mY));

    if (this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false) {
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

    //this.mCacheTexture.__dumpToDocument();
  }
}
