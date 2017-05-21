/**
 * Texture Atlas asset responsible for loading Image file and coresponding Json
 * file.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class AtlasTextureAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} dataUrl  Json URL.
   */
  constructor(name, imageUrl, dataUrl) {
    super(name, imageUrl);

    /**
     * @private
     * @type {Image}
     */
    this.mImageElement = new Image();

    /**
     * @private
     * @type {JSONAsset}
     */
    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);
  }


  /**
   * @ignore
   * @returns {void}
   */
  onJsonLoaded() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * @override
   * @inheritDoc
   * @return {void}
   */
  onLoaded() {
    this.mData = new AtlasTexture(new Texture(this.mImageElement), /** @type {{meta: *, frames: *}} */ (this.dataAsset.data));

    super.onLoaded();
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  load() {
    this.dataAsset.load();
  }
}
