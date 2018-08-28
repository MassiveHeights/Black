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
  constructor(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;

    this.stops = {};
    this.native = null;
  }

  addColorStop(percent, rgba) {
    this.stops[percent] = rgba;
    this.native = null;
  }

  clone() {
    const g = new GraphicsLinearGradient(this.x0, this.y0, this.x1, this.y1);

    for (let key in this.stops) {
      g.stops[key] = this.stops[key];
    }

    return g;
  }
}
