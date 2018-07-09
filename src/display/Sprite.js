/**
 * Sprite is used to render Texture onto screen.
 *
 * @cat display
 * @extends DisplayObject
 */
/* @echo EXPORT */
class Sprite extends DisplayObject {
  /**
   * Creates a new Sprite instance.
   *
   * @param {Texture|string|null} texture The Texture instance or null.
   */
  constructor(texture = null) {
    super();

    /** @private @type {Texture|null} */
    this.mTexture = null;

    /** @private @type {string|null} */
    this.mTextureName = null;

    if (texture !== null && texture.constructor === String) {
      this.mTextureName = /** @type {string} */ (texture);
      this.mTexture = AssetManager.default.getTexture(/** @type {string} */(texture));
    } else {
      this.mTexture = /** @type {Texture} */ (texture);
    }

    /** @private @type {TilingInfo|null} */
    this.mTiling = null;

    /** @private @type {Rectangle|null} */
    this.mSlice9grid = null;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Sprite', this);
  }

  /**
   * Returns a rectangle that completely encloses the object in local coordinate system.
   *
   * @protected
   * @param {Rectangle=} outRect Rectangle to be returned.
   * @return {Rectangle} The new Rectangle or outRect with .
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (!this.mTexture)
      return outRect;

    if (this.mClipRect !== null)
      this.mClipRect.copyTo(outRect);
    else if (this.tiling !== null)
      outRect.set(0, 0, this.tiling.width, this.tiling.height);
    else
      outRect.set(0, 0, this.mTexture.displayWidth, this.mTexture.displayHeight);

    return outRect;
  }

  /**
   * Returns the current Texture on this sprite.
   *
   * @return {Texture|null} The current texture set on this Sprite or null.
   */
  get texture() {
    return this.mTexture;
  }

  /**
   * Sets the Texture on this sprite by name.
   * Only AssetManager.default is used.
   *
   * @param {Texture|null} texture Texture to apply on.
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture === texture)
      return;

    this.mTexture = texture;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setRenderDirty();

  }

  /**
   * Returns the current texture name.
   *
   * @return {?string}
   */
  get textureName() {
    return this.mTextureName;
  }

  /**
   * Sets the current texture by its name
   * 
   * @param {?string} value
   */
  set textureName(value) {
    if (this.mTextureName === value)
      return;

    this.mTextureName = value;
    this.texture = AssetManager.default.getTexture(/** @type {string} */(value));
  }

  /**
   * Gets sets tiling information.
   * 
   * NOTE: after changing one of TilingInfo properties make sure to call `setDirty(DirtyFlag.RENDER_CACHE)`.
   * 
   * @returns {TilingInfo|null}
   */
  get tiling() {
    return this.mTiling;
  }

  /**
   * @ignore
   * @param {TilingInfo|null} value
   */
  set tiling(value) {
    this.mTiling = value;

    this.setRenderDirty();
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Gets/sets nine slice grid rectangle.
   * 
   * NOTE: after changing x, y, width or height of nine slice grid attributes make sure to call `setDirty(DirtyFlag.RENDER_CACHE)` to refresh renderer.
   * 
   * @returns {Rectangle|null}
   */
  get slice9grid() {
    return this.mSlice9grid;
  }

  /**
   * @ignore
   * @param {Rectangle|null} value
   */
  set slice9grid(value) {
    this.mSlice9grid = value;

    this.setRenderDirty();
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }
}