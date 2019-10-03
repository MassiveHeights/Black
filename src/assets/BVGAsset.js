import { Asset } from "./Asset";
import { GraphicsData } from "../display/GraphicsData";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { BVGParser } from "../parsers/BVGParser";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class BVGAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   *
   * @returns {void}
   */
  constructor(name, url) {
    super(AssetType.VECTOR_GRAPHICS, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~GraphicsData|null} 
     */
    this.mGraphicsData = null;

    /** 
     * @private 
     * @type {XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.mimeType = 'application/json';
    this.mXHR.responseType = 'json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    const data = /** @type {!Object}*/(this.mXHR.data);
    const parser = new BVGParser();

    this.mGraphicsData = parser.parse(data);
    this.mGraphicsData.name = this.name;

    super.ready(this.mGraphicsData);
  }
}
