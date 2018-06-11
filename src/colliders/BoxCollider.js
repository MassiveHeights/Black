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

    const normals = [];
    const vertices = [];

    for (let i = 0; i < 4; i++) {
      normals.push(new Vector());
      vertices.push(new Vector());
    }

    /** @private @type {Rectangle} Local to game object */
    this.mRect = new Rectangle();

    /** @private @type {Array<Vector>} Local to rigid body normals */
    this.mNormals = normals;

    /** @private @type {Array<Vector>} Local to rigid body vertices */
    this.mVertices = vertices;

    /** @private @type {Vector} Local to rigid body min x and y vertex */
    this.mLocalMin = new Vector();

    /** @private @type {Vector} Local to rigid body max x and y vertex */
    this.mLocalMax = new Vector();

    /** @private @type {Vector} Local to rigid body center */
    this.mLocalCenter = new Vector();

    /** @private @type {Vector} Global in stage coordinates min x and y vertex */
    this.mMin = new Vector();

    /** @private @type {Vector} Global in stage coordinates max x and y vertex */
    this.mMax = new Vector();

    /** @private @type {Vector} Global in stage coordinates center */
    this.mCenter = new Vector();

    this.set(x, y, width, height);
  }

  /**
   * Setter
   *
   * @public
   * @param {number} x      X-coordinate.
   * @param {number} y      Y-coordinate.
   * @param {number} width  Rectangle width.
   * @param {number} height Rectangle height.
   */
  set(x, y, width, height) {
    this.mRect.set(x, y, width, height);
    this.mChanged = true;
  }

  /**
   * Updates min, max, center of this collider, to prepare to collision test
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
      const vertices = this.mVertices;
      const normals = this.mNormals;
      const rect = this.mRect;
      const vec = Vector.pool.get();

      transform.transformVector(vec.set(0, -1), normals[0]);
      transform.transformVector(vec.set(1, 0), normals[1]);
      transform.transformVector(vec.set(0, 1), normals[2]);
      transform.transformVector(vec.set(-1, 0), normals[3]);

      for (let i = 0; i < 4; i++) {
        normals[i].normalize();
      }

      transform.transformVector(vec.set(rect.x, rect.y), vertices[0]);
      transform.transformVector(vec.set(rect.x + rect.width, rect.y), vertices[1]);
      transform.transformVector(vec.set(rect.x + rect.width, rect.y + rect.height), vertices[2]);
      transform.transformVector(vec.set(rect.x, rect.y + rect.height), vertices[3]);

      localCenter.set((vertices[0].x + vertices[2].x) / 2, (vertices[0].y + vertices[2].y) / 2);
      localMin.x = Math.min(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
      localMin.y = Math.min(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);
      localMax.x = Math.max(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
      localMax.y = Math.max(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);

      Vector.pool.release(vec);
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
   *
   * @return {boolean}
   */
  containsPoint(point) {
    return this.mRect.containsXY(point.x, point.y);
  }

  /**
   * Draw this
   *
   * @public
   * @param {Graphics} graphics   Drawing place
   * @param {Vector} bodyPosition This parent global position
   *
   * @return {void}
   */
  debug(graphics, bodyPosition) {
    const vertices = this.mVertices;

    graphics.beginPath();
    graphics.moveTo(bodyPosition.x + vertices[0].x, bodyPosition.y + vertices[0].y);
    graphics.lineTo(bodyPosition.x + vertices[1].x, bodyPosition.y + vertices[1].y);
    graphics.lineTo(bodyPosition.x + vertices[2].x, bodyPosition.y + vertices[2].y);
    graphics.lineTo(bodyPosition.x + vertices[3].x, bodyPosition.y + vertices[3].y);
    graphics.lineTo(bodyPosition.x + vertices[0].x, bodyPosition.y + vertices[0].y);
    graphics.stroke();
  }
}
