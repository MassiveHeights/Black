import { ColorScatterBase } from "./ColorScatterBase";
import { ColorHelper } from "../utils/ColorHelper";

/**
 * A color scatter.
 *
 * @cat scatters
 * @extends black-engine~FloatScatterBase
 */
export class ColorScatter extends ColorScatterBase {
  /**
   * Creates new ColorScatter instance.
   * 
   * @param {number} [startColor=0]
   * @param {number} [endColor=null]
   * @param {?function(number):number} [ease=null] Easing function. If null linear function is used as default.
   */
  constructor(startColor, endColor = null, ease = null) {
    super();

    /**
     * Defines starting color
     * 
     * @type {number}
     */
    this.startColor = startColor;

    /**
     * Defines ending color
     * 
     * @type {number}
     */
    this.endColor = endColor === null ? startColor : endColor;

    /**
     * Optional easing function.
     * 
     * @type {number}
     */
    this.ease = ease;
  }

  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value = this.startColor === this.endColor ? this.startColor : ColorHelper.lerpHSV(this.startColor, this.endColor, t);

    return this.value;
  }

  /**
   * Creates new ColorScatterBase from a set of numbers.
   *
   * @param {...number|black-engine~ColorScatterBase} values Set of values.
   * @returns {black-engine~ColorScatterBase}
   */
  static fromObject(...values) {
    if (values[0] instanceof ColorScatterBase)
      return /** @type {ColorScatterBase} */ (values[0]);

    return new ColorScatter(...values);
  }
}
