/**
 * Single Texture file asset class responsible for loading images file and
 * converting them into Textures.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class TextureAsset extends Asset {
  /**
   * Creates TextureAsset instance.
   *
   * @param {string} name Asset name.
   * @param {string} url  URL to load image from.
   */
  constructor(name, url) {
    super(name, url);

    /** @private @type {Image} */
    this.mImageElement = new Image();
    this.mImageElement.crossOrigin = 'anonymous';
  }

  /**
   * @inheritDoc
   */
  onLoaded() {
    const scale = 1 / Texture.getScaleFactorFromName(this.mUrl);
    this.mData = new Texture(this.mImageElement, null, null, scale);

    super.onLoaded();
  }

  /**
   * @inheritDoc
   */
  load() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }
}
