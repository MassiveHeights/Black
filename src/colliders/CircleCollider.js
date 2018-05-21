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

    /** @private @type {number} */
    this.mX = x;

    /** @private @type {number} */
    this.mY = y;

    /** @private @type {number} */
    this.mRadius = radius;

    /** @private @type {Circle} */
    this.mCircle = new Circle(x, y, radius);


    this.localPosition = new Vector();
    this.localRadius = 0;

    this.position = new Vector();
    this.radius = 0;
    this.mChanged = false;

    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;

    this.set(x, y, radius);
  }

  set(x, y, radius) {
    this.localPosition.set(x, y);
    this.localRadius = radius;
    this.mChanged = true;
  }

  refresh(transform) {
    const position = this.position;
    const scale = Math.sqrt(transform.data[0] * transform.data[0] + transform.data[1] * transform.data[1]);
    const radius = this.localRadius * scale;
    transform.transformVector(this.localPosition, position);

    this.minX = position.x - radius;
    this.minY = position.y - radius;
    this.maxX = position.x + radius;
    this.maxY = position.y + radius;
    this.radius = radius;
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    return (this.gameObject != null && localPosition.distance(point) <= this.localRadius);
  }
}