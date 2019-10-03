import { Asset } from "./Asset";
import { GraphicsData } from "../display/GraphicsData";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { BVGParser } from "../parsers/BVGParser";
import { Debug } from "../core/Debug";
import { Black } from "../Black";
import { CanvasRenderTexture } from "../textures/CanvasRenderTexture";
import { Matrix } from "../geom/Matrix";
import { Graphics } from "../display/Graphics";
import { LoaderType } from "./LoaderType";
import { AssetType } from "./AssetType";

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */

export class VectorTextureAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @param {boolean} bakeSelf Flag to bake full BVG as texture. If false root will not be baked.
   * @param {boolean} bakeChildren Flag to bake each node with id to textures. If false none children nodes will be baked.
   * @param {Array<string>} namesToBake Concrete nodes ids to bake. Works only if bakeChildren is set to true.
   *
   * @returns {void}
   */
  constructor(name, url, bakeSelf, bakeChildren, namesToBake) {
    super(AssetType.VECTOR_TEXTURE, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mBakeSelf = bakeSelf;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mBakeChildren = bakeChildren;

    /** 
     * @private 
     * @type {Array<string>} 
     */
    this.mNamesToBake = /** @type {Array<string>} */ (bakeChildren && namesToBake ? namesToBake : []);

    /** 
     * @private 
     * @type {black-engine~GraphicsData|null} 
     */
    this.mGraphicsData = null;

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

    const bakedTextures = this.bakeTextures();
    const ret = [];

    for (let name in bakedTextures) {
      if (!bakedTextures.hasOwnProperty(name))
        continue;

      ret.push({ name: name, data: bakedTextures[name] });
    }

    super.ready(ret);
  }

  /**
   * Creates baked textures from this graphics data.
   *
   * @return {Object.<string, black-engine~CanvasRenderTexture>}
   */
  bakeTextures() {
    const textures = {};
    const namesToBake = this.mNamesToBake;

    if (this.mBakeChildren && namesToBake.length === 0) {
      const traverse = nodes => {
        nodes = /** @type {Array<GraphicsData>} */(nodes);

        if (nodes.length === 0)
          return;

        for (let i = 0, l = nodes.length; i < l; i++) {
          if (nodes[i].name)
            namesToBake.push(/** @type {string} */(nodes[i].name));

          traverse(/** @type {Array<GraphicsData>} */(nodes[i].mNodes));
        }
      };

      traverse(this.mGraphicsData.mNodes);
    }

    if (this.mBakeSelf)
      namesToBake.unshift(this.mGraphicsData.name);

    for (let i = 0, l = namesToBake.length; i < l; i++) {
      const name = namesToBake[i];
      const node = this.mGraphicsData.searchNode(name);

      if (!node) {
        Debug.warn(`[BVGAsset] GraphicsData node with id '${name}' not found.`);
        continue;
      }

      const graphics = new Graphics(node, name !== this.mGraphicsData.name);
      const dpr = 1 / Black.driver.renderScaleFactor;
      const renderTexture = new CanvasRenderTexture(graphics.width, graphics.height, 1);

      Black.driver.render(graphics, renderTexture, new Matrix().scale(dpr, dpr));

      textures[name] = renderTexture;
    }

    return textures;
  }
}
