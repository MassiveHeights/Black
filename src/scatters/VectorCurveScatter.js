/**
 * Sets particle's starting velocity.
 *
 * @cat scatters
 * @extends Scatter
 */
/* @echo EXPORT */
class VectorCurveScatter extends Scatter {
  /**
   * Creates new VectorCurveScatter instance.
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    this.mCache = new Vector();
  }

  /**
   * Returns a Vector at given position on a curve.
   * @override
   *
   * @param {number} t The position.
   *
   * @return {Vector} Vector object representing a value on a curve at given
   * position.
   */
  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache;
  }
}
