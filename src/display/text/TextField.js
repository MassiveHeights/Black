/* @echo EXPORT */
class TextField extends DisplayObject {
  /**
   * @param  {string=} text = ''            description
   * @param  {number=} size = 14        description
   * @param  {string=} name = "sans-serif" description
   * @param {TextInfo=} style
   */
  constructor(text = '', size = 14, name = 'sans-serif', style = undefined) {
    super();

    /** @type {string} */
    this.mText = text;

    /** @type {boolean} */
    this.mNeedInvalidate = true;

    /** @type {Rectangle} */
    this.mCacheBounds = new Rectangle();

    /** @type {number} */
    this.mFieldWidth = 0;

    /** @type {number} */
    this.mFieldHeight = 0;

    /** @type {number} */
    this.mTextWidth = 0;

    /** @type {number} */
    this.mTextHeight = 0;

    /** @type {TextInfo} */
    this.mStyle = style || new TextInfo();

    /** @type {string} */
    this.mStyle.name = name || style.name;

    /** @type {number} */
    this.mStyle.size = size || style.size;

    /** @type {boolean} */
    this.mAutoSize = true;

    this.__validate(this.mCacheBounds);
  }

  /**
   * __render - Description
   * @override
   * @param {VideoNullDriver} video           Description
   * @param {number} time            Description
   * @param {number} parentAlpha     Description
   * @param {string} parentBlendMode Description
   *
   * @return {void} Description
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
   * onGetLocalBounds - Description
   *
   * @protected @override
   * @param {Rectangle=} outRect Description
   *
   * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return this.__validate(outRect);
  }


  /**
   * __validate - Description
   *
   * @private
   * @param {Rectangle} outRect Description
   *
   * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
   */
  __validate(outRect) {
    let strokeCorrection = 0 - this.mStyle.strokeThickness * 0.5;
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

    this.mNeedInvalidate = false;
    return outRect.set(strokeCorrection, strokeCorrection, this.mFieldWidth, this.mFieldHeight);
  }


  /**
   * size - Description
   *
   * @public
   * @return {number} Description
   */
  get size() {
    return this.mStyle.size;
  }

  /**
   * size - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set size(value) {
    this.mStyle.size = value;
    this.mNeedInvalidate = true;
  }

  /**
   * font - Description
   *
   * @public
   * @return {string} Description
   */
  get font() {
      return this.mStyle.name;
    }
    /**
     * font - Description
     *
     * @param {string} value Description
     * @public
     *
     * @return {void} Description
     */

  set font(value) {
    this.mStyle.name = value;
    this.mNeedInvalidate = true;
  }

  /**
   * color - Description
   *
   * @public
   * @return {number} Description
   */
  get color() {
    return this.mStyle.color;
  }

  /**
   * color - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set color(value) {
    this.mStyle.color = value;
  }

  /**
   * style - Description
   *
   * @public
   * @return {TextInfo.FontStyle} Description
   */
  get style() {
    return this.mStyle.style;
  }

  /**
   * style - Description
   *
   * @param {TextInfo.FontStyle} value Description
   * @public
   *
   * @return {void} Description
   */
  set style(value) {
    this.mStyle.style = value;
    this.mNeedInvalidate = true;
  }

  /**
   * weight - Description
   *
   * @public
   * @return {TextInfo.FontWeight} Description
   */
  get weight() {
    return this.mStyle.weight;
  }

  /**
   * weight - Description
   *
   * @param {TextInfo.FontWeight} value Description
   * @public
   *
   * @return {void} Description
   */
  set weight(value) {
    this.mStyle.weight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * align - Description
   *
   * @public
   * @return {TextInfo.FontAlign} Description
   */
  get align() {
    return this.mStyle.align;
  }

  /**
   * align - Description
   *
   * @param {TextInfo.FontAlign} value Description
   * @public
   *
   * @return {void} Description
   */
  set align(value) {
    this.mStyle.align = value;
  }

  /**
   * strokeColor - Description
   *
   * @public
   * @return {number} Description
   */
  get strokeColor() {
    return this.mStyle.strokeColor;
  }

  /**
   * strokeColor - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set strokeColor(value) {
    this.mStyle.strokeColor = value;
  }

  /**
   * strokeThickness - Description
   *
   * @public
   * @return {number} Description
   */
  get strokeThickness() {
    return this.mStyle.strokeThickness;
  }

  //noinspection JSAnnotator
  /**
   * strokeThickness - Description
   * @public
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set strokeThickness(value) {
    if (value === this.mStyle.strokeThickness)
      return;

    this.mStyle.strokeThickness = value;
    this.mNeedInvalidate = true;
  }

  /**
   * fieldWidth - Description
   *
   * @public
   * @return {number} Description
   */
  get fieldWidth() {
    return this.mFieldWidth;
  }

  /**
   * fieldWidth - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set fieldWidth(value) {
    if (this.mAutoSize || value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;
    this.mNeedInvalidate = true;
  }

  /**
   * fieldHeight - Description
   *
   * @public
   * @return {number} Description
   */
  get fieldHeight() {
    return this.mFieldHeight;
  }


  /**
   * fieldHeight - Description
   *
   * @param {number} value Description
   * @public
   *
   * @return {void} Description
   */
  set fieldHeight(value) {
    if (this.mAutoSize || value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;
    this.mNeedInvalidate = true;
  }

  /**
   * @public text - Description
   *
   * @return {string} Description
   */
  get text() {
    return this.mText;
  }

  /**
   * text - Description
   *
   * @param {string} value Description
   * @public
   *
   * @return {void} Description
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;
    this.mNeedInvalidate = true;
  }

  /**
   * autoSize - Description
   *
   * @return {boolean} Description
   */
  get autoSize() {
    return this.mAutoSize;
  }

  /**
   * autoSize - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;
    this.mNeedInvalidate = true;
  }
}
