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

    /**
     * Dirty flag.
     * @type {DirtyFlag}
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

    /** @ignore @type {number} */
    this.endPassRequiredAt = -1;

    /** @ignore @type {boolean} */
    this.endPassRequired = false;

    /** @ignore @type {boolean} */
    this.skipChildren = false;
  }

  /**
   * Called when this renderer needs to be rendered.
   *
   * @param {VideoNullDriver} driver Active video driver.
   * @returns {void}
   */
  render(driver) { }


  /**
   * Returns true if renderer has something to render.
   * @returns {boolean} Returns true if renderer has something to render otherwise false.
   */
  get hasVisibleArea() {
    return this.gameObject.mAlpha > 0 && this.gameObject.mVisible === true && (this.gameObject.mClipRect !== null ? this.gameObject.mClipRect.isEmpty === false : true);
  }

  /**
   * Returns true if this renderer can be rendered.
   *
   * @returns {boolean} True if can be rendered otherwise false.
   */
  get isRenderable() {
    return this.gameObject.mTexture !== null;
  }

  /**
   * @returns {Texture|null}
   */
  getTexture() {
    return null;
  }

  /**
   * Returns current transformation. Useful when you need to return custom transformation.
   *
   * @returns {Matrix} Current transformation.
   */
  getTransform() {
    return this.gameObject.worldTransformation;
  }

  /**
   * Returns world alpha.
   * @returns {number} Current world alpha.
   */
  getAlpha() {
    if (this.gameObject !== null)
      return this.gameObject.mAlpha;

    return 1;
  }

  /**
   * Returns world blend mode.
   * @returns {BlendMode} Current world blend mode.
   */
  getBlendMode() {
    if (this.gameObject !== null)
      return this.gameObject.mBlendMode === BlendMode.AUTO ? this.parent.getBlendMode() : this.gameObject.mBlendMode;

    return BlendMode.NORMAL;
  }

  /**
   * Returns GameObject's tinting color.
   * @returns {number|null}
   */
  getColor() {
    if (this.gameObject !== null)
      return this.gameObject.mColor === null ? this.parent.getColor() : this.gameObject.mColor;

    return null;
  }

  /**
   * Returns GameObject's pivotX.
   * @returns {number}
   */
  getPivotX() {
    return this.gameObject.mPivotX;
  }

  /**
   * Returns GameObject's pivotY.
   * @returns {number}
   */
  getPivotY() {
    return this.gameObject.mPivotY;
  }

  /**
   * Returns GameObject's clipping rect or null.
   * @returns {Rectangle|null}
   */
  getClipRect() {
    return this.gameObject.mClipRect;
  }

  /**
   * Returns GameObject's snapToPixels property value.
   * @returns {boolean}
   */
  getSnapToPixels() {
    return this.gameObject.snapToPixels;
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