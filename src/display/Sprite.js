/**
 * Sprite is used to render Texture onto screen.
 *
 * @cat display
 * @extends DisplayObject
 */
/* @echo EXPORT */
class Sprite extends DisplayObject {

  /**
   * constructor - Creates a new Sprite object instance.
   *
   * @param {Texture|string|null} texture The Texture instance or null.
   */
  constructor(texture = null) {
    super();

    /**
     * @private
     * @type {Texture|null} */
    this.mTexture = null;

    if (texture !== null && texture.constructor === String)
      this.mTexture = AssetManager.default.getTexture(/** @type {string} */ (texture));
    else
      this.mTexture = /** @type {Texture} */ (texture);

    this.mTint = 0xffffff;

    this.material = {
      Program: WebGLSpritesProgramInfo
    }
  }

  get tint() {
    return this.mTint;
  }
  
  set tint(value) {
    this.mTint = value;
  }

  /**
   * @override
   * @private
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    if (this.mAlpha <= 0 || this.mVisible === false)
      return;

    let tmpBlendMode = BlendMode.AUTO;

    if (this.mTexture !== null) {
      video.save(this);
      video.setTransform(this.worldTransformation);
      video.globalAlpha = parentAlpha * this.mAlpha;
      video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;
      video.tint = this.mTint;
      video.drawImage(this.mTexture, this.onGetLocalBounds(Rectangle.__cache));
      video.restore();
    }

    super.__render(video, time, parentAlpha * this.mAlpha, tmpBlendMode);
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

    return outRect.set(-this.mPivotX, -this.mPivotY, this.mTexture.untrimmedRect.width, this.mTexture.untrimmedRect.height);
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
   * texture - Sets the Texture on this sprite.
   *
   * @param {Texture|null} texture Texture to apply on.
   *
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture === texture)
      return;

    this.mTexture = texture;
  }

  set touchable(value) {
    let c = this.getComponent(InputComponent);

    if (value === true) {
      if (c === null)
        this.addComponent(new InputComponent());
      else
        c.touchable = true;
    } else {
      if (c !== null)
        this.removeComponent(c);
    }
  }

  get touchable() {
    let c = this.getComponent(InputComponent);
    return c !== null && c.touchable === true;
  }
}
