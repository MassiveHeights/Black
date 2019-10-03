import { FloatScatterBase } from "./FloatScatterBase";

/**
 * A number scatter for defining a range in 1D space.
 *
 * @cat scatters
 * @extends black-engine~FloatScatterBase
 */
export class FloatScatter extends FloatScatterBase {
  /**
   * Creates new FloatScatter instance.
   *
   * @param {number}                   [min=0]  The min value along x-axis.
   * @param {number}                   [max=null]  The max value along x-axis.
   * @param {?function(number):number} [ease=null] Easing function. If null linear function is used as default.
   */
  constructor(min = 0, max = null, ease = null) {
    super();

    /**
     * A min value.
     * 
     * @type {number}
     */
    this.min = min;

    /**
     * A max value.
     * 
     * @type {number}
     */
    this.max = max === null ? min : max;

    /**
     * Optional easing function.
     * 
     * @type {?function(number):number}
     */
    this.ease = ease;
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
   * Creates new FloatScatterBase from a set of numbers.
   *
   * @param {...number|black-engine~FloatScatterBase} values Set of values.
   * @returns {black-engine~FloatScatterBase}
   */
  static fromObject(...values) {
    if (values[0] instanceof FloatScatterBase)
      return /** @type {FloatScatterBase} */ (values[0]);

    return new FloatScatter(...values);
  }
}
