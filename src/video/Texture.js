// TODO:
// [_] Do not handle is loaded or not.
// Texture shall not be responsible for loading itself.
// We have TextureAsset for it.
// native size - always the size of physical texture
// source size - the original size of a texture to
//

/* @echo EXPORT */
class Texture {
  /**
   * @param  {Image} nativeTexture description
   * @param  {Rectangle=} region = undefined description
   * @param  {Rectangle=} untrimmedRect = undefined description
   */
  constructor(nativeTexture, region, untrimmedRect) {
    /** @type {Image} */
    this.mTexture = nativeTexture;

    /** @type {Rectangle} */
    this.mRegion;

    /** @type {boolean} */
    this.mIsSubtexture = false;

    /** @type {number} */
    this.mId = ++Texture.__ID;

    if (region === undefined) {
      this.mRegion = new Rectangle(0, 0, nativeTexture.naturalWidth, nativeTexture.naturalHeight);
    } else {
      this.mRegion = /** @type {Rectangle} */ (region);
      this.mIsSubtexture = true;
    }

    /** @type {boolean} */
    this.mTrimmed = untrimmedRect !== undefined;

    if (this.mTrimmed === false)
      untrimmedRect = new Rectangle(0, 0, this.mRegion.width, this.mRegion.height);

    /** @type {Rectangle} */
    this.mUntrimmedRect = /** @type {Rectangle} */ (untrimmedRect);

    /** @type {boolean} */
    this.mIsLoaded = true;

    this.mRelativeRegion = new Rectangle(
      this.mRegion.x / nativeTexture.naturalWidth,
      this.mRegion.y / nativeTexture.naturalHeight,
      this.mRegion.width / nativeTexture.naturalWidth,
      this.mRegion.height / nativeTexture.naturalHeight
    );
  }

  get relativeRegion() {
    return this.mRelativeRegion;
  }

  /**
   * id - Description
   *
   * @return {number} Description
   */
  get id() {
    return this.mId;
  }

  /**
   * isTrimmed - Description
   *
   * @return {boolean} Description
   */
  get isTrimmed() {
    return this.mTrimmed;
  }

  /**
   * isSubTexture - Description
   *
   * @return {boolean} Description
   */
  get isSubTexture() {
    return this.mIsSubtexture;
  }

  // TODO: if we update texture we have to nofity everything, send signal
  // update(nativeTexture = null, region = null, source = null, crop = null){
  // }

  // render width
  // render height
  // croppedWidth, croppedHeight
  // width, height
  //

  /**
   * untrimmedRect - Description
   *
   * @return {Rectangle} Description
   */
  get untrimmedRect() {
    return this.mUntrimmedRect;
  }

  /**
   * width - Description
   *
   * @return {number} Description
   */
  get width() {
    if (this.mRegion)
      return this.mRegion.width;

    return this.mTexture.naturalWidth;
  }

  /**
   * height - Description
   *
   * @return {number} Description
   */
  get height() {
    if (this.mRegion)
      return this.mRegion.height;

    return this.mTexture.naturalHeight;
  }

  /**
   * region - Description
   *
   * @return {Rectangle} Description
   */
  get region() {
    return this.mRegion;
  }

  /**
   * native - Description
   *
   * @return {Image} Description
   */
  get native() {
    return this.mTexture;
  }

  /**
   * isLoaded - Description
   *
   * @return {boolean} Description
   */
  get isLoaded() {
    return this.mIsLoaded;
  }

  /**
   * type - Description
   *
   * @return {string} Description
   */
  get type() {
    return 'Texture';
  }

  /**
   * baseType - Description
   *
   * @return {string} Description
   */
  get baseType() {
    return 'Texture';
  }

  /**
   * dispose - Description
   *
   * @return {void} Description
   */
  dispose() {
    this.mTexture = null;
  }

  /**
   * fromBase64String - Description
   *
   * @param {string} string Description
   *
   * @return {Texture} Description
   */
  static fromBase64String(string) {
    let imgElement = new Image();
    imgElement.src = string;
    return new Texture(imgElement);
  }


  /**
   * fromCanvasAsImage - Description
   *
   * @param {HTMLElement}   canvas           Description
   * @param {string} [type=image/png] Description
   * @param {number} [quality=1]      Description
   *
   * @return {Texture} Description
   */
  static fromCanvasAsImage(canvas, type = 'image/png', quality = 1) {
    let imgElement = new Image();
    imgElement.src = canvas.toDataURL(type, quality);

    return new Texture(imgElement);
  }


  /**
   * fromCanvas - Description
   *
   * @param {HTMLElement} canvas Description
   *
   * @return {Texture} Description
   */
  static fromCanvas(canvas) {
    return Black.instance.video.getTextureFromCanvas(canvas);
  }
}

/** @type {number}
 * @nocollapse
 */
Texture.__ID = 0;

/** @type {Image|null}
 * @nocollapse
 */
Texture.MISSING_IMAGE_CACHE = null;
