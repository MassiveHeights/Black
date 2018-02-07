/**
 * Font file asset class responsible for loading local font files.
 *
 * Note: this class need a body to work properly.
 *
 * @cat loaders
 * @extends Asset
 */
/* @echo EXPORT */
class FontAsset extends Asset {
  /**
   * Creates new instance of FontAsset.
   *
   * @param {string} name        The custom name of the font
   * @param {string} url    The path to the font
   * @param {boolean} local      Is this font local?
   */
  constructor(name, url, local) {
    if (local === false)
      url = 'https://fonts.googleapis.com/css?family=' + name.replace(new RegExp(' ', 'g'), '+');

    super(name, url);

    /** @private @type {string} */
    this.mTestingFontName = 'Courier New';

    /** @private @type {boolean} */
    this.mLocal = local;

    /** @private @type {string} */
    this.mTestingString = '~ GHBDTN,.#$Mlck';

    /** @private @type {number} */
    this.mLoadingTimeout = 2500;

    /** @private @type {number} */
    this.mCheckDelay = 50;

    /** @private @type {Element} */
    this.mTestingElement = this.__getTestingElement();

    this.metrics = null;

    /** @private @type {Element} */
    this.mLoaderElement = this.__getLoaderElement(this.mLocal);
    this.mTestingElement.style.fontFamily = this.mTestingFontName;

    /** @private @type {number} */
    this.mDefaultFontWidth = this.mTestingElement.offsetWidth;

    this.mTestingElement.style.fontFamily = name + ',' + this.mTestingFontName;
  }

  /**
   * @ignore
   * @private
   * @return {Element}
   */
  __getLoaderElement(local) {
    let loaderElement = document.createElement(local ? 'style' : 'link');
    loaderElement.type = 'text/css';
    loaderElement.media = 'all';
    loaderElement.rel = 'stylesheet';
    loaderElement.onerror = function () {
    };
    document.getElementsByTagName('head')[0].appendChild(loaderElement);
    return loaderElement;
  }

  /**
   * @ignore
   * @private
   * @return {Element}
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
   * @inheritDoc
   */
  load() {
    if (this.mLocal)
      this.mLoaderElement.innerHTML += (`\n @font-face {font-family: ${this.mName}; src: url(${this.mUrl});}`);
    else
      this.mLoaderElement.href = this.mUrl;

    this.checkLoadingStatus();
  }

  /**
   * @private
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
   * @inheritDoc
   */
  onLoaded() {
    let a = this.mLoaderElement;

    this.metrics = FontMetrics.get(this.mName);

    super.onLoaded();
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);
  }

  /**
   * @private
   * @return {void}
   */
  onLoadingFail() {
    console.warn(`loading ${this.name} font failed.`);
    this.onLoaded(); //TODO what to do here?
  }
}