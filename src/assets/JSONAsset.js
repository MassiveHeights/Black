/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends Asset
 */
/* @echo EXPORT */
class JSONAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @return {void}
   */
  constructor(name, url) {
    super(name);

    /** @private @type {XHRAssetLoader} */
    this.mXHR = new XHRAssetLoader(url);
    this.mXHR.mimeType = 'application/json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(/** @type {!Object}*/(JSON.parse(/** @type {string} */(this.mXHR.data))));
  }
}
