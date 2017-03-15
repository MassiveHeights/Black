/* @echo EXPORT */
class TextInfo {
  /**
   * @param  {string=} name = 'sans-serif' description
   * @param  {number=} color = '0x000000' description
   * @param  {number=} size = '14' description
   * @param  {TextInfo.FontStyle=} style = 'normal' description
   * @param  {TextInfo.FontWeight=} weight = '400' description
   * @param  {TextInfo.FontAlign=} align = 'left' description
   * @param  {number=} strokeThickness = '0' description
   * @param  {number=} strokeColor = '0xffffff' description
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
