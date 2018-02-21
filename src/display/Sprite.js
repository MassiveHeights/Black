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

    // Cache as bitmap
    /** @private @type {CanvasRenderTexture|null} */
    this.mCache = null;

    /** @private @type {Rectangle|null} */
    this.mCacheBounds = null;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Sprite');
  }

  /**
   * @inheritDoc
   */
  onRender(driver, parentRenderer, isBackBufferActive = false) {
    let renderer = this.mRenderer;

    if (this.mCacheAsBitmap === true && isBackBufferActive === true) {
      const sf = this.stage.scaleFactor;

      const m = new Matrix();
      m.copyFrom(this.worldTransformation);
      m.translate(this.mCacheBounds.x, this.mCacheBounds.y);
      m.scale(sf, sf);

      renderer.transform = m;
      renderer.skipChildren = true;
      renderer.alpha = 1;
      renderer.blendMode = BlendMode.NORMAL;
      renderer.texture = this.mCache;

      return driver.registerRenderer(renderer);
    }

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.skipChildren = false;
      renderer.transform = this.worldTransformation;
      renderer.texture = this.mTexture;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.visible = this.mVisible;
      renderer.dirty = this.mDirty;
      renderer.pivotX = this.mPivotX;
      renderer.pivotY = this.mPivotY;
      renderer.clipRect = this.mClipRect;
      renderer.snapToPixels = this.mSnapToPixels;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    return driver.registerRenderer(renderer);
  }

  /**
   * Gets/Sets whether the Sprite and all it's childen should be baked into bitmap.
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

    if (value === true && this.mCache === null) {
      const bounds = this.getBounds(this, true);
      const sf = this.stage.scaleFactor;
      const m = this.worldTransformationInversed; // do we need to clone?
      m.data[4] -= bounds.x;
      m.data[5] -= bounds.y;

      if (this.mCacheBounds === null)
        this.mCacheBounds = new Rectangle();

      bounds.copyTo(this.mCacheBounds);
      bounds.width *= 1 / sf;
      bounds.height *= 1 / sf;

      this.mCache = new CanvasRenderTexture(bounds.width, bounds.height);

      Black.driver.render(this, this.mCache, m);
      this.mCache.__dumpToDocument();
    } else if (value === false) {
      this.mCache = null;
    }

    this.mCacheAsBitmap = value;
    this.setTransformDirty();
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
   * @editor {TextureEditor}
   * @param {?string} value
   */
  set textureName(value) {
    if (this.mTextureName === value)
      return;

    this.mTextureName = value;
    this.texture = AssetManager.default.getTexture(/** @type {string} */(value));
  }
}
