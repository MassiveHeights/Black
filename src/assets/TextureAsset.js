import { Asset } from "./Asset";
import { Texture } from "../textures/Texture";
import { ImageAssetLoader } from "./loaders/ImageAssetLoader";

/**
 * Single Texture file asset class responsible for loading images file and
 * converting them into Textures.
 *
 * @cat assets
 * @extends Asset
 */
export class TextureAsset extends Asset {
  /**
   * Creates TextureAsset instance.
   *
   * @param {string} name Asset name.
   * @param {string} url  URL to load image from.
   */
  constructor(name, url) {
    super(name);

    /** @type {number} */
    this.mScale = 1 / Texture.getScaleFactorFromName(url);

    /** 
     * @private 
     * @type {ImageAssetLoader} 
     */
    this.mImageLoader = new ImageAssetLoader(url);
    this.addLoader(this.mImageLoader);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new Texture(this.mImageLoader.data, null, null, this.mScale));
  }
}
