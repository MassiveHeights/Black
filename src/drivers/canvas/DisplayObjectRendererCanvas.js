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

    this.mTransform = null;
  }

  preRender(driver, isBackBufferActive) {
    if (this.gameObject.mCacheAsBitmap === true && isBackBufferActive === true) {
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

    if (this.gameObject.mCacheAsBitmap === true && isBackBufferActive === true && this.mCacheAsBitmapDirty === false) {
      this.mTransform = this.mCacheAsBitmapMatrixCache;
      this.skipChildren = true;
    }
    else {
      this.mTransform = this.gameObject.worldTransformation;
      this.skipChildren = false;
    }
  }

  getTransform() {
    return this.mTransform;
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

    if (this.getClipRect() !== null && this.getClipRect().isEmpty === false) {
      m.data[4] += this.pivotX * sf;
      m.data[5] += this.pivotY * sf;
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
