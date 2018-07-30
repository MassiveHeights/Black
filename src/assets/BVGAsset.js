/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends Asset
 */

/* @echo EXPORT */
class BVGAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @param {boolean} bake Flag to bake full BVG as texture. If false neither root nor children will be baked.
   * @param {boolean} bakeChildren Flag to bake each node with id to textures. If false none child node will be baked.
   * @param {Array<string>|null} namesToBake Concrete nodes id which require baking. Works only if bakeChildren=true.
   * @return {void}
   */
  constructor(name, url, bake, bakeChildren, namesToBake) {
    super(name);

    /** @private @type {boolean} */
    this.mBake = bake;

    /** @private @type {boolean} */
    this.mBakeChildren = bakeChildren;

    /** @private @type {Array<string>} */
    this.mNamesToBake = /** @type {Array<string>} */ (bakeChildren && namesToBake ? namesToBake : []);

    /** @private @type {GraphicsData|null} */
    this.mGraphicsData = null;

    /** @private @type {XHRAssetLoader} */
    this.mXHR = new XHRAssetLoader(url);
    this.mXHR.mimeType = 'application/json';
    this.addLoader(this.mXHR);
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

  /**
   * Creates baked textures from this graphics data.
   *
   * @return {Object.<string, CanvasRenderTexture>}
   */
  bakeTextures() {
    const textures = {};
    const namesToBake = this.mNamesToBake;

    if (!this.mBake)
      return textures;

    if (this.mBakeChildren && namesToBake.length === 0) {
      const traverse = nodes => {
        if (nodes.length === 0) return;

        for (let i = 0, l = nodes.length; i < l; i++) {
          if (nodes[i].name) {
            namesToBake.push(nodes[i].name);
          }

          traverse(nodes[i].mNodes);
        }
      };

      traverse(this.mGraphicsData.mNodes);
    }

    namesToBake.unshift(this.mGraphicsData.name);

    for (let i = 0, l = namesToBake.length; i < l; i++) {
      const name = namesToBake[i];
      const node = this.mGraphicsData.searchNode(name);

      if (!node) {
        Debug.warn(`[BVGAsset] GraphicsData node with id '${name}' not found.`);
        continue;
      }

      const graphics = new Graphics(node);
      const renderTexture = new CanvasRenderTexture(graphics.width, graphics.height, Black.driver.renderScaleFactor);

      Black.driver.render(graphics, renderTexture, new Matrix());

      textures[name] = renderTexture;
    }

    return textures;
  }
}
