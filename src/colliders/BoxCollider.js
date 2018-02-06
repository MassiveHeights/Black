/**
 * Collider with rectangle shape.
 *
 * @cat colliders
 * @extends Component
 */
/* @echo EXPORT */
class BoxCollider extends Collider {
  /**
   * Creates instance of BoxCollider.
   *
   * @param {number} x      X-coordinate.
   * @param {number} y      Y-coordinate.
   * @param {number} width  Rectangle width.
   * @param {number} height Rectangle height.
   */
  constructor(x, y, width, height) {
    super();

    /** @private @type {Rectangle} */
    this.mRect = new Rectangle(x, y, width, height);
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    return this.mRect.containsXY(point.x, point.y);
  }
}