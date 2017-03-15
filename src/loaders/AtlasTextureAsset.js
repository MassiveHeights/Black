/* @echo EXPORT */
class AtlasTextureAsset extends Asset {
  /**
   * constructor
   *
   * @param {string} name
   * @param {string} imageUrl
   * @param {string} dataUrl
   *
   * @return {void}
   */
  constructor(name, imageUrl, dataUrl) {
    super(name, imageUrl);

    /** @type {Image} */
    this.mImageElement = new Image();

    /** @type {JSONAsset} */
    this.dataAsset = new JSONAsset(name, dataUrl);
    this.dataAsset.on('complete', this.onJsonLoaded, this);
  }

  onJsonLoaded() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * onLoaded
   *
   * @return {void}
   */
  onLoaded() {
    this.mData = new AtlasTexture(new Texture(this.mImageElement), /** @type {{meta: *, frames: *}} */ (this.dataAsset.data));

    super.onLoaded();
  }

  /**
   * load
   * @override
   *
   * @return {void}
   */
  load() {
    this.dataAsset.load();
  }
}
