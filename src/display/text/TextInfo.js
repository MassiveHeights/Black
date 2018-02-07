/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */
/* @echo EXPORT */
class TextInfo {
  /**
   * Creates instance of TextInfo.
   *
   * @param  {string=} name Font name
   * @param  {number=} [color=0x0] Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14] Text size
   * @param  {TextInfo.FontStyle=} [style=TextInfo.FontStyle.NORMAL] Text style eg italic
   * @param  {TextInfo.FontWeight=} [weight=TextInfo.FontWeight.NORMAL] Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {TextInfo.FontAlign=} [align=TextInfo.FontAlign.LEFT] Horizontal alignment left | center | right
   * @param  {number=} [strokeThickness=0] Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff] Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(name = 'sans-serif', color = 0x000000, size = 14, style = TextInfo.FontStyle.NORMAL, weight = TextInfo.FontWeight.NORMAL, align = TextInfo.FontAlign.LEFT, strokeThickness = 0, strokeColor = 0xffffff) {

    /** @type {string} */
    this.name = name;

    /** @type {number} */
    this.size = size;

    /** @type {number} */
    this.color = color;

    /** @type {TextInfo.FontStyle} */
    this.style = style;

    /** @type {TextInfo.FontWeight} */
    this.weight = weight;

    /** @type {number} */
    this.strokeThickness = strokeThickness;

    /** @type {number} */
    this.strokeColor = strokeColor;
  }
}

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextInfo.FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextInfo.FontWeight = {
  NORMAL: '400',
  BOLD: '700',
  SUPERBOLD: '800'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
TextInfo.FontAlign = {
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
TextInfo.FontVerticalAlign = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom'
};