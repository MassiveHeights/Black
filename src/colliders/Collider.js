import { Component } from "../core/Component";
import { Vector } from "../geom/Vector";
import { Matrix } from "../geom/Matrix";
import { Debug } from "../core/Debug";

/**
 * Base class for collider component.
 *
 * @cat colliders
 * @extends black-engine~Component
 */
export class Collider extends Component {
  /**
   * Creates new instance for Collider.
   *
   * @ignore
   */
  constructor() {
    super();

    /**
     * Dirty flag.
     * 
     * @private 
     * @type {boolean}
     */
    this.mChanged = true;

    /**
     * Global in stage coordinates center.
     * 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mCenter = new Vector();

    /**
     * Global in stage coordinates min x and y vertex.
     * 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mMin = new Vector();

    /**
     * Global in stage coordinates max x and y vertex. 
     * 
     * @private 
     * @type {black-engine~Vector} */
    this.mMax = new Vector();
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {black-engine~Vector} point Global coordinates.
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
   * @param {black-engine~Matrix} transform Game object world transformation with zero position.
   * @param {black-engine~Vector} position  Rigid body position.
   */
  refresh(transform, position) { }
}
