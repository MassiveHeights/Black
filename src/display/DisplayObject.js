/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends GameObject
 */
/* @echo EXPORT */
class DisplayObject extends GameObject {
  constructor() {
    super();

    /** @protected @type {number} */
    this.mAlpha = 1;

    /** @protected @type {BlendMode} */
    this.mBlendMode = BlendMode.AUTO;

    /** @protected @type {boolean} */
    this.mVisible = true;

    /** @protected @type {Rectangle} */
    this.mClipRect = null;

    /** @protected @type {Renderer|null} */
    this.mRenderer = this.getRenderer();

    /** @private @type {boolean} */
    this.mCacheAsBitmap = false;

    /** @private @type {boolean} */
    this.mCacheAsBitmapDirty = true;

    /** @private @type {Matrix|null} */
    this.mCacheAsBitmapMatrixCache = null;

    /** @private @type {CanvasRenderTexture|null} */
    this.mCache = null;

    /** @private @type {Rectangle|null} */
    this.mCacheBounds = null;

    /** @protected @type {?number} */
    this.mColor = null;
  }

  /**
   * Factory method returns concrete renderer for this Game Object.
   * 
   * @returns {Renderer}
   */
  getRenderer() {
    return Black.driver.getRenderer('DisplayObject');
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);

      outRect.x += this.mPivotX;
      outRect.y += this.mPivotY;
      return outRect;
    }

    return outRect.set(0, 0, 0, 0);
  }

  /**
   * @inheritDoc
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    this.onGetLocalBounds(outRect);

    if (space == null)
      space = this.mParent;

    if (space == this) {
      // local
    } else if (space == this.mParent) {
      if (includeChildren === false || this.mClipRect !== null) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(outRect, outRect);
        Matrix.pool.release(matrix);
      }
      else if (includeChildren === true && this.mDirty & DirtyFlag.BOUNDS) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(outRect, outRect);
        Matrix.pool.release(matrix);
      } else {
        // Return cached
        outRect.copyFrom(this.mBoundsCache);
        return outRect;
      }
    } else {
      let matrix = Matrix.pool.get();
      matrix.copyFrom(this.worldTransformation);
      matrix.prepend(space.worldTransformationInversed);
      matrix.transformRect(outRect, outRect);
      Matrix.pool.release(matrix);
    }

    if (this.mClipRect !== null)
      return outRect;

    if (includeChildren === true) {
      let childBounds = Rectangle.pool.get();

      for (let i = 0; i < this.mChildren.length; i++) {
        childBounds.zero();

        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        outRect.union(childBounds);
      }

      Rectangle.pool.release(childBounds);

      if (space == this.mParent && this.mDirty & DirtyFlag.BOUNDS) {
        this.mBoundsCache.copyFrom(outRect);
        this.mDirty ^= DirtyFlag.BOUNDS;
      }
    }

    return outRect;
  }

  /**
  * @inheritDoc
  */
  onRender(driver, parentRenderer, isBackBufferActive = false) {
    let renderer = this.mRenderer;

    if (this.mCacheAsBitmap === true && isBackBufferActive === true) {
      let isStatic = this.checkStatic(true);
      if (isStatic === true && this.mCacheAsBitmapDirty === true) {
        this.setTransformDirty();
        this.__refreshBitmapCache();
        this.mCacheAsBitmapDirty = false;
      } else if (isStatic === false) {
        this.mCacheAsBitmapDirty = true;
        this.mDirty |= DirtyFlag.RENDER;
      }
    }

    if (this.mCacheAsBitmap === true && isBackBufferActive === true && this.mCacheAsBitmapDirty === false) {
      renderer.transform = this.mCacheAsBitmapMatrixCache;
      renderer.skipChildren = true;
      renderer.alpha = 1;
      renderer.blendMode = BlendMode.NORMAL;
      renderer.snapToPixels = this.mSnapToPixels;
      renderer.clipRect = null;
      renderer.texture = this.mCache;
    } else if (this.mDirty & DirtyFlag.RENDER) {
      renderer.skipChildren = false;
      renderer.transform = this.worldTransformation;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.visible = this.mVisible;
      renderer.clipRect = this.mClipRect;
      renderer.dirty = this.mDirty;
      renderer.snapToPixels = this.mSnapToPixels;
      renderer.texture = null;
      renderer.color = this.mColor === null ? parentRenderer.color : this.mColor;

      this.mCacheAsBitmapDirty = true;
      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
  }

  /**
   * @inheritDoc
   */
  hitTest(localPoint) {
    let c = this.getComponent(InputComponent);
    let touchable = c !== null && c.touchable;
    let insideMask = this.onHitTestMask(localPoint);

    if (this.visible === false || touchable === false || insideMask === false)
      return null;

    let target = null;
    let numChildren = this.mChildren.length;

    for (let i = numChildren - 1; i >= 0; --i) {
      let child = this.mChildren[i];

      target = child.hitTest(localPoint);

      if (target !== null)
        return target;
    }

    if (this.onHitTest(localPoint) === true)
      return this;

    return null;
  }

  /**
  * @inheritDoc
  */
  onHitTestMask(localPoint) {
    if (this.mClipRect === null)
      return true;

    let tmpVector = Vector.pool.get();
    this.worldTransformationInversed.transformVector(localPoint, tmpVector);

    let contains = this.mClipRect.containsXY(tmpVector.x - this.mPivotX, tmpVector.y - this.mPivotY);
    Vector.pool.release(tmpVector);

    return contains;
  }

  __refreshBitmapCache() {
    const bounds = this.getBounds(this.stage, true);
    const sf = Black.stage.scaleFactor;
    const fs = Black.driver.finalScale;

    let m = Matrix.pool.get().set(1, 0, 0, 1, ~~(-bounds.x * sf - this.stage.mX), ~~(-bounds.y * sf - this.stage.mY));

    if (this.mClipRect !== null && this.mClipRect.isEmpty === false) {
      m.data[4] += this.pivotX * sf;
      m.data[5] += this.pivotY * sf;
    }

    if (this.mCacheBounds === null)
      this.mCacheBounds = new Rectangle();

    bounds.copyTo(this.mCacheBounds);
    bounds.width *= fs;
    bounds.height *= fs;

    if (this.mCache === null)
      this.mCache = new CanvasRenderTexture(bounds.width, bounds.height, 1);
    else
      this.mCache.resize(bounds.width, bounds.height, 1);

    Black.driver.render(this, this.mCache, m);
    Matrix.pool.release(m);

    if (this.mCacheAsBitmapMatrixCache === null)
      this.mCacheAsBitmapMatrixCache = new Matrix();

    this.mCacheAsBitmapMatrixCache.copyFrom(m);
    this.mCacheAsBitmapMatrixCache.scale(1 / Black.driver.renderScaleFactor, 1 / Black.driver.renderScaleFactor);
    this.mCacheAsBitmapMatrixCache.data[4] = -this.mCacheAsBitmapMatrixCache.data[4];
    this.mCacheAsBitmapMatrixCache.data[5] = -this.mCacheAsBitmapMatrixCache.data[5];

    //this.mCache.__dumpToDocument();
  }

  /**
   * Gets/Sets tinting color of the object. Pass `null` to disable tinting. Tinting color will be applied to all children
   * objects. You can override tint color for children by setting custom value or `null` to inherit color from parent.
   * @returns {?number}
   */
  get color() {
    return this.mColor;
  }

  /**
   * @ignore
   * @param {?number} value
   * @return {void}
   */
  set color(value) {
    if (this.mColor === value)
      return;

    this.mColor = value;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets whether this container and all it's childen should be baked into bitmap. Setting `cacheAsBitmap` onto
   * Sprites,, TextField's or any other inhireted classes will give zero effect.
   *
   * @return {boolean} 
   */
  get cacheAsBitmap() {
    return this.mCacheAsBitmap;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set cacheAsBitmap(value) {
    if (value === this.mCacheAsBitmap)
      return;

    this.mCacheAsBitmap = value;

    if (value === false) {
      this.mCache = null;
      this.mCacheAsBitmapDirty = true;
      this.mCacheAsBitmapMatrixCache = null;
      this.mCacheBounds = null;

      this.setTransformDirty();
    }
  }

  /**
   * Gets/Sets the opacity of the object.
   * Baked objects may change behaviour.
   *
   * @return {number}
   */
  get alpha() {
    return this.mAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set alpha(value) {
    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    if (this.mAlpha === MathEx.clamp(value, 0, 1))
      return;

    this.mAlpha = MathEx.clamp(value, 0, 1);
    this.setRenderDirty();
  }

  /**
   * Gets/Sets visibility of the object.
   *
   * @return {boolean}
   */
  get visible() {
    return this.mVisible;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set visible(value) {
    if (this.mVisible === value)
      return;

    this.mVisible = value;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets blend mode for the object.
   *
   * @return {BlendMode}
   */
  get blendMode() {
    return this.mBlendMode;
  }

  /**
   * @ignore
   * @param {BlendMode} value
   * @return {void}
   */
  set blendMode(value) {
    if (this.mBlendMode === value)
      return;

    this.mBlendMode = value;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets clipping area for the object.
   *
   * @return {Rectangle}
   */
  get clipRect() {
    return this.mClipRect;
  }

  /**
   * @ignore
   * @param {Rectangle} value
   * @return {void}
   */
  set clipRect(value) {
    this.mClipRect = value;
    this.setRenderDirty();
  }
}