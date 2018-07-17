/**
 * Font measurement tools.
 *
 * @cat display.text
 */
/* @echo EXPORT */
class FontMetrics {

  /**
   * Creates new instance of FontMetrics. Do not use constructor directly instead use {@link FontMetrics#get} method.
   *
   * @ignore
   * @private
   * @param {TextStyle} style Default text info with 24 font size.
   */
  constructor(style) {
    if (FontMetrics.__CONTEXT === null) {
      FontMetrics.__CANVAS = /** @type {HTMLCanvasElement} */(document.createElement('canvas'));
      FontMetrics.__CONTEXT = FontMetrics.__CANVAS.getContext('2d');
    }

    /** @private */
    this.mCanvas = FontMetrics.__CANVAS;

    /** @private */
    this.mCtx = FontMetrics.__CONTEXT;

    /** @private @type {TextStyle} */
    this.mStyle = style;

    /** @private @type {number} */
    this.mPadding = style.size * 0.5;

    /** @private @type {number} */
    this.mCanvasWidth = this.mCanvas.width = style.size * 2;

    /** @private @type {number} */
    this.mCanvasHeight = this.mCanvas.height = style.size * 2 + this.mPadding;

    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.font = `${style.weight} ${style.size}px ${style.family}`;
    this.mCtx.textBaseline = 'top';
    this.mCtx.textAlign = 'center';

    /**
     * The maximum distance below the baseline for the lowest glyph in the font at a given text size.
     * @public
     * @type {number}
     */
    this.bottom = this.__computeLineHeight();

    /**
     * The height of a capital letter above the baseline.
     * @public
     * @type {number}
     */
    this.capHeight = this.__measureTop(FontMetrics.CHAR_CAPITAL_HEIGHT);

    /**
     * The line upon which most letters "sit" and below which descenders extend.
     * @public
     * @type {number}
     */
    this.baseline = this.__measureBottom(FontMetrics.CHAR_BASELINE);

    /**
     * The distance between the baseline and the mean line of lower-case letters.
     * @public
     * @type {number}
     */
    this.xHeight = this.__measureTop(FontMetrics.CHAR_XHEIGHT);

    /**
     * The recommended distance above the baseline for singled spaced text.
     * @public
     * @type {number}
     */
    this.ascent = this.__measureTop(FontMetrics.CHAR_ASCENT);

    /**
     * The recommended distance below the baseline for singled spaced text.
     * @public
     * @type {number}
     */
    this.descent = this.__measureBottom(FontMetrics.CHAR_DESCENT);

    /**
     * The maximum distance above the baseline for the tallest glyph in the font at a given text size.
     * @public
     * @type {number}
     */
    this.top = 0;
  }

  /**
   * `capHeight` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get capHeightNormalized() {
    return (this.capHeight - this.top) / this.mStyle.size;
  }

  /**
   * `xHeight` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get xHeightNormalized() {
    return (this.xHeight - this.top) / this.mStyle.size;
  }

  /**
   * `ascent` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get ascentNormalized() {
    return (this.ascent - this.top) / this.mStyle.size;
  }

  /**
   * `descent` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get descentNormalized() {
    return (this.descent - this.top) / this.mStyle.size;
  }

  /**
   * `baseline` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get baselineNormalized() {
    return (this.baseline - this.top) / this.mStyle.size;
  }

  /**
   * `bottom` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get bottomNormalized() {
    return (this.bottom - this.top) / this.mStyle.size;
  }

  /**
   * @ignore
   * @private
   * @returns {number}
   */
  __computeLineHeight() {
    const letter = 'A';

    let ty = this.mCanvas.height;
    this.mCtx.setTransform(1, 0, 0, 1, 0, ty);
    this.mCtx.textBaseline = 'bottom';

    const gutter = this.mCanvas.height - this.__measureBottom(letter);

    ty = 0;
    this.mCtx.setTransform(1, 0, 0, 1, 0, ty);
    this.mCtx.textBaseline = 'top';

    return this.__measureBottom(letter) + gutter;
  }

  /**
   * @ignore
   * @private
   * @param {string} text 
   * @returns {CanvasPixelArray}
   */
  __getPixels(text) {
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
    this.mCtx.fillText(text, this.mCanvas.width / 2, this.mPadding, this.mCanvas.width);

    return this.mCtx.getImageData(0, 0, this.mCanvas.width, this.mCanvas.height).data;
  }

  /**
   * @ignore
   * @private
   * @param {CanvasPixelArray} pixels
   * @returns {number}
   */
  __getFirstIndex(pixels) {
    for (let i = 3, n = pixels.length; i < n; i += 4)
      if (pixels[i] > 0)
        return (i - 3) / 4;

    return pixels.length;
  }

  /**
   * @ignore
   * @private
   * @param {CanvasPixelArray} pixels
   * @returns {number}
   */
  __getLastIndex(pixels) {
    for (let i = pixels.length - 1; i >= 3; i -= 4)
      if (pixels[i] > 0)
        return i / 4;

    return 0;
  }

  /**
   * @ignore
   * @private
   * @param {string} text 
   * @returns {number}
   */
  __measureBottom(text) {
    let pixels = this.__getPixels(text);
    let lastIndex = this.__getLastIndex(pixels);
    return Math.round(lastIndex / this.mCanvas.width) - this.mPadding;
  }

  /**
   * @ignore
   * @private
   * @param {string} text 
   * @returns {number}
   */
  __measureTop(text) {
    let pixels = this.__getPixels(text);
    let firstIndex = this.__getFirstIndex(pixels);
    return Math.round(firstIndex / this.mCanvas.width) - this.mPadding;
  };

  /**
   * Use this method instead of constructor.
   *
   * @static
   * @param {string} fontName Name of font.
   * @returns {FontMetrics}
   */
  static get(fontName) {
    let cache = FontMetrics.CACHE[fontName];

    if (cache == null) {
      let style = new TextStyle(fontName, 0, 24);
      cache = new FontMetrics(style);
      FontMetrics.CACHE[fontName] = cache;
    }

    return cache;
  }
}

/** @ignore @static @private */
FontMetrics.CACHE = {};

/** @ignore @static @private */
FontMetrics.__CONTEXT = null;

/** @ignore @static @private @type {HTMLCanvasElement}*/
FontMetrics.__CANVAS = null;

/** @ignore @static @private */
FontMetrics.CHAR_CAPITAL_HEIGHT = 's';

/** @ignore @static @private */
FontMetrics.CHAR_BASELINE = 'a';

/** @ignore @static @private */
FontMetrics.CHAR_XHEIGHT = 'x';

/** @ignore @static @private */
FontMetrics.CHAR_DESCENT = 'p';

/** @ignore @static @private */
FontMetrics.CHAR_ASCENT = 'h';