import { GraphicsGradient } from "./GraphicsGradient";

/**
 * Linear gradient fill style for graphics.
 *
 * @ignore
 * @cat display
 */
export class GraphicsLinearGradient extends GraphicsGradient {
  /**
   * Creates new instance of GraphicsLinearGradient
   *
   * @param {number} x0 The x axis of the coordinate of the start point.
   * @param {number} y0 The y axis of the coordinate of the start point.
   * @param {number} x1 The x axis of the coordinate of the end point.
   * @param {number} y1 The y axis of the coordinate of the end point.
   */
  constructor(x0, y0, x1, y1) {
    super();

    /** @type {number} */
    this.x0 = x0;

    /** @type {number} */
    this.y0 = y0;

    /** @type {number} */
    this.x1 = x1;

    /** @type {number} */
    this.y1 = y1;

    /** @type {boolean} */
    this.isAbsolute = false;
  }

  /**
   * @inheritDoc
   */
  addColorStop(percent, color) {
    this.stops[percent] = color;
    this.native = null;
  }

  /**
   * Creates copy of this
   *
   * @return {GraphicsLinearGradient} New instance
   */
  clone() {
    const g = new GraphicsLinearGradient(this.x0, this.y0, this.x1, this.y1);
    g.isAbsolute = this.isAbsolute;

    for (let key in this.stops) {
      g.stops[key] = this.stops[key];
    }

    return g;
  }
}
