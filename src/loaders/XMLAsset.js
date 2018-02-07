/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class XMLAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @return {void}
   */
  constructor(name, url) {
    super(name, url);

    this.mimeType = 'text/xml';
  }

  /**
   * @inheritDoc
   */
  onLoaded() {
    this.mData = new DOMParser().parseFromString(this.mRequest.responseText, 'text/xml');
    super.onLoaded();
  }
}
