/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */
/* @echo EXPORT */
class TextInfo {
  /**
   * @param  {string=} name Font name
   * @param  {number=} color = Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} size = Text size
   * @param  {TextInfo.FontStyle=} style = Text style eg italic
   * @param  {TextInfo.FontWeight=} weight = font thick. The value is set from 100 to 900 in increments of 100.
   * @param  {TextInfo.FontAlign=} align = horizontal alignment left | center | right
   * @param  {number=} strokeThickness = thickness of the stroke. 0 means that no stroke
   * @param  {number=} strokeColor = stroke color as hexadecimal number eg 0x00ff00 (total green)
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

    /** @type {TextInfo.FontAlign} */
    this.align = align;

    /** @type {number} */
    this.strokeThickness = strokeThickness;

    /** @type {number} */
    this.strokeColor = strokeColor;
  }
}

/**
 * @enum {string}
 */
TextInfo.FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic'
};

/**
 * @enum {string}
 */
TextInfo.FontWeight = {
  NORMAL: '400',
  BOLD: '700',
  SUPERBOLD: '800'
};

/**
 * @enum {string}
 */
TextInfo.FontAlign = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};
