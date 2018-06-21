/**
 * Base class for collider component.
 *
 * @cat colliders
 * @extends Component
 */

/* @echo EXPORT */
class Collider extends Component {
  /**
   * Creates new instance for Collider.
   *
   * @ignore
   */
  constructor() {
    super();

    /** @public @type {boolean} Dirty flag */
    this.mChanged = true;

    /** @public @type {Vector} Global in stage coordinates center */
    this.mCenter = new Vector();

    /** @public @type {Vector} Global in stage coordinates min x and y vertex */
    this.mMin = new Vector();

    /** @public @type {Vector} Global in stage coordinates max x and y vertex */
    this.mMax = new Vector();
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    Debug.error('Abstract method.');
    return false;
  }

  /**
   * Updates min, max, center of this collider, to prepare to collision test
   *
   * @public
   * @param {Matrix} transform Game object world transformation with zero position.
   * @param {Vector} position  Rigid body position.
   */
  refresh(transform, position) {

  }
}
