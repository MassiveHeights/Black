/**
 * Collider with circle shape.
 *
 * @cat colliders
 * @extends Component
 */

/* @echo EXPORT */
class CircleCollider extends Collider {

  /**
   * Creates new instance of CircleCollider.
   *
   * @param {number} x      Center coordinate within X-axis.
   * @param {number} y      Center coordinate within Y-axis.
   * @param {number} radius Radius of the circle.
   */
  constructor(x, y, radius) {
    super();

    /** @private @type {Circle} */
    this.mCircle = new Circle(x, y, radius);  // local to sprite

    /** @private @type {Vector} Local to rigid body center */
    this.mLocalCenter = new Vector();

    /** @private @type {Vector} Local to rigid body min x and y vertex */
    this.mLocalMin = new Vector();

    /** @private @type {Vector} Local to rigid body max x and y vertex */
    this.mLocalMax = new Vector();

    /** @private @type {Number} Global in stage coordinates radius */
    this.mRadius = 0;

    /** @private @type {Number} Global in stage coordinates center */
    this.mCenter = new Vector();

    /** @private @type {Vector} Global in stage coordinates min x and y vertex */
    this.mMin = new Vector();

    /** @private @type {Vector} Global in stage coordinates max x and y vertex */
    this.mMax = new Vector();

    this.set(x, y, radius);
  }

  /**
   * Setter
   *
   * @public
   * @param {number} x      Center coordinate within X-axis.
   * @param {number} y      Center coordinate within Y-axis.
   * @param {number} radius Radius of the circle.
   */
  set(x, y, radius) {
    this.mCircle.set(x, y, radius);
    this.mChanged = true;
  }

  /**
   * Updates min, max, center, radius of this collider, to prepare to collision test
   *
   * @public
   * @param {Matrix} transform Game object world transformation with zero position.
   * @param {Vector} position  Rigid body position.
   */
  refresh(transform, position) {
    const localMin = this.mLocalMin;
    const localMax = this.mLocalMax;
    const min = this.mMin;
    const max = this.mMax;
    const localCenter = this.mLocalCenter;
    const center = this.mCenter;

    if (this.mChanged) {
      const circle = this.mCircle;
      const scale = Math.sqrt(transform.data[0] * transform.data[0] + transform.data[1] * transform.data[1]);
      const radius = circle.r * scale;

      transform.transformXY(circle.x, circle.y, localCenter);
      this.mRadius = radius;

      localMin.x = localCenter.x - radius;
      localMin.y = localCenter.y - radius;
      localMax.x = localCenter.x + radius;
      localMax.y = localCenter.y + radius;
    }

    min.x = localMin.x + position.x;
    min.y = localMin.y + position.y;
    max.x = localMax.x + position.x;
    max.y = localMax.y + position.y;

    center.x = localCenter.x + position.x;
    center.y = localCenter.y + position.y;
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    if (this.gameObject === null) {
      return false;
    }

    const circle = this.mCircle;
    const vec = Vector.pool.get();
    const distance = vec.set(circle.x, circle.y).distance(point);
    Vector.pool.release(vec);

    return distance <= circle.r;
  }

  /**
   * Draw this
   *
   * @public
   * @param {Graphics} graphics Drawing place
   */
  debug(graphics) {
    graphics.circle(this.mCenter.x, this.mCenter.y, this.mRadius);
    graphics.stroke();
  }
}