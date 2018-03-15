/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @extends DisplayObject
 */
/* @echo EXPORT */
class TextField extends DisplayObject {
  /**
   * Creates new instance of TextField
   * 
   * @param {string=} [text=''] Text to be displayed inside this text field
   * @param  {string=} family                                             Font name
   * @param  {number=} [color=0x0]                                        Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14]                                          Text size
   * @param  {TextStyle.FontStyle=} [style=TextStyle.FontStyle.NORMAL]    Text style eg italic
   * @param  {TextStyle.FontWeight=} [weight=TextStyle.FontWeight.NORMAL] Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {number=} [strokeThickness=0]                                Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff]                             Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(text = '', family = 'sans-serif', color = 0x000000, size = 14, style = TextStyle.FontStyle.NORMAL, weight = TextStyle.FontWeight.NORMAL, strokeThickness = 0, strokeColor = 0xffffff) {
    super();

    /** @private @type {string} */
    this.mText = text;

    /** @private @type {Rectangle} */
    this.mCacheBounds = new Rectangle();

    /** @private @type {number} */
    this.mTextWidth = 0;

    /** @private @type {number} */
    this.mTextHeight = 0;

    /** @private @type {TextStyle} */
    this.mDefaultStyle = new TextStyle(family, color, size, style, weight, strokeThickness, strokeColor);

    /** @private @type {Object.<string,TextStyle>} */
    this.mStyles = {};

    /** @private @type {boolean} */
    this.mAutoSize = true;

    /** @private @type {TextStyle.FontAlign} */
    this.mAlign = TextStyle.FontAlign.LEFT;

    /** @private @type {TextStyle.FontVerticalAlign} */
    this.mVerticalAlign = TextStyle.FontVerticalAlign.MIDDLE;

    /** @private @type {boolean} */
    this.mMultiline = false;

    /** @private @type {number} */
    this.mLineHeight = 1.2;

    /** @private @type {Rectangle} */
    this.mTextBounds = new Rectangle();

    /** @private @type {number} */
    this.mFieldWidth = 0;

    /** @private @type {number} */
    this.mFieldHeight = 0;

    /** @private @type {Rectangle} */
    this.mPadding = new Rectangle(0, 0, 0, 0);

