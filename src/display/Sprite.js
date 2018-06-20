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

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      outRect.x += this.mPivotX;
      outRect.y += this.mPivotY;
    } else {
      outRect.set(0, 0, this.mTexture.displayWidth, this.mTexture.displayHeight);
    }

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
}
