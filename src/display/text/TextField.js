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
   * @param  {string=} [text=''] Text to be displayed inside this text field
   * @param  {number=} size text size
   * @param  {string=} name font name
   * @param {TextInfo=} [style=undefined] TextInfo object
   */
  constructor(text = '', size = 14, name = 'sans-serif', style = undefined) {
    super();

    /** @private @type {string} */
    this.mText = text;

    /** @private @type {Rectangle} */
    this.mCacheBounds = new Rectangle();

    /** @private @type {number} */
    this.mTextWidth = 0;

    /** @private @type {number} */
    this.mTextHeight = 0;

    /** @private @type {TextInfo} */
    this.mStyle = style || new TextInfo();

    /** @private @type {string} */
    this.mStyle.name = name || style.name;

    /** @private @type {number} */
    this.mStyle.size = size || style.size;

    /** @private @type {boolean} */
    this.mAutoSize = true;

    /** @private @type {TextInfo.FontAlign} */
    this.mAlign = TextInfo.FontAlign.LEFT;

    /** @private @type {TextInfo.FontVerticalAlign} */
    this.mVerticalAlign = TextInfo.FontVerticalAlign.MIDDLE;

    /** @private @type {boolean} */
    this.mMultiline = false;

    /** @private @type {number} */
    this.mLineHeight = 1.2;

    /** @private @type {Rectangle} */
    this.mTextBounds = new Rectangle();

    /** @private @type {Array<Rectangle>|null} */
    this.mLineBounds = null;

    /** @private @type {number} */
    this.mFieldWidth = 0;

    /** @private @type {number} */
    this.mFieldHeight = 0;

    /** @private @type {Rectangle} */
    this.mPadding = new Rectangle(0, 0, 0, 0);
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
      renderer.visible = this.mVisible;
      renderer.clipRect = this.mClipRect;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    if (this.mDirty & DirtyFlag.RENDER_CACHE) {
      this.onGetLocalBounds();

      renderer.padding = this.mPadding;
      renderer.text = this.text;
      renderer.style = this.mStyle;
      renderer.multiline = this.mMultiline;
      renderer.lineHeight = this.mLineHeight;
      renderer.align = this.mAlign;
      renderer.vAlign = this.mVerticalAlign;
      renderer.fieldWidth = this.mFieldWidth;
      renderer.fieldHeight = this.mFieldHeight;
      renderer.autoSize = this.mAutoSize;
      renderer.bounds = this.mTextBounds;
      renderer.lineBounds = this.mLineBounds;

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

      this.mLineBounds = TextMetricsEx.measure(text, this.mStyle, this.mLineHeight, this.mTextBounds);
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
    return this.mStyle.size;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set size(value) {
    if (this.mStyle.size === value)
      return;

    this.mStyle.size = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Get/Set text font.
   *
   * @return {string}
   */
  get font() {
    return this.mStyle.name;
  }

  /**
   * @ignore
   * @param {string} value
   * @return {void}
   */
  set font(value) {
    if (this.mStyle.name === value)
      return;

    this.mStyle.name = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies text color as hexadecimal number eg 0xff0000 (total red)
   *
   * @return {number}
   */
  get color() {
    return this.mStyle.color;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set color(value) {
    if (this.mStyle.color === value)
      return;

    this.mStyle.color = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Get/Set text style.
   *
   * @return {TextInfo.FontStyle}
   */
  get style() {
    return this.mStyle.style;
  }

  /**
   * @ignore
   * @param {TextInfo.FontStyle} value
   * @return {void}
   */
  set style(value) {
    if (this.mStyle.style === value)
      return;

    this.mStyle.style = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies the font thick. The value is set from 100 to 900 in increments of 100.
   *
   * @return {TextInfo.FontWeight}
   */
  get weight() {
    return this.mStyle.weight;
  }

  /**
   * @ignore
   * @param {TextInfo.FontWeight} value
   * @return {void}
   */
  set weight(value) {
    if (this.mStyle.weight === value)
      return;

    this.mStyle.weight = value;
    this.setDirty(/** @type {DirtyFlag<number>} */(DirtyFlag.RENDER_CACHE | DirtyFlag.BOUNDS), false);
  }

  /**
   * Specifies the horizontal alignment of the text (left | center | right).
   *
   * @return {TextInfo.FontAlign}
   */
  get align() {
    return this.mAlign;
  }

  /**
   * @ignore
   * @param {TextInfo.FontAlign} value
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
   * @return {TextInfo.FontVerticalAlign}
   */
  get vAlign() {
    return this.mVerticalAlign;
  }

  /**
   * @ignore
   * @param {TextInfo.FontVerticalAlign} value
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
    return this.mStyle.strokeColor;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set strokeColor(value) {
    if (this.mStyle.strokeColor === value)
      return;

    this.mStyle.strokeColor = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Specifies the thickness of the stroke. 0 means that no stroke.
   * Note: if autoSize is true stroke works like filter meaning that position of the text will not be adjusted and bounds will be the same.
   * 
   * @return {number} 
   */
  get strokeThickness() {
    return this.mStyle.strokeThickness;
  }

  /**
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set strokeThickness(value) {
    if (value === this.mStyle.strokeThickness)
      return;

    this.mStyle.strokeThickness = value;
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
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
}

/**
 * @ignore
 * @private
 * @static
 */
TextField.__cache = null;