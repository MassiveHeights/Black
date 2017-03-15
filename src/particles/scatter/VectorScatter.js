/* @echo EXPORT */
class VectorScatter extends Scatter {
  constructor(minX, minY, maxX, maxY) {
    super();

    this.minX = minX;
    this.minY = minY;

    this.maxX = maxX;
    this.maxY = maxY;
  }


  /**
   * getValue
   *
   * @return {Vector}
   */
  getValue() {
    let outVector = new Vector();
    outVector.x = Math.random() * (this.maxX - this.minX) + this.minX;
    outVector.y = Math.random() * (this.maxY - this.minY) + this.minY;
    return outVector;
  }


  /**
   * getValueAt
   *
   * @param {number} t
   *
   * @return {Vector}
   */
  getValueAt(t) {
    let outVector = new Vector();
    outVector.x = this.minX + t * (this.maxX - this.minX);
    outVector.y = this.minY + t * (this.maxY - this.minY);
    return outVector;
  }
}
