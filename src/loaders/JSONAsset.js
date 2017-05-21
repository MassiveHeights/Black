/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class JSONAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   *
   * @return {void}
   */
  constructor(name, url) {
    super(name, url);

    this.mimeType = 'application/json';
  }

  /**
   * @override
   * @inheritDoc
   *
   * @return {void}
   */
  onLoaded(){
    this.mData = JSON.parse(/** @type {string} */ (this.mRequest.responseText) );
    super.onLoaded();
  }
}
