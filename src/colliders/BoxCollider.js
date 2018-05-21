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

    const localPoints = [];
    const localNormals = [];
    const points = [];
    const normals = [];

    for (let i = 0; i < 4; i++) {
      localPoints.push(new Vector());
      points.push(new Vector());
      localNormals.push(new Vector());
      normals.push(new Vector());
    }

    localNormals[0].set(0, -1);
    localNormals[1].set(1, 0);
    localNormals[2].set(0, 1);
    localNormals[3].set(-1, 0);

    this.localRect = new Rectangle();
    this.localPoints = localPoints;
    this.localNormals = localNormals;
    this.points = points;
    this.normals = normals;
    this.center = new Vector();
    this.mChanged = true;

    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;

    this.set(x, y, width, height);
  }

  set(x, y, width, height) {
    this.localRect.set(x, y, width, height);
    this.mChanged = true;

    const localPoints = this.localPoints;
    localPoints[0].set(x, y);
    localPoints[1].set(x + width, y);
    localPoints[2].set(x + width, y + height);
    localPoints[3].set(x, y + height);
  }

  refresh(transform) {
    const localNormals = this.localNormals;
    const localPoints = this.localPoints;
    const normals = this.normals;
    const points = this.points;

    for (let i = 0; i < 4; i++) {
      transform.transformVector(localPoints[i], points[i]);
      transform.transformVector(localNormals[i], normals[i]);
      normals[i].normalize();
    }

    this.center.set((points[0].x + points[2].x) / 2, (points[0].y + points[2].y) / 2);
    this.minX = Math.min(points[0].x, points[1].x, points[2].x, points[3].x);
    this.minY = Math.min(points[0].y, points[1].y, points[2].y, points[3].y);
    this.maxX = Math.max(points[0].x, points[1].x, points[2].x, points[3].x);
    this.maxY = Math.max(points[0].y, points[1].y, points[2].y, points[3].y);
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    return this.localRect.containsXY(point.x, point.y);
  }
}