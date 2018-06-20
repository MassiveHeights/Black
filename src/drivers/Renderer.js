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
    /** @type {GameObject|null} */
    this.gameObject = null;

    /** @type {Renderer|null} */
    this.parent = null;

    /** @ignore @type {boolean} */
    this.skipChildren = false;
    this.skipSelf = false;

    this.endPassRequiredAt = -1;
    this.endPassRequired = false;

    this.alpha = 1;
    this.blendMode = BlendMode.NORMAL;
    this.color = null;
  }

  /**
   * Called when this renderer needs to be rendered.
   *
   * @param {VideoNullDriver} driver Active video driver.
   * @param {boolean} isBackBufferActive
   * @returns {void}
   */
  preRender(driver, isBackBufferActive) {
    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;
  }

  begin(driver, isBackBufferActive, customTransform = null) {
    this.alpha = this.gameObject.mAlpha * this.parent.alpha;
    this.color = this.gameObject.mColor === null ? this.parent.color : this.gameObject.mColor;
    this.blendMode = this.gameObject.mBlendMode === BlendMode.AUTO ? this.parent.blendMode : this.gameObject.mBlendMode;
  }

  upload(driver, isBackBufferActive, customTransform = null) {
    let transform = this.gameObject.worldTransformation;

    if (isBackBufferActive === false) {
      if (customTransform === null) {
        transform = transform.clone(); // TODO: too much allocations
        transform.data[4] -= Black.stage.mX;
        transform.data[5] -= Black.stage.mY;
      } else {
        transform = transform.clone(); // TODO: too much allocations
        transform.prepend(customTransform);
      }
    }

    driver.setTransform(transform);
    driver.setGlobalAlpha(this.alpha);
    driver.setGlobalBlendMode(this.blendMode);

    if (this.endPassRequired === true)
      driver.beginClip(this.gameObject.mClipRect, this.gameObject.mPivotX, this.gameObject.mPivotY);
  }

  /**
   * Called when this renderer needs to be rendered.
   *
   * @param {VideoNullDriver} driver Active video driver.
   * @param {boolean} isBackBufferActive
   * @param {Matrix|null} customTransform
   * @returns {void}
   */
  render(driver, isBackBufferActive, customTransform = null) {
  }

  end(driver) {
    driver.endClip();

    this.endPassRequiredAt = -1;
    this.endPassRequired = false;
  }

  /**
   * Tints given texture with a given color.
   * 
   * @param {Texture} texture 
   * @param {number|null} color 
   * @returns {Texture}
   */
  static getColoredTexture(texture, color) {
    if (color === 0xFFFFFF || color === null)
      return texture;

    let colorString = color.toString();
    if (Renderer.__colorCache.has(texture.id, colorString))
      return /** @type {Texture}*/ (Renderer.__colorCache.get(texture.id, colorString));

    let region = texture.region;
    let w = region.width;
    let h = region.height;

    let rt = new RenderTargetCanvas(w, h);
    let ctx = rt.context;

    ctx.fillStyle = ColorHelper.hexColorToString(color);
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(texture.native, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);

    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(texture.native, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);

    let t = new Texture(rt.native, null, texture.untrimmedRegion.clone(), texture.scale);
    Renderer.__colorCache.set(texture.id, colorString, t);

    return t;
  }
}

/**
 * @ignore
 * @private
 * @static
 */
Renderer.__colorCache = new MapMap();

/**
 * Used to optimize battery-life on static scenes.
 * @private
 * @type {boolean}
 * @nocollapse
 */
Renderer.__dirty = true;

/**
 * Indicates whenever engine should render the stage if nothing were changed in this frame. Default is false.
 */
Renderer.skipUnchangedFrames = false;