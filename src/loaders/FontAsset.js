/**
 * Font file asset class responsible for loading local font files.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class FontAsset extends Asset {
  /**
   * @param {string} name font name
   * @param {string} url font url
   *
   * @return {void}
   */
  constructor(name, url, local) {
    super(name, url);

    /**
     * @private
     * @type {string}
     */
    this.mTestingFontName = 'Courier New';

    /**
     * @private
     * @type {boolean}
     */
    this.mLocal = local;

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
    this.mLoaderElement = this.__getLoaderElement(this.mLocal);
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
  __getLoaderElement(local) {
    let loaderElement = document.createElement(local ? 'style' : 'link');
    loaderElement.type = 'text/css';
    loaderElement.media = 'all';
    loaderElement.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(loaderElement);
    return loaderElement;
  }

  /**
   * @private
   * @return {string}
   */
  __getTestingElement() {
    let testingElement = document.createElement('span');
    testingElement.style.position = 'absolute';
    testingElement.style.top = '-9999px';
    testingElement.style.left = '-9999px';
    testingElement.style.visibility = 'hidden';
    testingElement.style.fontSize = '250px';
    testingElement.innerHTML = this.mTestingString;
    document.body.appendChild(testingElement);

    return testingElement;
  }

  /**
   * @override
   * @return {string}
   */
  load() {
    if (this.mLocal)
      this.mLoaderElement.innerHTML += (`\n @font-face {font-family: ${this.mName}; src: url(${this.mUrl});}`);
    else
      this.mLoaderElement.href = this.mUrl;

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

  onLoaded() {
    super.onLoaded();
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);
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
