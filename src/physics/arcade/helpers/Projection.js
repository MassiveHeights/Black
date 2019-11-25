/**
 * Projection is used to calculate ranges for collision test with Separate Axis Theorem.
 *
 * @cat physics.arcade.helpers
 */
export class Projection {
  /**
   * Creates new instance of Projection.
   */
  constructor() {

    /** 
     * @private 
     * @type {black-engine~Vector|null} Box normal 
     */
    this.axis = null;

    /** 
     * @private 
     * @type {Array<black-engine~Vector>|null} Box a vertices 
     */
    this.verticesA = null;

    /** 
     * @private 
     * @type {Array<black-engine~Vector>|null} Box b vertices 
     */
    this.verticesB = null;

    /** 
     * @private 
     * @type {black-engine~Range} Range from project box a vertices to axis 
     */
    this.rangeA = new Range();

    /** 
     * @private 
     * @type {black-engine~Range} Range from project box b vertices to axis 
     */
    this.rangeB = new Range();

    /** 
     * @private 
     * @type {number} body a to body b offset projected on the axis 
     */
    this.offset = 0;
  }

  /**
   * Setter
   *
   * @public
   *
   * @param {Array<black-engine~Vector>} verticesA box a points
   * @param {Array<black-engine~Vector>} verticesB box b points
   * @param {black-engine~Vector}        axis One from box normals
   *
   * return {void}
   */
  set(verticesA, verticesB, axis) {
    this.verticesA = verticesA;
    this.verticesB = verticesB;
    this.axis = axis;
    this.refresh();
  }

  /**
   * Recalculates the ranges.
   *
   * @public
   *
   * return {void}
   */
  refresh() {
    Projection.__project(this.verticesA, this.axis, this.rangeA);
    Projection.__project(this.verticesB, this.axis, this.rangeB);
  }

  /**
   * Recalculates range.
   *
   * @private
   *
   * return {void}
   */
  static __project(points, axis, range) {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;

    for (let i = 0, l = points.length; i < l; i++) {
      const dot = points[i].dot(axis);
      min = dot < min ? dot : min;
      max = dot > max ? dot : max;
    }

    range.min = min;
    range.max = max;
  }
}

/**
 * Simple range helper class.
 *
 * @cat physics.arcade.helpers
 */
export class Range {
  /**
   * Creates new instance of Range.
   */
  constructor() {

    /** 
     * Min value.
     * @public 
     * @type {number} 
     */
    this.min = 0;

    /** 
     * Max value.
     * @public 
     * @type {number} 
     */
    this.max = 0;
  }
}
