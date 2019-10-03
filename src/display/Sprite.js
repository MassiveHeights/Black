import { DisplayObject } from "./DisplayObject";
import { Texture } from "../textures/Texture";
import { Black } from "../Black";
import { Rectangle } from "../geom/Rectangle";
import { DirtyFlag } from "../core/DirtyFlag";

/**
 * Sprite is used to render Texture onto screen.
 *
 * @cat display
 * @extends black-engine~DisplayObject
 */
export class Sprite extends DisplayObject {
  /**
   * Creates a new Sprite instance.
   *
   * @param {black-engine~Texture|string|null} texture The Texture instance or null.
   */
  constructor(texture = null, useTextureProps = true) {
    super();

    /** 
     * @private 
     * @type {black-engine~Texture|null} 
     */
    this.mTexture = null;

    /** 
     * @private 
     * @type {string|null} 
     */
    this.mTextureName = null;

    /** 
     * @private 
     * @type {black-engine~TilingInfo|null} 
     */
    this.mTiling = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle|null} 
     */
    this.mSlice9grid = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mUseTextureProps = useTextureProps;

    if (texture !== null && texture.constructor === String) {
      this.mTextureName = /** @type {string} */ (texture);
      this.texture = Black.assets.getTexture(/** @type {string} */(texture));
    } else {
      this.texture = /** @type {Texture} */ (texture);
    }
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
   * @param {black-engine~Rectangle=} outRect Rectangle to be returned.
   * @return {black-engine~Rectangle} The new Rectangle or outRect if it was passed as a param.
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
   * @return {black-engine~Texture|null} The current texture set on this Sprite or null.
   */
  get texture() {
    return this.mTexture;
  }

  /**
   * Sets the Texture on this sprite by name.
   * Only Black.assets is used.
   *
   * @param {black-engine~Texture|null} texture Texture to apply on.
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture === texture)
      return;

    if (texture === null) {
      this.mTexture = null;
      this.mTextureName = null;

      this.setDirty(DirtyFlag.RENDER_CACHE, false);
      this.setRenderDirty();
      return;
    }

    this.mTexture = texture;

    if (this.mUseTextureProps === true) {
      if (texture.slice9borders)
        this.slice9grid = texture.slice9borders.clone();

      if (texture.registrationPoint !== null)
        this.alignPivotOffset(texture.registrationPoint.x, texture.registrationPoint.y);
    }

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

    if (value === null) {
      this.texture = null;
      return;
    }

    this.mTextureName = value;
    this.texture = Black.assets.getTexture(/** @type {string} */(value));
  }

  /**
   * Gets sets tiling information.
   *
   * NOTE: after changing one of TilingInfo properties make sure to call `setDirty(DirtyFlag.RENDER_CACHE)`.
   *
   * @returns {black-engine~TilingInfo|null}
   */
  get tiling() {
    return this.mTiling;
  }

  /**
   * @param {black-engine~TilingInfo|null} value
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
   * @returns {black-engine~Rectangle|null}
   */
  get slice9grid() {
    return this.mSlice9grid;
  }

  /**
   * @param {black-engine~Rectangle|null} value
   */
  set slice9grid(value) {
    this.mSlice9grid = value;

    this.setRenderDirty();
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }
}