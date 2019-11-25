import { VectorScatterBase } from "./VectorScatterBase";
import { Vector } from "../geom/Vector";

/**
 * A vector scatter for defining a range in 2D space.
 *
 * @cat scatters
 * @extends black-engine~VectorScatterBase
 */
export class VectorScatter extends VectorScatterBase {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number}  [minX=0]                     The min value along x-axis.
   * @param {number}  [minY=0]                     The min value along y-axis.
   * @param {number=} [maxX=null]                  The max value along x-axis.
   * @param {number=} [maxY=null]                  The max value along y-axis.
   * @param {?function(number):number} [ease=null] Easing function. If null linear function is used as default.
   */
  constructor(minX = 0, minY = 0, maxX = null, maxY = null, ease = null) {
    super();

    /**
     * A min value along x-axis.
     * 
     * @type {number}
     */
    this.minX = minX;

    /**
     * A min value along y-axis.
     * 
     * @type {number}
     */
    this.minY = minY;

    /**
     * A max value along x-axis.
     * 
     * @type {number}
     */
    this.maxX = maxX === null ? minX : maxX;

    /**
     * A max value along y-axis.
     * 
     * @type {number}
     */
    this.maxY = maxY === null ? minY : maxY;

    /**
     * Optional easing function.
     * 
     * @type {?function(Vector):Vector}
     */
    this.ease = ease;
  }

  /**
   * Returns a random Vector object at given position within a specified range.
   *
   * @override
   * @return {black-engine~Vector} Vector object with random values withing defined range.
   */
  getValue() {
    this.value.x = Math.random() * (this.maxX - this.minX) + this.minX;
    this.value.y = Math.random() * (this.maxY - this.minY) + this.minY;

    return this.value;
  }

  /**
   * Returns a Vector object at given position.
   *
   * @override
   * @param {number} t The position.
   * @return {black-engine~Vector} Vector object representing values in a range at given position.
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value.x = this.minX + t * (this.maxX - this.minX);
    this.value.y = this.minY + t * (this.maxY - this.minY);

    return this.value;
  }

  /**
   * Creates new VectorScatter from a set of numbers.
   *
   * @param {...number|black-engine~VectorScatterBase} values Set of values.
   * @returns {black-engine~VectorScatterBase}
   */
  static fromObject(...values) {
    if (values[0] instanceof VectorScatterBase)
      return /** @type {VectorScatterBase} */ (values[0]);

    return new VectorScatter(...values);
  }
}