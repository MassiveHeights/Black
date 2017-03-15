/* @echo EXPORT */
class FloatCurveScatter extends Scatter {
  /**
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    this.mCache = new Vector();
  }

  getValue() {
    let t = Math.random();
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }

  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache.y;
  }
}

/* @echo EXPORT */
class VectorCurveScatter extends Scatter {
  /**
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    this.mCache = new Vector();
  }


  getValue() {
    let t = Math.random();
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache;
  }


  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);
    return this.mCache;
  }
}
