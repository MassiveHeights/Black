import { Asset } from "./Asset";
import { FontFaceAssetLoader } from "./loaders/FontFaceAssetLoader";
import { AssetType } from "./AssetType";
import { LoaderType } from "./LoaderType";

/**
 * Font file asset class responsible for loading local font files.
 *
 * Note: this class need a body to work properly.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
export class FontAsset extends Asset {
  /**
   * Creates new instance of FontAsset.
   *
   * @param {string} name     The custom name of the font
   * @param {string} url      The path to the font
   * @param {boolean} isLocal Pass `true` if font is local otherwise Google Fonts service is used.
   */
  constructor(name, url, isLocal) {
    super(AssetType.FONT, name);

    if (isLocal === false)
      url = 'https://fonts.googleapis.com/css?family=' + name.replace(new RegExp(' ', 'g'), '+');

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLocal = isLocal;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    // We are not doing actual loading since loading is handled by browser. Just fake it.
    const loader = factory.get(LoaderType.FONT_FACE, this.mName, this.mUrl, this.mIsLocal);
    this.addLoader(loader);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready();
  }
}