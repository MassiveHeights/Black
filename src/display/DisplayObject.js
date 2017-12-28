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

  onRender(driver, parentRenderer) {
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

  onHitTestMask(localPoint) {
    if (this.mClipRect === null)
      return true;

    let tmpVector = Vector.pool.get();
    this.worldTransformationInversed.transformVector(point, tmpVector);

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

// class List {
//   constructor() {
//     this.mData = [];
//   }

//   add(item) {
//     this.mData.push(item);
//   }

//   remove(item) {
//     var index = this.mData.indexOf(item);
//     if (index > -1)
//       this.mData.splice(index, 1);
//   }

//   get(ix) {
//     return this.mData[ix];
//   }
// }

// class Filter {
//   constructor(name) {
//     this.mName = name;
//   }

//   get name() {
//     return this.mName;
//   }
// }

// class GrayscaleFilter extends Filter {
//   constructor() {
//     super('grayscale');

//     //Black.driver.getFilter('Grayscale');
//   }

//   apply(texture) {

//   }
// }

// class FilterRenderer {

// }

// class FilterStack {
//   constructor() {
//     this.mTextureCache = {};
//   }
// }

// class GrayscaleFilterRenderer extends FilterRenderer {

// }