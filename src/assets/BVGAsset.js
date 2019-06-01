import { Asset } from "./Asset";
import { GraphicsData } from "../display/GraphicsData";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { BVGParser } from "../parsers/BVGParser";
import { Debug } from "../core/Debug";
import { Black } from "../Black";
import { CanvasRenderTexture } from "../textures/CanvasRenderTexture";
import { Matrix } from "../geom/Matrix";
import { Graphics } from "../display/Graphics";
import { AssetType } from "./AssetType";

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends Asset
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

    this.mUrl = url;

    /** 
     * @private 
     * @type {GraphicsData|null} 
     */
    this.mGraphicsData = null;

    /** 
     * @private 
     * @type {XHRAssetLoader} 
     */
    this.mXHR = new XHRAssetLoader(url);
    this.mXHR.mimeType = 'application/json';
    this.addLoader(this.mXHR);
  }

  /**
   * 
   * @param {*} factory 
   */
  onLoaderRequested(factory) {
    let loader = factory.addLoader('xhr', this.mUrl);
    loader.mimeType = 'application/json';
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    const data = /** @type {!Object}*/(JSON.parse(/** @type {string} */(this.mXHR.data)));
    const parser = new BVGParser();

    this.mGraphicsData = parser.parse(data);
    this.mGraphicsData.name = this.name;

    super.ready(this.mGraphicsData);
  }
}
