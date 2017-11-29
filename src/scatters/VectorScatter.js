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
   * @param {number} maxX The max value along x-axis.
   * @param {number} maxY The max value along y-axis.
   */
  constructor(minX, minY, maxX, maxY) {
    super();

    // NOTE: dont make us @private @member
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  /**
   * Returns a random Vector object at given position within a range specified
   * in the constructor.
   * @override
   *
   * @return {Vector} Vector object with random values withing defined range.
   */
  getValue() {
    let outVector = new Vector();
    outVector.x = Math.random() * (this.maxX - this.minX) + this.minX;
    outVector.y = Math.random() * (this.maxY - this.minY) + this.minY;
    return outVector;
  }

  /**
   * Returns a Vector object at given position.
   * @override
   *
   * @param {number} t The position.
   *
   * @return {Vector} Vector object representing values in a range at
   * given position.
   */
  getValueAt(t) {
    let outVector = new Vector();
    outVector.x = this.minX + t * (this.maxX - this.minX);
    outVector.y = this.minY + t * (this.maxY - this.minY);
    return outVector;
  }

  static fromObject(...values) {
    if (values[0] instanceof Scatter)
      return values[0];

    return new VectorScatter(...values);
  }
}
