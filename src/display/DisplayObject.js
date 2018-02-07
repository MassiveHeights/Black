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

    /** @protected @type {BlendMode<string>} */
    this.mBlendMode = BlendMode.AUTO;

    /** @protected @type {boolean} */
    this.mVisible = true;

    /** @protected @type {Rectangle} */
    this.mClipRect = null;

    /** @protected @type {Renderer|null} */
    this.mRenderer = this.getRenderer();
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

    let childBounds = new Rectangle();

    if (includeChildren === true) {
      for (let i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        outRect.expand(childBounds.x, childBounds.y, childBounds.width, childBounds.height);
      }

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

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.worldTransformation;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.visible = this.mVisible;
      renderer.dirty = this.mDirty;
      renderer.clipRect = this.mClipRect;
      renderer.snapToPixels = this.mSnapToPixels;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
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
   * @return {BlendMode<string>}
   */
  get blendMode() {
    return this.mBlendMode;
  }

  /**
   * @ignore
   * @param {BlendMode<string>} value
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
    if (this.mClipRect === value)
      return;

    this.mClipRect = value;
    this.setRenderDirty();
  }
}