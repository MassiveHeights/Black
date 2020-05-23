import { DisplayObject } from "../DisplayObject";
import { Rectangle } from "../../geom/Rectangle";
import { TextStyle } from "./TextStyle";
import { Black } from "../../Black";
import { DirtyFlag } from "../../core/DirtyFlag";
import { Debug } from "../../core/Debug";
import { FontStyle } from "./styles/FontStyle";
import { FontWeight } from "./styles/FontWeight";
import { FontVerticalAlign } from "./styles/FontVerticalAlign";
import { FontAlign } from "./styles/FontAlign";
import { TextMetricsEx } from "./TextMetrics";
import { Message } from "../../messages/Message";

/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @fires TextField#change
 * @extends black-engine~DisplayObject
 */
export class TextField extends DisplayObject {
  /**
   * Creates new instance of TextField
   * 
   * @param {string=} [text=''] Text to be displayed inside this text field
   * @param  {string=} family                                             Font name
   * @param  {number=} [color=0x0]                                        Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14]                                          Text size
   * @param  {black-engine~FontStyle=} [style=black-engine~FontStyle.NORMAL]    Text style eg italic
   * @param  {black-engine~FontWeight=} [weight=black-engine~FontWeight.NORMAL] Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {number=} [strokeThickness=0]                                Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff]                             Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(text = '', family = 'sans-serif', color = 0x000000, size = 14, style = FontStyle.NORMAL, weight = FontWeight.NORMAL, strokeThickness = 0, strokeColor = 0xffffff) {
    super();

    /** 
     * @private 
     * @type {string} 
     */
    this.mText = text;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
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
     * @type {black-engine~TextStyle} 
     */
    this.mDefaultStyle = new TextStyle(family, color, size, style, weight, strokeThickness, strokeColor);

    /** 
     * @private 
     * @type {Object.<string,black-engine~TextStyle>} 
     */
    this.mStyles = {};

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mAutoSize = true;

    /** 
     * @private 
     * @type {black-engine~FontAlign} 
     */
    this.mAlign = FontAlign.LEFT;

    /** 
     * @private 
     * @type {black-engine~FontVerticalAlign} 
     */
    this.mVerticalAlign = FontVerticalAlign.MIDDLE;

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
     * @type {black-engine~Rectangle} 
     */
    this.mTextBounds = new Rectangle();

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
     * @type {black-engine~Rectangle} 
     */
    this.mPadding = new Rectangle(0, 0, 0, 0);

    /** 
     * @private 
     * @type {black-engine~TextMetricsData|null} 
     */
    this.mMetrics = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mHighQuality = false;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Text', this);
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

      for (let key in /** @type {!Object} */(this.mStyles)) {
        styles.push(this.mStyles[key]);
      }

