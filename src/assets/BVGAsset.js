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