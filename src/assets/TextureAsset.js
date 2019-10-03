import { Asset } from "./Asset";
import { Texture } from "../textures/Texture";
import { ImageAssetLoader } from "./loaders/ImageAssetLoader";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Single Texture file asset class responsible for loading images file and
 * converting them into Textures.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class TextureAsset extends Asset {
  /**
   * Creates TextureAsset instance.
   *
   * @param {string} name Asset name.
   * @param {string} url  URL to load image from.
   */
  constructor(name, url) {
    super(AssetType.TEXTURE, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** @type {number} */
    this.mScale = 1 / Texture.getScaleFactorFromName(url);

    /** 
     * @private 
     * @type {black-engine~ImageAssetLoader|null} 
     */
    this.mImageLoader = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mImageLoader = factory.get(LoaderType.IMAGE, this.mUrl);
    this.addLoader(this.mImageLoader);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new Texture(this.mImageLoader.data, null, null, this.mScale));
  }
}
