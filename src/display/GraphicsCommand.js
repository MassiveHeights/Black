import { GraphicsCommandType } from "./GraphicsCommandType";

/**
 * A helper class for Graphics.
 *
 * @ignore
 * @cat display
 */
export class GraphicsCommand {
  /**
   * Creates new instance of GraphicsCommand
   *
   * @param {black-engine~GraphicsCommandType} type
   * @param {Array<*>} data
   */
  constructor(type, data) {
    /** 
     * @public 
     * @type {GraphicsCommandType} 
     */
    this.type = type;

    /** 
     * @public 
     * @type {Array<*>} 
     */
    this.data = data;
  }

  /**
   * Returns value at given index as a number. Used for GCC only.
   * @param {number} ix
   * @returns {number}
   */
  getNumber(ix) {
    return /** @type {!number} */ (this.data[ix]);
  }

  /**
   * Returns value at given index as a string. Used for GCC only.
   * @param {number} ix
   * @returns {string}
   */
  getString(ix) {
    return /** @type {!string} */ (this.data[ix]);
  }

  /**
   * Returns value at given index as a string. Used for GCC only.
   * @param {number} ix
   * @returns {boolean}
   */
  getBoolean(ix) {
    return /** @type {!boolean} */ (this.data[ix]);
  }

  /**
   * Returns value at given index as an object. Used for GCC only.
   * @param {number} ix
   * @returns {Object}
   */
  getObject(ix) {
    return /** @type {!Object} */ (this.data[ix]);
  }
}
