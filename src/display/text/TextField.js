/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @extends DisplayObject
 */
/* @echo EXPORT */
class TextField extends DisplayObject {
  /**
   * @param  {string=} text Text to be displayed inside this text field
   * @param  {number=} size text size
   * @param  {string=} name font name
   * @param {TextInfo=} style TextInfo object
   */
  constructor(text = '', size = 14, name = 'sans-serif', style = undefined) {
    super();

    /**
     * @private
     * @type {string}
     */
    this.mText = text;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mCacheBounds = new Rectangle();

    /**
     * @private
     * @type {number}
     */
    this.mTextWidth = 0;

    /**
     * @private
     * @type {number}
     */
    this.mTextHeight = 0;

    /**
     * @private
     * @type {TextInfo}
     */
    this.mStyle = style || new TextInfo();

    /**
     * @private
     * @type {string}
     */
    this.mStyle.name = name || style.name;

    /**
     * @private
     * @type {number}
     */
    this.mStyle.size = size || style.size;

    /**
     * @private
     * @type {boolean}
     */
    this.mAutoSize = true;

    /** @type {TextInfo.FontAlign} */
    this.mAlign = TextInfo.FontAlign.LEFT;

    /**
     * @private
     * @type {boolean}
     */
    this.mMultiline = false;

    /**
     * @private
     * @type {number}
     */
    this.mLineHeight = 1.2;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mBounds = new Rectangle();

    /**
     * @private
     * @type {Array<Rectangle>|null}
     */
    this.mLineBounds = null;

    /**
     * @private
     * @type {number}
     */
    this.mFieldWidth = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFieldHeight = 0;
  }

  getRenderer() {
    return Black.instance.video.getRenderer('Text');
  }

  onRender(driver, parentRenderer) {
    let renderer = this.mRenderer;

    let oldDirty = this.mDirty;

    if (this.mDirty & DirtyFlag.RENDER) {
      renderer.transform = this.worldTransformation;
      renderer.alpha = this.mAlpha * parentRenderer.alpha;
      renderer.blendMode = this.blendMode === BlendMode.AUTO ? parentRenderer.blendMode : this.blendMode;
      renderer.visible = this.mVisible;

      this.mDirty ^= DirtyFlag.RENDER;
    }

    if (this.mDirty & DirtyFlag.RENDER_CACHE) {
      renderer.text = this.text;
      renderer.style = this.mStyle;
      renderer.multiline = this.mMultiline;
      renderer.lineHeight = this.mLineHeight;
      renderer.align = this.mAlign;
      renderer.fieldWidth = this.mFieldWidth;
      renderer.fieldHeight = this.mFieldHeight;
      renderer.autoSize = this.mAutoSize;
      renderer.bounds = this.onGetLocalBounds();
      renderer.lineBounds = this.mLineBounds;

      this.mDirty ^= DirtyFlag.RENDER_CACHE;
    }

    renderer.dirty = oldDirty;

    return driver.registerRenderer(renderer);
  }

  /**
   * @protected
   * @override
   * @ignore
   * @param {Rectangle=} outRect
   *
   * @return {Rectangle}
   */
  onGetLocalBounds(outRect = undefined) {
    //outRect = outRect || new Rectangle();

    if (this.mDirty & DirtyFlag.RENDER_CACHE)
      this.mLineBounds = TextMetrics.measure(this.text, this.mStyle, this.mLineHeight, this.mBounds);

    if (this.mAutoSize === false) {
      outRect.width = this.mFieldWidth;
      outRect.height = this.mFieldHeight;
    }

    if (outRect != null) {
      this.mBounds.copyTo(outRect);
      return outRect;
    }

    return this.mBounds;
  }

  /**
   * @param {boolean} value
   * @ignore
   *
   * @return {void}
   */
  set multiline(value) {
    this.mMultiline = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set lineHeight(value) {
    this.mLineHeight = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
   * @param {number} value
   * @ignore
   *
   * @return {void}
   */
  set size(value) {
    if (this.mStyle.size === value)
      return;

    this.mStyle.size = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
   * @param {string} value
   * @ignore
   *
   * @return {void}
   */
  set font(value) {
    if (this.mStyle.name === value)
      return;

    this.mStyle.name = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
   * @param {number} value
   * @ignore
   *
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
   *
   * @param {TextInfo.FontStyle} value
   * @ignore
   *
   * @return {void}
   */
  set style(value) {
    if (this.mStyle.style === value)
      return;

    this.mStyle.style = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
   * @param {TextInfo.FontWeight} value
   * @ignore
   *
   * @return {void}
   */
  set weight(value) {
    if (this.mStyle.weight === value)
      return;

    this.mStyle.weight = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Specifies the horizontal alignment left | center | right
   *
   * @return {TextInfo.FontAlign}
   */
  get align() {
    return this.mAlign;
  }

  /**
   * @param {TextInfo.FontAlign} value
   * @ignore
   *
   * @return {void}
   */
  set align(value) {
    if (this.mAlign === value)
      return;

    this.mAlign = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Specifies stroke color as hexadecimal number eg 0xff0000 (total red)
   * @return {number}
   */
  get strokeColor() {
    return this.mStyle.strokeColor;
  }

  /**
   * @param {number} value
   * @ignore
   *
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
   * Note: stroke works like filter meaning that position of the text will not be adjusted and bounds will be the same.
   * 
   * @return {number} 
   */
  get strokeThickness() {
    return this.mStyle.strokeThickness;
  }

  /**
   * @param {number} value
   * @ignore
   *
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
   * @param {number} value
   * @ignore
   *
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
   * @param {number} value
   * @ignore
   *
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
   * @param {string} value
   * @ignore
   *
   * @return {void}
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
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
   * @param {boolean} value
   * @ignore
   *
   * @return {void}
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }
}

TextField.__cache = null;