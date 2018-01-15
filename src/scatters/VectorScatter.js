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
  constructor(minX, minY, maxX = null, maxY = null) {
    super();

    // NOTE: dont make us @private @member
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX || minX;
    this.maxY = maxY || minY;

    this.value = new Vector();
  }

  /**
  * Returns a random Vector object at given position within a range specified
  * in the constructor.
  * @override
  *
  * @return {Vector} Vector object with random values withing defined range.
  */
  getValue() {
    this.value.x = Math.random() * (this.maxX - this.minX) + this.minX;
    this.value.y = Math.random() * (this.maxY - this.minY) + this.minY;
    return this.value;
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
    this.value.x = this.minX + t * (this.maxX - this.minX);
    this.value.y = this.minY + t * (this.maxY - this.minY);
    return this.value;
  }

  static fromObject(...values) {
    if (values[0] instanceof Scatter)
      return values[0];

    return new VectorScatter(...values);
  }
}

/* @echo EXPORT */
class RadialVectorScatter extends VectorScatter {
  constructor(x, y, minRadius, maxRadius = null) {
    super(x, y, minRadius, maxRadius);

    // minX = x,  minY = y, maxX = minRadius,  maxY = maxRadius
  }

  getValue() {
    return this.getValueAt(Math.random());
  }

  getValueAt(t) {
    // pick random radius
    const r = this.maxX + t * (this.maxY - this.maxX);

    const angle = Math.random() * 2 * Math.PI; // MathEx.PI2?
    const rSq = r * r;
    const rx = this.minX + (Math.sqrt(rSq) * Math.cos(angle));
    const ry = this.minY + (Math.sqrt(rSq) * Math.sin(angle));

    this.value.x = rx;
    this.value.y = ry;

    return this.value;
  }
}
