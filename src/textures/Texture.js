/**
 * @cat textures
 * @extends Scatter
 */
/* @echo EXPORT */
class Texture {
  constructor(nativeElement, region, untrimmedRegion, scale = 1) {
    this.mId = ++Texture.__ID;

    this.mNative = nativeElement;
    this.mValid = false;

    this.mRegion = new Rectangle();
    this.mUntrimmedRegion = new Rectangle();

    this.mNativeWidth = 0;
    this.mNativeHeight = 0;

    this.mDisplayWidth = 0;
    this.mDisplayHeight = 0;

    this.mRenderWidth = 0;
    this.mRenderHeight = 0;

    this.mScale = scale;

    this.set(nativeElement, region, untrimmedRegion, scale);
  }

  set(nativeElement, region, untrimmedRegion, scale = 1) {
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

  static getScaleFactorFromName(name) {
    let ixStart = name.indexOf('@');
    if (ixStart === -1)
      return 1;

    let ixEnd = name.indexOf('x', ixStart);
    return parseFloat(name.substring(ixStart + 1, ixEnd));
  }

  static removeScaleFactorFromName(name) {
    let ixStart = name.indexOf('@');
    if (ixStart === -1)
      return name;
    debugger

    let ixEnd = name.indexOf('x', ixStart);
    return name.substring(0, ixStart) + name.substring(ixEnd + 1);
  }

  static fromBase64String(string) {
    let imgElement = new Image();
    imgElement.src = string;
    return new Texture(imgElement);
  }

  static fromCanvasAsImage(canvas, type = 'image/png', quality = 1) {
    let imgElement = new Image();
    imgElement.src = canvas.toDataURL(type, quality);

    return new Texture(imgElement);
  }

  static fromCanvas(canvas) {
    return Black.instance.video.getTextureFromCanvas(canvas);
  }

  get scale() {
    return this.mScale;
  }

  get region() {
    return this.mRegion;
  }

  get untrimmedRegion() {
    return this.mUntrimmedRegion;
  }

  get nativeWidth() {
    return this.mNativeWidth;
  }

  get nativeHeight() {
    return this.mNativeHeight;
  }

  get displayWidth() {
    return this.mDisplayWidth;
  }

  get displayHeight() {
    return this.mDisplayHeight;
  }

  get renderWidth() {
    return this.mRenderWidth;
  }

  get renderHeight() {
    return this.mRenderHeight;
  }

  get isValid() {
    return this.mValid;
  }

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
 * @type {Image|null}
 * @nocollapse
 */
Texture.MISSING_IMAGE_CACHE = null;

Texture.MAX_SIZE = 2048;