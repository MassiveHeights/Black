import { Asset } from "./Asset";
import { Texture } from "../textures/Texture";
import { ImageAssetLoader } from "./loaders/ImageAssetLoader";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { AtlasTexture } from "../textures/AtlasTexture";

/**
 * Texture Atlas asset responsible for loading Image file and corresponding Json
 * file.
 *
 * @cat assets
 * @extends Asset
 */
export class AtlasTextureAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} dataUrl  Json URL.
   */
  constructor(name, imageUrl, dataUrl) {
    super(name);

    /** 
     * @private 
     * @type {number} 
     */
    this.mScale = 1 / Texture.getScaleFactorFromName(imageUrl);

    /** 
     * @private 
     * @type {ImageAssetLoader} 
     */
    this.mImageLoader = new ImageAssetLoader(imageUrl);

    /** 
     * @private 
     * @type {XHRAssetLoader} 
     */
    this.mXHR = new XHRAssetLoader(dataUrl);
    this.mXHR.mimeType = 'application/json';

    this.addLoader(this.mImageLoader);
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new AtlasTexture(this.mImageLoader.data, /** @type {{meta: *, frames: Array<Object<Array<number>>>}} */(JSON.parse(this.mXHR.data)), this.mScale));
  }
}
