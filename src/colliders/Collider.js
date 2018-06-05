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
}
