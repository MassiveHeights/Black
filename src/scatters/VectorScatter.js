/**
 * A number scatter for defining a range in 2D space.
 *
 * @cat scatters
 * @extends Scatter
 */
/* @echo EXPORT */
class VectorScatter extends Scatter {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number} minX The min value along x-axis.
   * @param {number} minY The min value along y-axis.
   * @param {number=} [maxX=NaN] The max value along x-axis.
   * @param {number=} [maxY=NaN] The max value along y-axis.
   */
  constructor(minX, minY, maxX = NaN, maxY = NaN) {
    super();

    /**
     * A min value along x-axis.
     * @type {number}
     */
    this.minX = minX;

    /**
     * A min value along y-axis.
     * @type {number}
     */
    this.minY = minY;

    /**
     * A max value along x-axis.
     * @type {number}
     */
    this.maxX = maxX || minX;

    /**
     * A max value along y-axis.
     * @type {number}
     */
    this.maxY = maxY || minY;

    /**
     * Cached last value of `getValueAt` result.
     * @readonly
     * @type {Vector}
     */
    this.value = new Vector();
  }

  /**
  * Returns a random Vector object at given position within a range specified in the constructor.
   *
  * @override
  * @return {Vector} Vector object with random values withing defined range.
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
   * @return {Vector} Vector object representing values in a range at given position.
   */
  getValueAt(t) {
    this.value.x = this.minX + t * (this.maxX - this.minX);
    this.value.y = this.minY + t * (this.maxY - this.minY);
    return this.value;
  }

  /**
   * Creates new FloatScatter from a set of numbers.
   *
   * @param {...number|VectorScatter} values Set of values.
   * @returns {VectorScatter}
   */
  static fromObject(...values) {
    if (values[0] instanceof Scatter)
      return /** @type {VectorScatter} */ (values[0]);

    return new VectorScatter(...values);
  }
}