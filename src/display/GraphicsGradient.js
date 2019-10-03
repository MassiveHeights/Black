/**
 * A base abstract class for graphics gradient fill.
 *
 * @ignore
 * @cat display
 */
export class GraphicsGradient {
  /**
   * Creates new instance of GraphicsGradient
   */
  constructor() {

    /** @type {Object} */
    this.stops = {};

    /** @type {CanvasGradient|null} */
    this.native = null;
  }

  /**
   * Adds a new stop, defined by an offset and a color, to the gradient
   *
   * @param {number} offset A number between 0 and 1
   * @param {string} color A CSS <color>.
   *
   * @return {void}
   */
  addColorStop(offset, color) {
    this.stops[offset] = color;
    this.native = null;
  }
}
