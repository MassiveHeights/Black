import { FloatScatterBase } from "./FloatScatterBase";
import { Curve } from "../geom/Curve";
import { Vector } from "../geom/Vector";

/**
 * A number scatter for defining a range in 2D space on a curve.
 *
 * @cat scatters
 * @extends black-engine~FloatScatterBase
 */
export class FloatCurveScatter extends FloatScatterBase {
  /**
   * Creates new FloatCurveScatter instance.
   *
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    /** 
     * @private 
     * @type {black-engine~Curve} 
     */
    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    /**
     * @private
     * @type {Array<number>}
     */
    this.mPointsCache = points;

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mCache = new Vector();
  }

  /**
   * Updates curve with new array of points.
   * 
   * @param {Array<number>} value
   */
  set points(value) {
    this.mPointsCache = value;
    this.mCurve.set(...value);
  }

  /**
   * Returns list of points.
   * @returns {Array<number>}
   */
  get points() {
    return this.mPointsCache;
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

    this.value = this.mCache.y;
    return this.value;
  }
}
