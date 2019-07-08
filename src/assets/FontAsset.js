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
 * @extends Asset
 */
export class FontAsset extends Asset {
  /**
   * Creates new instance of FontAsset.
   *
   * @param {string} name     The custom name of the font
   * @param {string} url      The path to the font
   * @param {boolean} isLocal Pass `true` if font is local otherwise Google Fonts service is used.
   * @param {boolean} useAdvanceMetrics Indicates whenever or not font should be parsed using opentype.js library for better rendering.
   */
  constructor(name, url, isLocal, useAdvanceMetrics = false) {
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

    /**
     * @private
     * @type {boolean}
     */
    this.mUseAdvanceMetrics = useAdvanceMetrics;

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
    if (this.mUseAdvanceMetrics === true) {
      // TODO: Houston we have a problem! What if we have two loaders with different responseType?
      this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
      this.mXHR.responseType = 'arraybuffer';
      this.addLoader(this.mXHR);
    }
    else {
      // We are not doing actual loading since loading is handled by browser. Just fake it.
      const loader = factory.get(LoaderType.FONT_FACE, this.mName, this.mUrl, this.mIsLocal);
      this.addLoader(loader);
    }
  }

  __createElement(base64) {
    let loaderElement = document.createElement('style');
    loaderElement.type = 'text/css';
    loaderElement.media = 'all';
    loaderElement.rel = 'stylesheet';
    loaderElement.innerHTML += (`\n @font-face { font-family: 'ravi_prakashregular'; src: url(data:application/font-woff;charset=utf-8;base64,${base64}) format('woff');}`);
    document.getElementsByTagName('head')[0].appendChild(loaderElement);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    if (this.mUseAdvanceMetrics === true) {
      let arrayBuffer = this.mXHR.data;
      let base64String = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''));
      this.__createElement(base64String);

      let font = opentype.parse(arrayBuffer);
      super.ready(font);
    }
    else {
      super.ready();
    }
  }
}