/* @echo EXPORT */
class FontAsset extends Asset {
  /**
   * @param {string} name font name
   * @param {string} url font url
   *
   * @return {void}
   */
  constructor(name, url) {
    super(name, url);

    /**
     * @private
     * @type {string}
     */
    this.mTestingFontName = 'Courier New';

    /**
     * @private
     * @type {string}
     */
    this.mTestingString = '~ GHBDTN,.#$Mlck';

    /**
     * @private
     * @type {number}
     */
    this.mLoadingTimeout = 2500;

    /**
     * @private
     * @type {number}
     */
    this.mCheckDelay = 50;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mTestingElement = this.__getTestingElement();

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mCSSLoader = this.__getCSSLoader();
    this.mTestingElement.style.fontFamily = this.mTestingFontName;

    /**
     * @private
     * @type {number}
     */
    this.mDefaultFontWidth = this.mTestingElement.offsetWidth;
    this.mTestingElement.style.fontFamily = name + ',' + this.mTestingFontName;
  }

  /**
   * @private
   * @return {string}
   */
  __getCSSLoader() {
    if (FontAsset.CSS_LOADER)
      return FontAsset.CSS_LOADER;

    let cssLoader = document.createElement('style');
    cssLoader.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(cssLoader);
    FontAsset.CSS_LOADER = cssLoader;
    return cssLoader;
  }

  /**
   * @private
   * @return {string}
   */
  __getTestingElement() {
    if (FontAsset.TESTING_ELEMENT)
      return FontAsset.TESTING_ELEMENT;

    let testingElement = document.createElement('span');
    testingElement.style.position = 'absolute';
    testingElement.style.top = '-9999px';
    testingElement.style.left = '-9999px';
    testingElement.style.visibility = 'hidden';
    testingElement.style.fontSize = '250px';
    testingElement.innerHTML = this.mTestingString;
    document.body.appendChild(testingElement);

    FontAsset.TESTING_ELEMENT = testingElement;
    return testingElement;
  }

  /**
   * @override
   * @return {string}
   */
  load() {
    this.mCSSLoader.innerHTML += (`\n @font-face {font-family: ${this.mName}; src: url(${this.mUrl});}`);
    this.checkLoadingStatus();
  }

  /**
   * @return {void}
   */
  checkLoadingStatus() {
    if (this.mDefaultFontWidth === this.mTestingElement.offsetWidth) {
      if ((this.mLoadingTimeout -= this.mCheckDelay) <= 0) {
        this.onLoadingFail();
        return;
      }

      setTimeout(this.checkLoadingStatus.bind(this), this.mCheckDelay);
      return;
    }
    this.onLoaded();
  }

  /**
   * @return {void}
   */
  onLoadingFail() {
    console.warn(`loading ${this.name} font failed.`);
    this.onLoaded(); //TODO what to do here?
  }

  /**
   * @return {string}
   */
  get type() {
    return "FontAsset";
  }
}

FontAsset.TESTING_ELEMENT = null;
FontAsset.CSS_LOADER = null;
