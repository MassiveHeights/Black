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

      FontMetrics.__CANVAS.width = 10;
      FontMetrics.__CANVAS.height = 200;
    }

    style.size = 24;

    /** @private */
    this.mCanvas = FontMetrics.__CANVAS;

    /** @private */
    this.mCtx = FontMetrics.__CONTEXT;

    /** @private @type {TextStyle} */
    this.mStyle = style;

    const drawY = Math.floor(FontMetrics.__CANVAS.height * 0.7766);
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
    this.mCtx.font = `${style.weight} ${style.size}px ${style.family}`;
    this.mCtx.fillText('x', 0, drawY, 1);

    let data = this.mCtx.getImageData(0, 0, 1, this.mCanvas.height).data;

    const xHeight = this.__getBottom(data) - this.__getTop(data);

    for (let i = 65; i <= 122; i++) {
      if (i > 90 && i < 97)
        continue;

      this.mCtx.fillText(String.fromCharCode(i), 0, drawY, 1);
    }

    data = this.mCtx.getImageData(0, 0, 1, this.mCanvas.height).data;

    const top = this.__getTop(data);
    const bottom = this.__getBottom(data);
    const baseLine = drawY - top;
    const height = bottom - top;

    /**
     * The line upon which most letters "sit" and below which descender extend.
     * @public
     * @type {number}
     */
    this.baseline = baseLine;

    /**
     * The maximum y position for the lowest glyph in the font.
     * @public
     * @type {number}
     */
    this.bottom = height;

    /**
     * The recommended distance above the mean line (top of lower case characters) for singled spaced text.
     * @public
     * @type {number}
     */
    this.ascent = baseLine - xHeight;

    /**
     * The recommended distance below the baseline for singled spaced text.
     * @public
     * @type {number}
     */
    this.descent = height - baseLine;

    /**
      * The distance between the baseline and the mean line of lower-case letters, i.e height of `x` character.
      * @public
      * @type {number}
      */
    this.xHeight = xHeight;

    /**
     * The height of a capital letter above the baseline.
     * @public
     * @type {number}
     */
    this.capHeight = baseLine;
  }

  /**
   * `capHeight` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get capHeightNormalized() {
    return this.capHeight / this.mStyle.size;
  }

  /**
   * `xHeight` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get xHeightNormalized() {
    return this.xHeight / this.mStyle.size;
  }

  /**
   * `ascent` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get ascentNormalized() {
    return this.ascent / this.mStyle.size;
  }

  /**
   * `descent` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get descentNormalized() {
    return this.descent / this.mStyle.size;
  }

  /**
   * `baseline` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get baselineNormalized() {
    return this.baseline / this.mStyle.size;
  }

  /**
   * `bottom` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get bottomNormalized() {
    return this.bottom / this.mStyle.size;
  }

  /**
   * @ignore
   * @private
   * @param {Uint8ClampedArray} data
   * @returns {number}
   */
  __getTop(data) {
    for (let i = 3, n = data.length; i < n; i += 4) {
      if (data[i] > 0) {
        return (i - 3) / 4;
      }
    }

    return data.length / 4;
  }

  /**
   * @ignore
   * @private
   * @param {Uint8ClampedArray} data
   * @returns {number}
   */
  __getBottom(data) {
    for (let i = data.length - 1; i > 0; i -= 4) {
      if (data[i] > 0) {
        return (i + 1) / 4;
      }
    }

    return 0;
  }

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
