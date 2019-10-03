import { VectorScatterBase } from "./VectorScatterBase";

/**
 * A number scatter for defining a range in a circular shape.
 *
 * @cat scatters
 * @extends black-engine~VectorScatterBase
 */
export class RadialScatter extends VectorScatterBase {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number} x The center of a circle along x-axis.
   * @param {number} y The center of a circle along y-axis.
   * @param {number} minRadius The min radius value.
   * @param {number} [maxRadius=null] The max radius value.
   */
  constructor(x = 0, y = 0, minRadius = 0, maxRadius = null) {
    super();

    /**
     * A min value along x-axis.
     * 
     * @type {number}
     */
    this.x = x;

    /**
     * A min value along y-axis.
     * 
     * @type {number}
     */
    this.y = y;

    /**
     * A max value along x-axis.
     * 
     * @type {number}
     */
    this.minRadius = minRadius;

    /**
     * A max value along y-axis.
     * 
     * @type {number}
     */
    this.maxRadius = maxRadius === null ? minRadius : maxRadius;
  }

  /**
   * Returns a random Vector object at given position within a range specified in the constructor.
   *
   * @override
   * @return {black-engine~Vector} Vector object with random values withing defined range.
   */
  getValue() {
    return this.getValueAt(Math.random());
  }

  /**
   * Returns a Vector object at given position.
   *
   * @override
   * @param {number} t The position.
   * @return {black-engine~Vector} Vector object representing values in a range at given position.
   */
  getValueAt(t) {
    const r = this.minRadius + t * (this.maxRadius - this.minRadius);

    const angle = Math.random() * 2 * Math.PI; // MathEx.PI2?
    const rSq = r * r;
    const rx = this.x + (Math.sqrt(rSq) * Math.cos(angle));
    const ry = this.y + (Math.sqrt(rSq) * Math.sin(angle));

    this.value.x = rx;
    this.value.y = ry;

    return this.value;
  }
}
