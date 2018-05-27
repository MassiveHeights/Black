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

    // local to body
    this.mLocalCenter = new Vector();
    this.mLocalMin = new Vector();
    this.mLocalMax = new Vector();

    // global
    this.mRadius = 0;
    this.mCenter = new Vector();
    this.mMin = new Vector();
    this.mMax = new Vector();

    this.set(x, y, radius);
  }

  set(x, y, radius) {
    this.mCircle.set(x, y, radius);
    this.mChanged = true;
  }

  // This method calls from arcade fixed update
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

      const vec = Vector.pool.get();
      transform.transformVector(vec.set(circle.x, circle.y), localCenter);
      Vector.pool.release(vec);

      this.mRadius = circle.r * scale;
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
}