import { Asset } from "./Asset";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { AssetType } from "./AssetType";

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends Asset
 */
export class JSONAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @return {void}
   */
  constructor(name, url) {
    super(AssetType.JSON, name);

    /** 
     * @private 
     * @type {XHRAssetLoader} 
     */
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
