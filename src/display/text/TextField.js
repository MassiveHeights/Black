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
     * @type {boolean}
     */
    this.mNeedInvalidate = true;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mCacheBounds = new Rectangle();

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

    this.__validate(this.mCacheBounds);
  }

  /**
   * @ignore
   * @override
   * @protected
   * @param {VideoNullDriver} video
   * @param {number} time
   * @param {number} parentAlpha
   * @param {string} parentBlendMode
   *
   * @return {void}
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    if (this.mAlpha <= 0 || this.mVisible === false)
      return;

    this.__validate(this.mCacheBounds);

    let tmpBlendMode = BlendMode.AUTO;

    video.save(this);
    video.setTransform(this.worldTransformation);
    video.globalAlpha = parentAlpha * this.mAlpha;
    video.globalBlendMode = tmpBlendMode = this.blendMode === BlendMode.AUTO ? parentBlendMode : this.blendMode;

    video.drawText(this.mText, this.mStyle, this.mCacheBounds, this.mTextWidth, this.mTextHeight);
    video.restore();

    super.__render(video, time, parentAlpha * this.mAlpha, tmpBlendMode);
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
    outRect = outRect || new Rectangle();
    return this.__validate(outRect);
  }

  /**
   * @private
   * @ignore
   * @param {Rectangle} outRect
   *
   * @return {Rectangle}
   */
  __validate(outRect) {
    let strokeCorrection = 0;
    if (this.mNeedInvalidate === false)
      return outRect.set(strokeCorrection, strokeCorrection, this.mFieldWidth, this.mFieldHeight);

    let driver = Black.instance.video;
    let vSize = driver.measureText(this.mText, this.mStyle);
    this.mTextWidth = vSize.x;
    this.mTextHeight = vSize.y;

    if (this.mAutoSize) {
      this.mFieldWidth = this.mTextWidth;
      this.mFieldHeight = this.mTextHeight;
    }

    return outRect.set(strokeCorrection-this.mPivotX, strokeCorrection-this.mPivotY, this.mFieldWidth, this.mFieldHeight);
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
    this.mStyle.size = value;
    this.mNeedInvalidate = true;
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
    this.mStyle.name = value;
    this.mNeedInvalidate = true;
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
    this.mStyle.color = value;
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
    this.mStyle.style = value;
    this.mNeedInvalidate = true;
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
    this.mStyle.weight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * Specifies the horizontal alignment left | center | right
   *
   * @return {TextInfo.FontAlign}
   */
  get align() {
    return this.mStyle.align;
  }

  /**
   * @param {TextInfo.FontAlign} value
   * @ignore
   *
   * @return {void}
   */
  set align(value) {
    this.mStyle.align = value;
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
    this.mStyle.strokeColor = value;
  }

  /**
   * Specifies the thickness of the stroke. 0 means that no stroke
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
    this.mNeedInvalidate = true;
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
    if (this.mAutoSize || value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;
    this.mNeedInvalidate = true;
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
    if (this.mAutoSize || value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;
    this.mNeedInvalidate = true;
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
    this.mNeedInvalidate = true;
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
    this.mNeedInvalidate = true;
  }
}
