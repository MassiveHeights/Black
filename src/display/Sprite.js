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

    /**
     * @private
     * @type {Texture|null} */
    this.mTexture = null;

    /**
     * @private
     * @type {string|null} */
    this.mTextureName = null;

    if (texture !== null && texture.constructor === String) {
      this.mTextureName = /** @type {string} */ (texture);
      this.mTexture = AssetManager.default.getTexture(/** @type {string} */(texture));
    } else {
      this.mTexture = /** @type {Texture} */ (texture);
    }
  }

  getRenderer() {
    return Black.instance.video.getRenderer('Sprite');
  }

  onRender(driver, parentRenderer, isBackBufferActive) {
    let renderer = this.mRenderer;

    renderer.name = this.name
    if (this.mBaked === true && isBackBufferActive === true) {
      renderer.alpha = 1; // alpha of the render texture????

      let bounds = this.getBounds(this, true);
      let t = this.finalTransformation.clone();
      let m = new Matrix(1, 0, 0, 1, bounds.x, bounds.y);
      m.prepend(t);
      renderer.transform = m;
      renderer.skipChildren = true;
      renderer.texture = this.mCache;

      return driver.registerRenderer(renderer);
    }

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.skipChildren = false;
      renderer.transform = this.finalTransformation;
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

  get baked() {
    return this.mBaked;
  }

  set baked(value) {
    if (value === this.mBaked)
      return;

    if (value === true && this.mCache === null) {
      let bounds = this.getBounds(this, true);
      this.mCachedBounds = bounds;

      let m = new Matrix();
      this.finalTransformation.copyTo(m);
      m.invert();

      m.data[4] -= bounds.x;
      m.data[5] -= bounds.y;

      this.mCache = new RenderTexture(bounds.width, bounds.height);
      Black.driver.render(this, this.mCache, m);
    } else if (value === false && this.mCache !== null) {
      // leave it for GC
      this.mCache = null;
    }

    this.mBaked = value;
  }

  /**
   * onGetLocalBounds - Returns a rectangle that completely encloses the object in local coordinate system.
   *
   * @override
   * @protected
   * @param {Rectangle=} outRect Description
   *
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
      outRect.set(0, 0, this.mTexture.renderWidth, this.mTexture.renderHeight);
    }

    return outRect;
  }

  /**
   * texture - Returns the current Texture on this sprite.
   *
   * @return {Texture|null} The current texture set on this Sprite or null.
   */
  get texture() {
    return this.mTexture;
  }

  /**
   * texture - Sets the Texture on this sprite by name.
   * Only AssetManager.default is used.
   *
   * @param {Texture|null} texture Texture to apply on.
   *
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture === texture)
      return;

    this.mTexture = texture;
    this.setRenderDirty();
  }

  get textureName() {
    return this.mTextureName;
  }

  /**
   * @editor {TextureEditor}
   */
  set textureName(value) {
    if (this.mTextureName === value)
      return;

    this.mTextureName = value;
    this.texture = AssetManager.default.getTexture(value);
  }
}
