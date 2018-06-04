/**
 * Font file asset class responsible for loading local font files.
 *
 * Note: this class need a body to work properly.
 *
 * @cat assets
 * @extends Asset
 */
/* @echo EXPORT */
class FontAsset extends Asset {
  /**
   * Creates new instance of FontAsset.
   *
   * @param {string} name     The custom name of the font
   * @param {string} url      The path to the font
   * @param {boolean} isLocal Pass `true` if font is local otherwise Google Fonts service is used.
   */
  constructor(name, url, isLocal) {
    super(name);

    if (isLocal === false)
      url = 'https://fonts.googleapis.com/css?family=' + name.replace(new RegExp(' ', 'g'), '+');

    // We are not doing actual loading since loading is handled by browser. Just fake it.
    this.mLoader = new FontFaceAssetLoader(name, url, isLocal);
    this.addLoader(this.mLoader);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready();
  }
}