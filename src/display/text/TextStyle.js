import { FontStyle } from "./styles/FontStyle";
import { FontWeight } from "./styles/FontWeight";

/**
 * @private
 * @ignore
 * @type {TextStyle|null}
 */
let defaultStyle = null;

/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */
export class TextStyle {
  /**
   * Creates instance of TextStyle.
   * @param  {string=} family                                             Font name
   * @param  {number=} [color=0x0]                                        Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14]                                          Text size
   * @param  {black-engine~FontStyle=} [style=FontStyle.NORMAL]                        Text style eg italic
   * @param  {black-engine~FontWeight=} [weight=FontWeight.NORMAL]                     Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {number=} [strokeThickness=0]                                Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff]                             Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(family = 'sans-serif', color = 0x000000, size = 14, style = FontStyle.NORMAL, weight = FontWeight.NORMAL, strokeThickness = 0, strokeColor = 0xffffff) {
    /** @type {string} */
    this.name = 'def';

    /** @type {string} */
    this.family = family;

    /** @type {number} */
    this.size = size;

    /** @type {number} */
    this.color = color;

    /** @type {number} */
    this.alpha = 1;

    /** @type {black-engine~FontStyle} */
    this.style = style;

    /** @type {black-engine~FontWeight} */
    this.weight = weight;

    /** @type {number} */
    this.strokeThickness = strokeThickness;

    /** @type {number} */
    this.strokeColor = strokeColor;

    /** @type {number} */
    this.strokeAlpha = 1;

    /** @type {boolean} */
    this.dropShadow = false;

    /** @type {number} */
    this.shadowDistanceX = 0;

    /** @type {number} */
    this.shadowDistanceY = 0;

    /** @type {number} */
    this.shadowColor = 0x0;

    /** @type {number} */
    this.shadowAlpha = 1;

    /** @type {number} */
    this.shadowBlur = 0;
  }

  /**
   * @deprecated
   */
  clone(family = null, color = NaN, size = NaN, style = null, weight = null, strokeThickness = NaN, strokeColor = NaN) {
    let ret = new TextStyle();
    ret.family = family === null ? this.family : family;
    ret.size = isNaN(size) ? this.size : size;
    ret.color = isNaN(color) ? this.color : color;
    ret.style = style === null ? this.style : style;
    ret.weight = weight === null ? this.weight : weight;
    ret.strokeThickness = isNaN(strokeThickness) ? this.strokeThickness : strokeThickness;
    ret.strokeColor = isNaN(strokeColor) ? this.strokeColor : strokeColor;

    ret.dropShadow = this.dropShadow;
    ret.shadowAlpha = this.shadowAlpha;
    ret.shadowBlur = this.shadowBlur;
    ret.shadowColor = this.shadowColor;
    ret.shadowDistanceX = this.shadowDistanceX;
    ret.shadowDistanceY = this.shadowDistanceY;

    return ret;
  }

  /**
   * Returns default TextStyle instance.
   * 
   * @returns {black-engine~TextStyle}
   */
  static get default() {
    if (defaultStyle === null)
      defaultStyle = new TextStyle('sans-serif', 0x0, 14, FontStyle.NORMAL, FontWeight.NORMAL, 0, 0x0)

    return defaultStyle;
  }
}