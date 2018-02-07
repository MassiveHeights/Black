/**
 * A number scatter for defining a range in a circular shape.
 *
 * @cat scatters
 * @extends VectorScatter
 */
/* @echo EXPORT */
class RadialScatter extends VectorScatter {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number} x The center of a circle along x-axis.
   * @param {number} y The center of a circle along y-axis.
   * @param {number} minRadius The min radius value.
   * @param {number} maxRadius The max radius value.
   */
  constructor(x, y, minRadius, maxRadius = NaN) {
    super(x, y, minRadius, maxRadius);
  }

  /**
   * Returns a random Vector object at given position within a range specified in the constructor.
   *
   * @override
   * @return {Vector} Vector object with random values withing defined range.
   */
  getValue() {
    return this.getValueAt(Math.random());
  }

  /**
   * Returns a Vector object at given position.
   *
   * @override
   * @param {number} t The position.
   * @return {Vector} Vector object representing values in a range at given position.
   */
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
