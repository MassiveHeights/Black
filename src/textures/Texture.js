/**
 * A base texture class.
 *
 * @cat textures
 */
/* @echo EXPORT */
class Texture {
  /**
   * Creates new instance of texture.
   *
   * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} nativeElement The native element to get image data from.
   * @param {Rectangle=} [region=null]                                          The area of texture to be drawn.
   * @param {Rectangle=} [untrimmedRegion=null]                                 The original area of texture.
   * @param {number=} [scale=1]                                                 Inverted scale factor.
   */
  constructor(nativeElement, region = null, untrimmedRegion = null, scale = 1) {
    this.mId = ++Texture.__ID;

    /** @private */
    this.mNative = nativeElement;

    /** @private @type {boolean} */
    this.mValid = false;

    /** @private @type {Rectangle} */
    this.mRegion = new Rectangle();

    /** @private @type {Rectangle} */
    this.mUntrimmedRegion = new Rectangle();

    /** @private @type {number} */
    this.mNativeWidth = 0;

    /** @private @type {number} */
    this.mNativeHeight = 0;

    /** @private @type {number} */
    this.mDisplayWidth = 0;

    /** @private @type {number} */
    this.mDisplayHeight = 0;

    /** @private @type {number} */
    this.mRenderWidth = 0;

    /** @private @type {number} */
    this.mRenderHeight = 0;

    /** @private @type {number} */
    this.mScale = scale;

    this.set(nativeElement, region, untrimmedRegion, scale);
  }

  /**
   * Updates this texture with new native element.
   *
   * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} nativeElement The native element to get image data from.
   * @param {Rectangle=} [region=null]                                          The area of texture to be drawn.
   * @param {Rectangle=} [untrimmedRegion=null]                                 The original area of texture.
   * @param {number=} [scale=1]                                                 Inverted scale factor.
   */
  set(nativeElement, region = null, untrimmedRegion = null, scale = 1) {
    Debug.assert(nativeElement != null, 'nativeElement cannot be null');
    Debug.assert(!isNaN(scale), 'scale cannot be NaN');

    this.mScale = scale;
    this.mNative = nativeElement;

    this.mNativeWidth = nativeElement.naturalWidth || nativeElement.videoWidth || nativeElement.width;
    this.mNativeHeight = nativeElement.naturalHeight || nativeElement.videoHeight || nativeElement.height;

    this.mRegion = region || this.mRegion.set(0, 0, this.mNativeWidth, this.mNativeHeight);
    this.mUntrimmedRegion = untrimmedRegion || this.mUntrimmedRegion.set(0, 0, this.mRegion.width, this.mRegion.height);

    this.mDisplayWidth = Math.ceil(this.mUntrimmedRegion.width * this.mScale);
    this.mDisplayHeight = Math.ceil(this.mUntrimmedRegion.height * this.mScale);

    this.mRenderWidth = Math.ceil(this.mRegion.width * this.mScale);
    this.mRenderHeight = Math.ceil(this.mRegion.height * this.mScale);

    this.mValid = nativeElement != null && this.mDisplayWidth > 0 && this.mDisplayHeight > 0;
  }

  /**
   * @ignore
   * @param {string} name
   * @returns {number}
   */
  static getScaleFactorFromName(name) {
    let ixStart = name.indexOf('@');
    if (ixStart === -1)
      return 1;

    let ixEnd = name.indexOf('x', ixStart);
    return parseFloat(name.substring(ixStart + 1, ixEnd));
  }

  /**
   * @ignore
   * @param {string} name
   * @returns {string}
   */
  static removeScaleFactorFromName(name) {
    let ixStart = name.indexOf('@');
    if (ixStart === -1)
      return name;

    let ixEnd = name.indexOf('x', ixStart);
    return name.substring(0, ixStart) + name.substring(ixEnd + 1);
  }

  /**
   * Creates new texture from Base64 string.
   *
   * @param {string} string Base64 string.
   * @returns {Texture}
   */
  static fromBase64String(string) {
    let imgElement = new Image();
    imgElement.src = string;
    return new Texture(imgElement);
  }

  /**
   * @ignore
   * @param {Element} canvas
   * @param {string} type
   * @param {number} quality
   * @returns {Texture}
   */
  static fromCanvasAsImage(canvas, type = 'image/png', quality = 1) {
    let imgElement = new Image();
    imgElement.src = canvas.toDataURL(type, quality);

    return new Texture(imgElement);
  }

  /**
   * @ignore
   * @param {Element} canvas
   * @returns {Texture|null}
   */
  static fromCanvas(canvas) {
    return Black.driver.getTextureFromCanvas(canvas);
  }

  /**
   * Original width of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get width() {
    return this.mDisplayWidth;
  }

  /**
   * Original height of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get height() {
    return this.mDisplayHeight;
  }

  /**
   * Texture scale.
   *
   * @readonly
   * @returns {number}
   */
  get scale() {
    return this.mScale;
  }

  /**
   * The area of the texture to be drawn.
   *
   * @readonly
   * @returns {Rectangle}
   */
  get region() {
    return this.mRegion;
  }

  /**
   * The original area of the texture.
   *
   * @readonly
   * @returns {Rectangle}
   */
  get untrimmedRegion() {
    return this.mUntrimmedRegion;
  }

  /**
   * Original width of the texture.
   *
   * @readonly
   * @returns {number}
   */
  get nativeWidth() {
    return this.mNativeWidth;
  }

  /**
   * Original height of the texture.
   *
   * @readonly
   * @returns {number}
   */
  get nativeHeight() {
    return this.mNativeHeight;
  }

  /**
   * The same as Texture.width
   *
   * @readonly
   * @returns {number}
   */
  get displayWidth() {
    return this.mDisplayWidth;
  }

  /**
   * The same as Texture.height
   *
   * @readonly
   * @returns {number}
   */
  get displayHeight() {
    return this.mDisplayHeight;
  }

  /**
   * Renderable width of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get renderWidth() {
    return this.mRenderWidth;
  }

  /**
   * Renderable height of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get renderHeight() {
    return this.mRenderHeight;
  }

  /**
   * Determines if the texture can be drawn.
   *
   * @readonly
   * @returns {boolean}
   */
  get isValid() {
    return this.mValid;
  }

  /**
   * Native HTML element.
   *
   * @readonly
   * @returns {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement}
   */
  get native() {
    return this.mNative;
  }
}

/**
 * @private
 * @type {number}
 * @nocollapse
 */
Texture.__ID = 0;

/**
 * @private
 * @type {HTMLImageElement|null}
 * @nocollapse
 */
Texture.MISSING_IMAGE_CACHE = null;

/**
 * @private
 * @type {number}
 * @nocollapse
 */
Texture.MAX_SIZE = 2048;