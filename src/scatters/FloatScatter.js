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
   * @param {function(k)} [ease=null]     Easing function.
   */
  constructor(min, max = undefined, ease = null) {
    super();

    // NOTE: dont make us @private @member
    this.min = min;
    this.max = max == null ? min : max;

    this.ease = ease;
  }

  /**
   * Returns random number withing defined range.
   *
   * @override
   *
   * @return {number} Random number.
   */
  getValue() {
    return Math.random() * (this.max - this.min) + this.min;
  }

  /**
   * Returns value at given position within defined range.
   *
   * @override
   * @param {number} t The position.
   *
   * @return {number} Number at given position.
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    return this.min + t * (this.max - this.min);
  }
}
