/**
 * A number scatter for defining a range in 2D space on a curve.
 *
 * @cat scatters
 * @extends Scatter
 */
/* @echo EXPORT */
class FloatCurveScatter extends Scatter {
  /**
   * Creates new FloatCurveScatter instance.
   *
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    /** 
     * @private 
     * @type {Curve} 
     */
    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    /** 
     * @private 
     * @type {Vector} 
     */
    this.mCache = new Vector();
  }

  /**
   * Returns a number at given position on a curve.
   *
   * @override
   * @param {number} t The position.
   * @return {number} A value on a curve at given position.
   */
  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }
}
