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
    this.mCacheAsBitmapDynamic = true;

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

    /** @protected @type {boolean} */
    this.mSnapToPixels = false;

    /** @protected @type {DisplayObject|null} */
    this.mMask = null;

    /** @protected @type {boolean} */
    this.mIsMask = false;
  }

  /**
   * Called at the end of the loop, all renderers are already collected and this object and its children will be
   * rendered. Should be used to interpolate between last and current state. 
   * 
   * NOTE: Adding, removing or changing children elements inside onRender method can lead to unexpected behavior.
   * 
   * @protected
   * @return {void}
   */
  onRender() { }

  /**
   * Factory method returns concrete renderer for this Game Object.
   * 
   * @returns {Renderer}
   */
  getRenderer() {
    return Black.driver.getRenderer('DisplayObject', this);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
    }

    return outRect.set(0, 0, 0, 0);
  }

  /**
   * @inheritDoc
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    let localBounds = this.onGetLocalBounds();

    if (space == null)
      space = this.mParent;

    if (space == this) {
      // local
    } else if (space == this.mParent) {
      if (includeChildren === false || this.mClipRect !== null) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(localBounds, outRect);
        Matrix.pool.release(matrix);
      }
      else if (includeChildren === true && this.mDirty & DirtyFlag.BOUNDS) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(localBounds, outRect);
        Matrix.pool.release(matrix);
      } else {
        // Return cached
        outRect.copyFrom(this.mBoundsCache);
        return outRect;
      }
    } else {
      let matrix = Matrix.pool.get();
      matrix.copyFrom(this.worldTransformation);
      matrix.prepend(space.worldTransformationInverted);
      matrix.transformRect(localBounds, outRect);
      Matrix.pool.release(matrix);
    }

    if (space !== this) {
      if (this.mClipRect !== null) {
        outRect.x += this.mPivotX;
        outRect.y += this.mPivotY;
      }
    } else {
      localBounds.copyTo(outRect);
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
  hitTest(localPoint) {
    let c = /** @type {InputComponent}*/ (this.getComponent(InputComponent));
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
    this.worldTransformationInverted.transformVector(localPoint, tmpVector);

    let contains = this.mClipRect.containsXY(tmpVector.x - this.mPivotX, tmpVector.y - this.mPivotY);
    Vector.pool.release(tmpVector);

    return contains;
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
   * Gets/Sets whether this container and all it's children should be baked into bitmap. Setting `cacheAsBitmap` onto
   * Sprites,, TextField's or any other inherited classes will give zero effect.
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
   * Gets/sets whenever cache as bitmap should be automatically refreshed.
   * 
   * @returns {boolean}
   */
  get cacheAsBitmapDynamic() {
    return this.mCacheAsBitmapDynamic;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set cacheAsBitmapDynamic(value) {
    this.mCacheAsBitmapDynamic = value;
  }

  /**
   * Gets/Sets the opacity of the object.
   * Baked objects may change behavior.
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

  /**
   * Gets/sets whenever this object x and y value should be rounded.
   * @returns {boolean}
   */
  get snapToPixels() {
    return this.mSnapToPixels;
  }

  /**
   * @ignore
   * @param {boolean} value
   */
  set snapToPixels(value) {
    this.mSnapToPixels = value;
  }

  /**
   * Gets/sets a display object which will act like a mask for this display object. 
   * Mask should be a part on the stage.
   * @returns {DisplayObject|null}
   */
  get mask() {
    return this.mMask;
  }

  /**
   * @ignore
   * @param {DisplayObject|null}
   */
  set mask(value) {
    if (this.mMask === value)
      return;

    if (this.mMask !== null) 
      this.mMask.mIsMask = false;

    if (value !== null) 
      value.mIsMask = true;

    this.mMask = value;
  }
}