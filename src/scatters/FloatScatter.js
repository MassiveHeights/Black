/**
 * A number scatter for defining a range in 1D space.
 *
 * @cat scatters
 * @extends Scatter
 */
/* @echo EXPORT */
class FloatScatter extends Scatter {
  /**
   * Creates new FloatScatter instance.
   *
   * @param {number}      min             The min value along x-axis.
   * @param {number}      [max=undefined] The max value along x-axis.
   * @param {?function(number):number} [ease=null]     Easing function.
   */
  constructor(min, max = NaN, ease = null) {
    super();

    /**
     * A min value.
     * @type {number}
     */
    this.min = min;

    /**
     * A max value.
     * @type {number}
     */
    this.max = isNaN(max) ? min : max;

    /**
     * Optional easing function.
     * @type {?function(number):number}
     */
    this.ease = ease;

    /**
     * Cached last value of `getValueAt` result.
     * @readonly
     * @type {number}
     */
    this.value = 0;
  }

  /**
   * Returns value at given position within defined range.
   *
   * @override
   * @param {number} t The position.
   * @return {number} Number at given position.
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value = this.min + t * (this.max - this.min);
    return this.value;
  }

  /**
   * Creates new FloatScatter from a set of numbers.
   *
   * @param {...number|FloatScatter} values Set of values.
   * @returns {FloatScatter}
   */
  static fromObject(...values) {
    if (values[0] instanceof FloatScatter)
      return /** @type {FloatScatter} */ (values[0]);
    
    return new FloatScatter(...values);
  }
}
