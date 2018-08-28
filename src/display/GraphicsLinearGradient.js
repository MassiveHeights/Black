/**
 * A gradient style class for Graphics.
 *
 * @ignore
 * @cat display
 */

/* @echo EXPORT */
class GraphicsLinearGradient {
  /**
   * Creates new instance of GraphicsLinearGradient
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.stops = {};
    this.native = null;
  }

  addColorStop(percent, rgba) {
    this.stops[percent] = rgba;
    this.native = null;
  }

  clone() {
    return this; // todo
  }
}
