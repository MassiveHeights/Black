/**
 * A render unit. Base class for all renderables.
 *
 * @cat drivers
 */
/* @echo EXPORT */
class Renderer {
  /**
   * Creates new instance of Renderer.
   */
  constructor() {
    /**
     * A texture to render onto screen.
     * @type {Texture|null}
     */
    this.texture = null;

    /**
     * The world alpha.
     * @type {number}
     */
    this.alpha = 1;

    /**
     * The world blend mode.
     * @type {BlendMode}
     */
    this.blendMode = BlendMode.AUTO;

    /**
     * World transformation.
     * @type {Matrix}
     */
    this.transform = null;

    /**
     * Indicates visibility of this renderable.
     * @type {boolean}
     */
    this.visible = true;

    /**
     * X-coordinate of the object's origin in its local space.
     * @type {number}
     */
    this.pivotX = 0;

    /**
     * Y-coordinate of the object's origin in its local space.
     * @type {number}
     */
    this.pivotY = 0;

    /**
     * Dirty flag.
     * @type {DirtyFlag<number>}
     */
    this.dirty = DirtyFlag.DIRTY;

    /**
     * Indicates whenever driver should skip rendering of this object.
     * @type {boolean}
     */
    this.skip = false;

    /**
     * Optional clipping area.
     * @type {Rectangle}
     */
    this.clipRect = null;

    /**
     * Round `x` and `y` values to `int`.
     * @type {boolean}
     */
    this.snapToPixels = false;

    /** @ignore @type {number} */
    this.endPassRequiredAt = -1;

    /** @ignore @type {boolean} */
    this.endPassRequired = false;

    /** @ignore @type {boolean} */
    this.skipChildren = false;

    // this.filters = null;
  }

  /**
   * Called when this renderer needs to be rendered.
   *
   * @param {VideoNullDriver} driver Active video driver.
   * @returns {void}
   */
  render(driver) { }

  // renderFilters() {
  // }

  /**
   * Returns true if renderer has something to render.
   * @returns {boolean} Returns true if renderer has something to render otherwise false.
   */
  get hasVisibleArea() {
    return this.alpha > 0 && this.visible === true && (this.clipRect !== null ? this.clipRect.isEmpty === false : true);
  }

  /**
   * Returns true if this renderer can be rendered.
   *
   * @returns {boolean} True if can be rendered otherwise false.
   */
  get isRenderable() {
    return this.texture !== null;
  }

  /**
   * Returns current transformation. Useful when you need to return custom transformation.
   *
   * @returns {Matrix} Current transformation.
   */
  getTransform() {
    return this.transform;
  }

  /**
   * Returns world alpha.
   * @returns {number} Current world alpha.
   */
  getAlpha() {
    return this.alpha;
  }

  /**
   * Returns world blend mode.
   * @returns {BlendMode} Current world blend mode.
   */
  getBlendMode() {
    return this.blendMode;
  }
}