    /** @private @type {TextMetricsData|null} */
    this.mMetrics = null;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Text');
  }

  /**
   * @inheritDoc
   */
  onRender(driver, parentRenderer, isBackBufferActive = false) {
    let renderer = /** @type {TextRenderer} */ (this.mRenderer);

    let oldDirty = this.mDirty;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.worldTransformation;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.color = this.mColor === null ? parentRenderer.color : this.mColor;
      renderer.visible = this.mVisible;
      renderer.clipRect = this.mClipRect;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    if (this.mDirty & DirtyFlag.RENDER_CACHE) {
      this.onGetLocalBounds();

      renderer.padding = this.mPadding;
      renderer.text = this.text;
      renderer.style = this.mDefaultStyle;
      renderer.multiline = this.mMultiline;
      renderer.lineHeight = this.mLineHeight;
      renderer.align = this.mAlign;
      renderer.vAlign = this.mVerticalAlign;
      renderer.fieldWidth = this.mFieldWidth;
      renderer.fieldHeight = this.mFieldHeight;
      renderer.autoSize = this.mAutoSize;
      renderer.metrics = this.mMetrics;

      if (renderer.hasVisibleArea === true)
        this.mDirty ^= DirtyFlag.RENDER_CACHE;
    }

    renderer.dirty = oldDirty;

    return driver.registerRenderer(renderer);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mDirty & DirtyFlag.RENDER_CACHE) {
      let text = this.text;
      if (this.mMultiline === false)
        text = text.replace(/\n/g, '');

      let styles = [this.mDefaultStyle];
      styles.push(...Object.keys(/** @type {!Object} */(this.mStyles)).map(n => this.mStyles[n]));

      this.mMetrics = TextMetricsEx.measure(text, this.mLineHeight, ...styles);
      this.mTextBounds.copyFrom(this.mMetrics.bounds);
    }

    if (this.mAutoSize === false) {
      outRect.width = this.mFieldWidth;
      outRect.height = this.mFieldHeight;
    } else {
      outRect.width = this.mTextBounds.width;
      outRect.height = this.mTextBounds.height;
    }

    outRect.width += this.mPadding.right;
    outRect.height += this.mPadding.bottom;

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      outRect.x += this.mPivotX;
      outRect.y += this.mPivotY;
    }

    return outRect;
  }

  /**
   * Adds or updates given text style by given tag name.
   * 
   * @param {string} name 
   * @param {TextStyle} style 
   */
  setStyle(name, style) {
    Debug.assert(name !== 'def', `Please use 'setDefaultStyle' instead.`)
    style.name = name;

    this.mStyles[name] = style;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Updates default text style with a given one.
   * 
   * @param {TextStyle} style 
   */
  setDefaultStyle(style) {
    this.mDefaultStyle = style;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Removes style by given name.
   * @param {string} name 
   */
  removeStyle(name) {
    delete this.mStyles[name];
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Returns text style by given name or null if not found.
   * @param {string} name 
   */
  getStyle(name) {
    return this.mStyles.hasOwnProperty(name) ? this.mStyles[name] : null;
  }

  /**
   * Returns default text style.
   */
  getDefaultStyle(name) {
    return this.mDefaultStyle;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set multiline(value) {
    this.mMultiline = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Get/Set multiLine value switcher.
   *
   * @return {boolean}
   */
  get multiline() {
    return this.mMultiline;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set lineHeight(value) {
    this.mLineHeight = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Get/Set lines vertical offset. From top previous to top next line.
   *
   * @return {number}
   */
  get lineHeight() {
    return this.mLineHeight;
  }

  /**
   * Get/Set text size.
   *
   * @return {number}
   */
  get size() {
    return this.mDefaultStyle.size;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set size(value) {
    if (this.mDefaultStyle.size === value)
      return;

    this.mDefaultStyle.size = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Get/Set text font.
   *
   * @return {string}
   */
  get font() {
    return this.mDefaultStyle.family;
  }

  /**
   * @ignore
   * @param {string} value
   * @return {void}
   */
  set font(value) {
    if (this.mDefaultStyle.family === value)
      return;

    this.mDefaultStyle.family = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies text color as hexadecimal number eg 0xff0000 (total red)
   *
   * @return {number}
   */
  get color() {
    return this.mDefaultStyle.color;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set color(value) {
    if (this.mDefaultStyle.color === value)
      return;

    this.mDefaultStyle.color = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Get/Set text style.
   *
   * @return {TextStyle.FontStyle}
   */
  get fontStyle() {
    return this.mDefaultStyle.style;
  }

  /**
   * @ignore
   * @param {TextStyle.FontStyle} value
   * @return {void}
   */
  set fontStyle(value) {
    if (this.mDefaultStyle.style === value)
      return;

    this.mDefaultStyle.style = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies the font thick. The value is set from 100 to 900 in increments of 100.
   *
   * @return {TextStyle.FontWeight}
   */
  get weight() {
    return this.mDefaultStyle.weight;
  }

  /**
   * @ignore
   * @param {TextStyle.FontWeight} value
   * @return {void}
   */
  set weight(value) {
    if (this.mDefaultStyle.weight === value)
      return;

    this.mDefaultStyle.weight = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies the horizontal alignment of the text (left | center | right).
   *
   * @return {TextStyle.FontAlign}
   */
  get align() {
    return this.mAlign;
  }

  /**
   * @ignore
   * @param {TextStyle.FontAlign} value
   * @return {void}
   */
  set align(value) {
    if (this.mAlign === value)
      return;

    this.mAlign = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies the vertical alignment of the text (top | middle | bottom).
   *
   * @return {TextStyle.FontVerticalAlign}
   */
  get vAlign() {
    return this.mVerticalAlign;
  }

  /**
   * @ignore
   * @param {TextStyle.FontVerticalAlign} value
   * @return {void}
   */
  set vAlign(value) {
    if (this.mVerticalAlign === value)
      return;

    this.mVerticalAlign = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies stroke color as hexadecimal number eg 0xff0000 (total red)
   * @return {number}
   */
  get strokeColor() {
    return this.mDefaultStyle.strokeColor;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set strokeColor(value) {
    if (this.mDefaultStyle.strokeColor === value)
      return;

    this.mDefaultStyle.strokeColor = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Specifies the thickness of the stroke. 0 means that no stroke.
   * Note: if autoSize is true stroke works like filter meaning that position of the text will not be adjusted and bounds will be the same.
   * 
   * @return {number} 
   */
  get strokeThickness() {
    return this.mDefaultStyle.strokeThickness;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set strokeThickness(value) {
    if (value === this.mDefaultStyle.strokeThickness)
      return;

    this.mDefaultStyle.strokeThickness = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Specifies the width of the text field. If autoSize set as false
   *
   * @return {number}
   */
  get fieldWidth() {
    return this.mFieldWidth;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set fieldWidth(value) {
    if (value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /** Specifies the height of the text field, if autoSize set as false
   *
   * @return {number}
   */
  get fieldHeight() {
    return this.mFieldHeight;
  }


  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set fieldHeight(value) {
    if (value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**Text to be displayed inside this text field.

   * @return {string}
   */
  get text() {
    return this.mText;
  }

  /**
   * @ignore
   * @param {string} value
   * @return {void}
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Determines whether the size of the field will adjust to the size of the text. Note: if this set as true, you need to specify fieldHeight and fieldWidth manually
   *
   * @return {boolean}
   */
  get autoSize() {
    return this.mAutoSize;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * An extra padding. Also useful for bad prepared fonts.
   *
   * @return {Rectangle}
   */
  get padding() {
    return this.mPadding;
  }

  /**
   * @ignore
   * @param {Rectangle} value
   * @return {void}
   */
  set padding(value) {
    this.mPadding = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * 
   * 
   * @return {boolean} 
   */
  get dropShadow() {
    return this.mDefaultStyle.dropShadow;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set dropShadow(value) {
    if (value === this.mDefaultStyle.dropShadow)
      return;

    this.mDefaultStyle.dropShadow = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * 
   * 
   * @return {number} 
   */
  get shadowColor() {
    return this.mDefaultStyle.shadowColor;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set shadowColor(value) {
    if (value === this.mDefaultStyle.shadowColor)
      return;

    this.mDefaultStyle.shadowColor = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * 
   * 
   * @return {number} 
   */
  get shadowAlpha() {
    return this.mDefaultStyle.shadowAlpha;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set shadowAlpha(value) {
    if (value === this.mDefaultStyle.shadowAlpha)
      return;

    this.mDefaultStyle.shadowAlpha = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * 
   * 
   * @return {number} 
   */
  get shadowBlur() {
    return this.mDefaultStyle.shadowBlur;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set shadowBlur(value) {
    if (value === this.mDefaultStyle.shadowBlur)
      return;

    this.mDefaultStyle.shadowBlur = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * 
   * 
   * @return {number} 
   */
  get shadowDistanceX() {
    return this.mDefaultStyle.shadowDistanceX;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set shadowDistanceX(value) {
    if (value === this.mDefaultStyle.shadowDistanceX)
      return;

    this.mDefaultStyle.shadowDistanceX = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * 
   * 
   * @return {number} 
   */
  get shadowDistanceY() {
    return this.mDefaultStyle.shadowDistanceY;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set shadowDistanceY(value) {
    if (value === this.mDefaultStyle.shadowDistanceY)
      return;

    this.mDefaultStyle.shadowDistanceY = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }
}

/**
 * @ignore
 * @private
 * @static
 */
TextField.__cache = null;