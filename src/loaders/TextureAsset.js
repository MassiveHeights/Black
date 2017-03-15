/* @echo EXPORT */
class TextureAsset extends Asset {
  /**
   * constructor - Description
   *
   * @param {string} name Description
   * @param {string} url  Description
   *
   * @return {void} Description
   */
  constructor(name, url) {
    super(name, url);

    /** @type {Image} */
    this.mImageElement = new Image();
  }

  /**
   * onLoaded - Description
   *
   * @return {void} Description
   */
  onLoaded() {
    //console.log('TextureAsset: \'%s\' loaded', this.mName);

    this.mData = new Texture(this.mImageElement);

    super.onLoaded();
  }

  /**
   * load - Description
   *
   * @return {void} Description
   */
  load() {
    this.mImageElement.src = this.mUrl;
    this.mImageElement.onload = () => {
      this.onLoaded();
    }
  }

  /**
   * type - Description
   *
   * @return {string} Description
   */
  get type() {
    return "TextureAsset";
  }
}
