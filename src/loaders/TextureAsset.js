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

    /**
     * @private
     * @type {Image}
     */
    this.mImageElement = new Image();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded() {
    this.mData = new Texture(this.mImageElement);

    super.onLoaded();
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  load() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }
}
