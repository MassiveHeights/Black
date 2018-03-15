/* @echo EXPORT */
class ColorScatter extends Scatter {
  
  constructor(color1, color2 = NaN, ease = null) {
    super();

    this.color1 = color1;
    this.color2 = isNaN(color2) ? color1 : color2;
    this.ease = ease;
    this.value = color1;
  }

  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value = this.color1 === this.color2 ? this.color1 : ColorHelper.lerpHSV(this.color1, this.color2, t);
    return this.value;
  }

  /**
   * Creates new ColorScatter from a set of numbers.
   *
   * @param {...number|ColorScatter} values Set of values.
   * @returns {ColorScatter}
   */
  static fromObject(...values) {
    if (values[0] instanceof ColorScatter)
      return /** @type {ColorScatter} */ (values[0]);
    
    return new ColorScatter(...values);
  }
}
