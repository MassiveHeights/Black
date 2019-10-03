import { Vector } from "./Vector";

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */
export class Curve {
  /**
   * Creates new Curve instance.
   */
  constructor() {
    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mPoints = [];

    /** 
     * @private 
     * @type {Array<black-engine~Vector>} 
     */
    this.mLookup = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mBaked = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStep = 1 / 60;

    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mEachT = [];
  }

  /**
   * Sets new points coordinates.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   * @return {black-engine~Curve} This curve.
   */
  set(...points) {
    this.mPoints = this.__initPoints(points);
    this.__refreshEachT();

    if (this.mBaked)
      this.__refreshCache();

    return this;
  }


  /**
   * Enables or disables interpolation from cache (lookup).
   * Returns true or false depending on baked is enabled or not.
   *
   * @return {boolean}
   */
  get baked() {
    return this.mBaked;
  }

  /**
   * @param  {boolean} label
   */
  set baked(label) {
    this.mBaked = label;

    if (!this.mLookup && this.mPoints) {
      this.__refreshCache();
    }
  }

  /**
   * Wides points array. Sets first point for next bezier same as last of previous.
   *
   * @private
   * @param  {Array<number>} points Array of points coordinates.
   * @return {Array<number>} Points coordinates array.
   */
  __initPoints(points) {
    let res = [];

    for (let i = 6; i < points.length; i += 6) {
      res = res.concat(points.slice(i - 6, i + 2));
    }

    return res;
  }

  /**
   * Refresh cache (lookup) for fast interpolations.
   *
   * @private
   * @return {black-engine~Curve} This curve.
   */
  __refreshCache() {
    let lookup = this.mLookup = [];
    let getFullLength = this.getFullLength();
    let points = this.mPoints;
    let pointsLen = points.length;

    for (let i = 0; i < pointsLen; i += 8) {
      let length = Curve.getLength(...points.slice(i, i + 8));
      let step = this.mStep * getFullLength / length;

      for (let t = step; t < 1; t += step)
        lookup.push(Curve.lerp(t, ...points.slice(i, i + 8)));
    }

    return this;
  }


  /**
   * Refresh local interpolation kof for each bezier in curve.
   *
   * @ignore
   * @private
   * @return {black-engine~Curve} This curve.
   */
  __refreshEachT() {
    let points = this.mPoints;
    let eachT = this.mEachT = [];
    let pointsLen = points.length;
    let eachLength = [];

    for (let i = 0; i < pointsLen; i += 8)
      eachLength.push(Curve.getLength(...points.slice(i, i + 8)));

    let length = this.getFullLength();
    let s = 0;
    for (let i = 0; i < pointsLen; i += 8) {
      s += eachLength[i / 8];
      eachT.push(s / length);
    }

    return this;
  }

  /**
   * Interpolates single bezier on t position.
   *
   * @param  {number} t Interpolation position (0...1).
   * @param  {number} startX
   * @param  {number} startY
   * @param  {number} cpStartX
   * @param  {number} cpStartY
   * @param  {number} cpEndX
   * @param  {number} cpEndY
   * @param  {number} endX
   * @param  {number} endY
   * @param  {black-engine~Vector=} outVector
   * @return {black-engine~Vector} Position on bezier.
   */
  static lerp(t, startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY, outVector) {
    let u = 1 - t;
    let tt = t * t;
    let uu = u * u;
    let uuu = uu * u;
    let ttt = tt * t;

    let p = outVector || new Vector();
    p.set(startX, startY);
    p.x *= uuu;
    p.y *= uuu;

    // first
    p.x += 3 * uu * t * cpStartX;
    p.y += 3 * uu * t * cpStartY;

    // second
    p.x += 3 * u * tt * cpEndX;
    p.y += 3 * u * tt * cpEndY;

    // third
    p.x += ttt * endX;
    p.y += ttt * endY;

    return p;
  }

  /**
   * Interpolates across whole curve.
   *
   * @param  {number} t Interpolation position (0...1).
   * @param  {black-engine~Vector=} outVector Vector to be returned.
   * @return {black-engine~Vector} Position on curve.
   */
  interpolate(t, outVector) {
    let res = outVector || new Vector();
    let lookup = this.mLookup;

    if (this.mBaked) {
      let i = Math.ceil((lookup.length - 1) * t);
      let p = lookup[i];
      res.copyFrom(p);

      return res;
    }

    // not backed
    let { mEachT, mPoints } = this;
    let i = 0;

    while (mEachT[i] < t)
      i++;

    let minT = mEachT[i - 1] || 0;
    let maxT = mEachT[i];
    let bezier = mPoints.slice(i * 8, i * 8 + 8);

    return Curve.lerp((t - minT) / (maxT - minT), ...bezier, res);
  }

  /**
   * Returns single bezier length.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY
   * @return {number} Length.
   */
  static getLength(...points) {
    let p0 = new Vector(points[0], points[1]);
    let p1 = new Vector(points[2], points[3]);
    let p2 = new Vector(points[4], points[5]);
    let p3 = new Vector(points[6], points[7]);

    return (p3.distance(p0) + p0.distance(p1) + p1.distance(p2) + p2.distance(p3)) / 2;
  }

  /**
   * Returns this curve length.
   *
   * @return {number} Length.
   */
  getFullLength() {
    let points = this.mPoints;
    let mPointsLen = points.length;
    let res = 0;

    for (let i = 0; i < mPointsLen; i += 8)
      res += Curve.getLength(...points.slice(i, i + 8));

    return res;
  }
}

/**
 * @ignore
 * @type {black-engine~Curve}
 * @nocollapse
 */
Curve.__cache = new Curve();
