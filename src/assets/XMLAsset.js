import { Asset } from "./Asset";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class XMLAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @return {void}
   */
  constructor(name, url) {
    super(AssetType.XML, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.mimeType = 'text/xml';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new DOMParser().parseFromString(/** @type {string} */(this.mXHR.data), 'text/xml'));
  }
}
