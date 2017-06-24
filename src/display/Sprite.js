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

    if (texture !== null && texture.constructor === String) {
      this.mTexture = AssetManager.default.getTexture(/** @type {string} */ (texture));
    } else {
      this.mTexture = /** @type {Texture} */ (texture);
    }
    
    this.PluginName = WebGLTexPlugin.name;
    this.vertexData = [];
    this.tint = 0xffffff;
  }

  /**
   * @override
   * @private
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   *
   * @return {void}
   */
  __render(video, time, parentAlpha) {
    if (this.mAlpha <= 0 || this.mVisible === false) return;

    this.worldAlpha = parentAlpha * this.mAlpha;

    if (this.mTexture !== null) {
      // video.setMaterial(this.material);
      // video.setTransform(this.worldTransformation);
      // video.globalAlpha = parentAlpha * this.mAlpha;
      // video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;
      // video.drawImage(this.mTexture);
      
      video.drawImage(this);
    }

    super.__render(video, time, this.worldAlpha);
  }

  refreshVertexData() {
    const vertexData = this.vertexData;
    const transform = this.worldTransformation.value;
    const a = transform[0];
    const b = transform[1];
    const c = transform[2];
    const d = transform[3];
    const tx = transform[4];
    const ty = transform[5];
    const texture = this.mTexture;
    const region = texture.mRegion;
    const w = region.width;
    const h = region.height;

    if (texture.mTrimmed) {
      const untrimmedRegion = texture.untrimmedRect;
      const l = untrimmedRegion.x;
      const t = untrimmedRegion.y;
      const r = l + w;
      const b = t + h;

      // left top
      vertexData[0] = a * l + c * t + tx;
      vertexData[1] = d * t + b * l + ty;

      // right top
      vertexData[2] = a * r + c * t + tx;
      vertexData[3] = d * t + b * r + ty;

      // left bottom
      vertexData[4] = a * l + c * b + tx;
      vertexData[5] = d * b + b * l + ty;

      // right bottom
      vertexData[6] = a * r + c * b + tx;
      vertexData[7] = d * b + b * r + ty;
    } else {

      // left top
      vertexData[0] = tx;
      vertexData[1] = ty;

      // right top
      vertexData[2] = a * w + tx;
      vertexData[3] = b * w + ty;

      // left bottom
      vertexData[4] = c * h + tx;
      vertexData[5] = d * h + ty;

      // right bottom
      vertexData[6] = a * w + c * h + tx;
      vertexData[7] = d * h + b * w + ty;
    }
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

    return outRect.set(0, 0, this.mTexture.untrimmedRect.width, this.mTexture.untrimmedRect.height);
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
    this.refreshTexCoord();
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
