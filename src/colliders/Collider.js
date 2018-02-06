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
  constructor (){
    super();
  }

  /**
   * Checks if given global coordinates are located within collider's area. Must be overridden.
   *
   * @abstract
   * @param {Vector} point Global coordinates.
   */
  containsPoint(point) {
    Debug.error('Abstract method.');
  }
}