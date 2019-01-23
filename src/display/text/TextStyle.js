/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */
/* @echo EXPORT */
class TextStyle {
  /**
   * Creates instance of TextStyle.   
   * @param  {string=} family                                             Font name
   * @param  {number=} [color=0x0]                                        Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14]                                          Text size
   * @param  {TextStyle.FontStyle=} [style=TextStyle.FontStyle.NORMAL]    Text style eg italic
   * @param  {TextStyle.FontWeight=} [weight=TextStyle.FontWeight.NORMAL] Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {number=} [strokeThickness=0]                                Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff]                             Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(family = 'sans-serif', color = 0x000000, size = 14, style = TextStyle.FontStyle.NORMAL, weight = TextStyle.FontWeight.NORMAL, strokeThickness = 0, strokeColor = 0xffffff) {
    /** @type {string} */
    this.name = 'def';

    /** @type {string} */
    this.family = family;

    /** @type {number} */
    this.size = size;

    /** @type {number} */
    this.color = color;

    /** @type {TextStyle.FontStyle} */
    this.style = style;

    /** @type {TextStyle.FontWeight} */
    this.weight = weight;

    /** @type {number} */
    this.strokeThickness = strokeThickness;

    /** @type {number} */
    this.strokeColor = strokeColor;

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
}

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextStyle.FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextStyle.FontWeight = {
  NORMAL: '400',
  BOLD: '700'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextStyle.FontAlign = {
  NONE: 'none',
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextStyle.FontVerticalAlign = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom'
};

/** 
 * @static 
 * @readonly 
 * @type {TextStyle} 
 */
TextStyle.default = new TextStyle('sans-serif', 0x0, 14, TextStyle.FontStyle.NORMAL, TextStyle.FontWeight.NORMAL, 0, 0x0);