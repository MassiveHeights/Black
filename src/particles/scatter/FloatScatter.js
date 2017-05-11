/* @echo EXPORT */
class FloatScatter extends Scatter {
  constructor(min, max = undefined, ease = null) {
    super();

    // NOTE: dont make us @private @member
    this.min = min;
    this.max = max == null ? min : max;
    
    this.ease = ease;
  }


  /**
   * getValue
   *
   * @return {number}
   */
  getValue() {
    return Math.random() * (this.max - this.min) + this.min;
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

    return this.min + t * (this.max - this.min);
  }
}