      this.mMetrics = TextMetricsEx.measure(text, this.mLineHeight, ...styles);
      this.mTextBounds.copyFrom(this.mMetrics.bounds);
    }

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
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

    return outRect;
  }

  /**
   * Adds or updates given text style by given tag name.
   * 
   * @param {string} name 
   * @param {black-engine~TextStyle} style 
   */
  setStyle(name, style) {
    Debug.assert(name !== 'def', `Please use 'setDefaultStyle' instead.`);
    style.name = name;

    this.mStyles[name] = style;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Updates default text style with a given one.
   * 
   * @param {black-engine~TextStyle} style 
   */
  setDefaultStyle(style) {
    this.mDefaultStyle = style;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Removes style by given name.
   * 
   * @param {string} name 
   */
  removeStyle(name) {
    delete this.mStyles[name];

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Returns text style by given name or null if not found.
   * 
   * @param {string} name 
   * @return {black-engine~TextStyle} 
   */
  getStyle(name) {
    return this.mStyles.hasOwnProperty(name) ? this.mStyles[name] : null;
  }

  /**
   * Returns an array of all not default styles.
   * 
   * @return {Array<black-engine~TextStyle>} 
   */
  getAllStyles() {
    let styles = [];
    for (let s in this.mStyles)
      styles.push(this.mStyles[s]);
    return styles;
  }

  /**
   * Returns default text style.
   */
  getDefaultStyle(name) {
    return this.mDefaultStyle;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set multiline(value) {
    this.mMultiline = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
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
   * @return {void}
   */
  set lineHeight(value) {
    this.mLineHeight = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
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
   * @param {number} value
   * @return {void}
   */
  set size(value) {
    if (this.mDefaultStyle.size === value)
      return;

    this.mDefaultStyle.size = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
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
   * @param {string} value
   * @return {void}
   */
  set font(value) {
    if (this.mDefaultStyle.family === value)
      return;

    this.mDefaultStyle.family = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies text color as hexadecimal number eg 0xff0000 (total red).
   *
   * @return {number}
   */
  get textColor() {
    return this.mDefaultStyle.color;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set textColor(value) {
    if (this.mDefaultStyle.color === value)
      return;

    this.mDefaultStyle.color = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Gets/sets text alpha in range [0..1].
   * NOTE: This property will affect shadow alpha.
   *
   * @return {number}
   */
  get textAlpha() {
    return this.mDefaultStyle.alpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set textAlpha(value) {
    if (this.mDefaultStyle.alpha === value)
      return;

    this.mDefaultStyle.alpha = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Get/Set text style.
   *
   * @return {black-engine~FontStyle}
   */
  get fontStyle() {
    return this.mDefaultStyle.style;
  }

  /**
   * @param {black-engine~FontStyle} value
   * @return {void}
   */
  set fontStyle(value) {
    if (this.mDefaultStyle.style === value)
      return;

    this.mDefaultStyle.style = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies the font thick. The value is set from 100 to 900 in increments of 100.
   *
   * @return {black-engine~FontWeight}
   */
  get weight() {
    return this.mDefaultStyle.weight;
  }

  /**
   * @param {black-engine~FontWeight} value
   * @return {void}
   */
  set weight(value) {
    if (this.mDefaultStyle.weight === value)
      return;

    this.mDefaultStyle.weight = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies the horizontal alignment of the text (left | center | right).
   *
   * @return {black-engine~FontAlign}
   */
  get align() {
    return this.mAlign;
  }

  /**
   * @param {black-engine~FontAlign} value
   * @return {void}
   */
  set align(value) {
    if (this.mAlign === value)
      return;

    this.mAlign = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies the vertical alignment of the text (top | middle | bottom).
   *
   * @return {black-engine~FontVerticalAlign}
   */
  get vAlign() {
    return this.mVerticalAlign;
  }

  /**
   * @param {black-engine~FontVerticalAlign} value
   * @return {void}
   */
  set vAlign(value) {
    if (this.mVerticalAlign === value)
      return;

    this.mVerticalAlign = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies stroke color as hexadecimal number eg 0xff0000 (total red)
   * @return {number}
   */
  get strokeColor() {
    return this.mDefaultStyle.strokeColor;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set strokeColor(value) {
    if (this.mDefaultStyle.strokeColor === value)
      return;

    this.mDefaultStyle.strokeColor = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets  stroke alpha in range [0..1].
   * @return {number}
   */
  get strokeAlpha() {
    return this.mDefaultStyle.strokeAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set strokeAlpha(value) {
    if (this.mDefaultStyle.strokeAlpha === value)
      return;

    this.mDefaultStyle.strokeAlpha = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
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
   * @param {number} value
   * @return {void}
   */
  set strokeThickness(value) {
    if (value === this.mDefaultStyle.strokeThickness)
      return;

    this.mDefaultStyle.strokeThickness = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
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
   * @return {void}
   */
  set fieldWidth(value) {
    if (value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
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
   * @return {void}
   */
  set fieldHeight(value) {
    if (value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Text to be displayed inside this text field.
   * @return {string}
   */
  get text() {
    return this.mText;
  }

  /**
   * @param {string} value
   * @return {void}
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();

    /**
     * Posts every time text has been changed.
     * @event TextField#change
     */
    this.post(Message.CHANGE);
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
   * @return {void}
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * An extra padding. Also useful for bad prepared fonts.
   *
   * @return {black-engine~Rectangle}
   */
  get padding() {
    return this.mPadding;
  }

  /**
   * @param {black-engine~Rectangle} value
   * @return {void}
   */
  set padding(value) {
    this.mPadding = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Gets sets whenever to drop shadow or not.
   * 
   * @return {boolean} 
   */
  get dropShadow() {
    return this.mDefaultStyle.dropShadow;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set dropShadow(value) {
    if (value === this.mDefaultStyle.dropShadow)
      return;

    this.mDefaultStyle.dropShadow = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Gets/sets the color of the shadow.
   * 
   * @return {number} 
   */
  get shadowColor() {
    return this.mDefaultStyle.shadowColor;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowColor(value) {
    if (value === this.mDefaultStyle.shadowColor)
      return;

    this.mDefaultStyle.shadowColor = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets alpha component of the shadows.
   * 
   * @return {number} 
   */
  get shadowAlpha() {
    return this.mDefaultStyle.shadowAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowAlpha(value) {
    if (value === this.mDefaultStyle.shadowAlpha)
      return;

    this.mDefaultStyle.shadowAlpha = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets the shadow blur radius.
   * 
   * @return {number} 
   */
  get shadowBlur() {
    return this.mDefaultStyle.shadowBlur;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowBlur(value) {
    if (value === this.mDefaultStyle.shadowBlur)
      return;

    this.mDefaultStyle.shadowBlur = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets shadow distance on x axis.
   * 
   * @return {number} 
   */
  get shadowDistanceX() {
    return this.mDefaultStyle.shadowDistanceX;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowDistanceX(value) {
    if (value === this.mDefaultStyle.shadowDistanceX)
      return;

    this.mDefaultStyle.shadowDistanceX = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets shadow distance on y axis.
   * 
   * @return {number} 
   */
  get shadowDistanceY() {
    return this.mDefaultStyle.shadowDistanceY;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowDistanceY(value) {
    if (value === this.mDefaultStyle.shadowDistanceY)
      return;

    this.mDefaultStyle.shadowDistanceY = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets render quality of this text field. False by default.
   * When true font will respect object's scale and device pixel ratio. The downside is it may cause font shaking when animating.
   * 
   * @returns {boolean}
   */
  get highQuality() {
    return this.mHighQuality;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set highQuality(value) {
    this.mHighQuality = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }
}
