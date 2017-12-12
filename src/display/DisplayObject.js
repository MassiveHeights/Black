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

    /**
     * @private
     * @type {number}
     */
    this.mAlpha = 1;

    /**
     * @public
     * @type {string}
     */
    this.mBlendMode = BlendMode.AUTO;

    /**
     * @private
     * @type {boolean}
     */
    this.mVisible = true;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mClipRect = null;

    /**
     * @private
     * @type {Renderer|null} */
    this.mRenderer = this.getRenderer();
  }

  getRenderer() {
    return Black.instance.video.getRenderer('DisplayObject');
  }

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

  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    let matrix = Matrix.get();
    matrix.copyFrom(this.worldTransformation);

    if (space == null)
      space = this.mParent;

    if (space != null)
      matrix.prepend(space.worldTransformationInversed);

    this.onGetLocalBounds(outRect);

    matrix.transformRect(outRect, outRect);
    Matrix.free(matrix); // recycle

    if (this.mClipRect !== null)
      return outRect;

    let childBounds = new Rectangle();

    if (includeChildren) {
      for (let i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        
        outRect.expand(childBounds.x, childBounds.y, childBounds.width, childBounds.height);
      }
    }

    return outRect;
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.finalTransformation;
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

  onHitTestMask(point) {
    if (this.mClipRect === null)
      return true;

    let tmpVector = new Vector();
    this.worldTransformationInversed.transformVector(point, tmpVector);

    return this.mClipRect.containsXY(tmpVector.x - this.mPivotX, tmpVector.y - this.mPivotY);
  }

  /**
   * Gets/Sets the opacity of the object.
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

  get blendMode() {
    return this.mBlendMode;
  }

  set blendMode(value) {
    if (this.mBlendMode === value)
      return;

    this.mBlendMode = value;
    this.setRenderDirty();
  }

  get clipRect() {
    return this.mClipRect;
  }

  set clipRect(value) {
    if (this.mClipRect === value)
      return;

    this.mClipRect = value;
    this.setRenderDirty();
  }
}
