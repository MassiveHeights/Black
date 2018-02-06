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
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    if (this.gameObject != null) { 
      let pos = new Vector(this.mX, this.mY);
      
      if (pos.distance(point) <= this.mRadius)
        return true;
    }

    return false;
  }
}