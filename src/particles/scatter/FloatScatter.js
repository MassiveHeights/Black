/* @echo EXPORT */
class FloatScatter extends Scatter {
  constructor(min, max = undefined, ease = null) {
    super();

    this.mMin = min;
    this.mMax = max == null ? min : max;
    this.ease = ease;
  }


  /**
   * getValue
   *
   * @return {number}
   */
  getValue() {
    return Math.random() * (this.mMax - this.mMin) + this.mMin;
  }


  /**
   * getValueAt
   *
   * @param {number} t
   *
   * @return {number}
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    return this.mMin + t * (this.mMax - this.mMin);
  }
}
