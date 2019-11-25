import { Asset } from "./Asset";
import { Texture } from "../textures/Texture";
import { ImageAssetLoader } from "./loaders/ImageAssetLoader";
import { XHRAssetLoader } from "./loaders/XHRAssetLoader";
import { AtlasTexture } from "../textures/AtlasTexture";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Texture Atlas asset responsible for loading Image file and corresponding Json
 * file.
 *
 * @cat assets
 * @extends black-engine~Asset
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
    super(AssetType.TEXTURE_ATLAS, name);

    /**
     * @private
     * @type {string}
     */
    this.mImageUrl = imageUrl;

    /**
     * @private
     * @type {string}
     */
    this.mDataUrl = dataUrl;

    /** 
     * @private 
     * @type {number} 
     */
    this.mScale = 1 / Texture.getScaleFactorFromName(imageUrl);

    /** 
     * @private 
     * @type {black-engine~ImageAssetLoader|null} 
     */
    this.mImageLoader = null;

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
    this.mImageLoader = factory.get(LoaderType.IMAGE, this.mImageUrl);
    this.addLoader(this.mImageLoader);

    this.mXHR = factory.get(LoaderType.XHR, this.mDataUrl);
    this.mXHR.mimeType = 'application/json';
    this.mXHR.responseType = 'json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new AtlasTexture(this.mImageLoader.data, this.mXHR.data, this.mScale));
  }
}
