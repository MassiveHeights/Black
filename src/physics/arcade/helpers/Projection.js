/**
 * Projection is used to calculate ranges for collision test with Separate Axis Theorem.
 *
 * @cat physics.arcade.helpers
 */
/* @echo EXPORT */
class Projection {

  /**
   * Creates new instance of Projection.
   */
  constructor() {

    /** @private @type {Vector|null} Box normal */
    this.axis = null;

    /** @private @type {Array<Vector>|null} Box a vertices */
    this.verticesA = null;

    /** @private @type {Array<Vector>|null} Box b vertices */
    this.verticesB = null;

    /** @private @type {Range} Range from project box a vertices to axis */
    this.rangeA = new Range();

    /** @private @type {Range} Range from project box b vertices to axis */
    this.rangeB = new Range();

    /** @private @type {Number} body a to body b offset projected on the axis */
    this.offset = 0;
  }

  /**
   * Setter
   *
   * @internal
   *
   * @param {Array<Vector>} verticesA box a points
   * @param {Array<Vector>} verticesB box b points
   * @param {Vector}        axis One from box normals
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
   * @internal
   *
   * return {void}
   */
  refresh() {
    Projection.project(this.verticesA, this.axis, this.rangeA);
    Projection.project(this.verticesB, this.axis, this.rangeB);
  }

  /**
   * Recalculates range.
   *
   * @internal
   *
   * return {void}
   */
  static project(points, axis, range) {
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
class Range {
  /**
   * Creates new instance of Range.
   */
  constructor() {

    /** @public @type {Number} Min value */
    this.min = 0;

    /** @public @type {Number} Max value */
    this.max = 0;
  }
}
