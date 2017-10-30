/* @echo EXPORT */
class FontMetrics {
  constructor(info) {
    if (FontMetrics.__CONTEXT === null) {
      FontMetrics.__CANVAS = document.createElement('canvas');
      FontMetrics.__CONTEXT = canvas.getContext('2d');
    }

    this.mCanvas = FontMetrics.__CANVAS;
    this.mCtx = FontMetrics.__CONTEXT;

    this.mInfo = info;
    this.mPadding = info.size * 0.5;

    this.mCanvasWidth = this.mCanvas.width = info.size * 2;
    this.mCanvasHeight = this.mCanvas.height = info.size * 2 + this.mPadding;

    this.mCtx.font = `${info.weight} ${info.size}px ${info.name}`;
    this.mCtx.textBaseline = 'top';
    this.mCtx.textAlign = 'center';

    this.capHeight = this.__measureTop(FontMetrics.CHAR_CAPITAL_HEIGHT);
    this.baseline = this.__measureBottom(FontMetrics.CHAR_BASELINE);
    this.xHeight = this.__measureTop(FontMetrics.CHAR_XHEIGHT);
    this.bottom = this.__computeLineHeight();
    this.ascent = this.__measureTop(FontMetrics.CHAR_ASCENT);
    this.descent = this.__measureBottom(FontMetrics.CHAR_DESCENT);
    this.top = 0;
  }

  get capHeightNormalized() {
    return (this.capHeight - this.top) / this.mInfo.size;
  }

  get xHeightNormalized() {
    return (this.xHeight - this.top) / this.mInfo.size;
  }

  get ascentNormalized() {
    return (this.ascent - this.top) / this.mInfo.size;
  }

  get descentNormalized() {
    return (this.descent - this.top) / this.mInfo.size;
  }

  get baselineNormalized() {
    return (this.baseline - this.top) / this.mInfo.size;
  }

  get bottomNormalized() {
    return (this.bottom - this.top) / this.mInfo.size;
  }

  __computeLineHeight() {
    const letter = 'A';

    let ty = this.mCanvas.height;
    FontMetrics.__CONTEXT.setTransform(1, 0, 0, 1, 0, ty)
    FontMetrics.__CONTEXT.textBaseline = 'bottom';

    const gutter = this.mCanvas.height - this.__measureBottom(letter);

    ty = 0;
    FontMetrics.__CONTEXT.setTransform(1, 0, 0, 1, 0, ty)
    FontMetrics.__CONTEXT.textBaseline = 'top';

    return this.__measureBottom(letter) + gutter;
  }

  __getPixels(text) {
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
    this.mCtx.fillText(text, this.mCanvas.width / 2, this.mPadding, this.mCanvas.width);

    return this.mCtx.getImageData(0, 0, this.mCanvas.width, this.mCanvas.height).data;
  }

  __getFirstIndex(pixels) {
    for (let i = 3, n = pixels.length; i < n; i += 4)
      if (pixels[i] > 0)
        return (i - 3) / 4;

    return pixels.length;
  }

  __getLastIndex(pixels) {
    for (let i = pixels.length - 1; i >= 3; i -= 4)
      if (pixels[i] > 0)
        return i / 4;

    return 0;
  }

  __measureBottom(text) {
    let pixels = this.__getPixels(text);
    let lastIndex = this.__getLastIndex(pixels);
    return Math.round(lastIndex / this.mCanvas.width) - this.mPadding;
  }

  __measureTop(text) {
    let pixels = this.__getPixels(text);
    let fistIndex = this.__getFirstIndex(pixels);
    return Math.round(fistIndex / this.mCanvas.width) - this.mPadding;
  };

  static get(fontName) {
    let cache = FontMetrics.CACHE[fontName];
    

    if (cache == null) {
      let info = new TextInfo('arial', 0, 24);
      cache = new FontMetrics(info);
      FontMetrics.CACHE[fontName] = cache;
    }

    return cache;
  }
}

FontMetrics.CACHE = {};
FontMetrics.__CONTEXT = null;
FontMetrics.__CANVAS = null;
FontMetrics.CHAR_CAPITAL_HEIGHT = 's';
FontMetrics.CHAR_BASELINE = 'a';
FontMetrics.CHAR_XHEIGHT = 'x';
FontMetrics.CHAR_DESCENT = 'p';
FontMetrics.CHAR_ASCENT = 'h';