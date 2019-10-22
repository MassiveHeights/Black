/**
 * Set of math helper functions.
 *
 * @cat core
 * @static
 */
export class MathEx {
  /**
   * Generates a random number in given range.
   *
   * @param {number} a A lower value.
   * @param {number} b A greater value.
   * @return {number}
   */
  static randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  /**
   * Clamps given value to min max range.
   *
   * @param {number} value A value to clamp.
   * @param {number} min A lower threshold.
   * @param {number} max A greater threshold.
   * @return {number}
   */
  static clamp(value, min, max) {
    return (value < min) ? min : (value > max) ? max : value;
  }

  /**
   * Calculates distance between two points.
   * 
   * @param  {number} x1 First point x-coordinate.
   * @param  {number} y1 First point y-coordinate.
   * @param  {number} x2 Second point x-coordinate.
   * @param  {number} y2 Second point y-coordinate.
   * @return {number}
   */
  static distance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * Calculates squared distance between two points.
   * 
   * @param  {number} x1 First point x-coordinate.
   * @param  {number} y1 First point y-coordinate.
   * @param  {number} x2 Second point x-coordinate.
   * @param  {number} y2 Second point y-coordinate.
   * @return {number}
   */
  static distanceSqr(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    return (x * x) + (y * y);
  }

  /**
   * Calculates angle in radians between two points.
   * 
   * @param  {number} x1 First point x-coordinate.
   * @param  {number} y1 First point y-coordinate.
   * @param  {number} x2 Second point x-coordinate.
   * @param  {number} y2 Second point y-coordinate.
   * @return {number}
   */
  static angleBetween(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  /**
   * Maps one range onto another.
   *
   * @param  {number} value A value to map.
   * @param  {number} fromA Lower value from first range.
   * @param  {number} fromB Greater value from first range.
   * @param  {number} toA Lower value from second range.
   * @param  {number} toB Greater value from second range.
   * @return {number}
   */
  static mapRange(value, fromA, fromB, toA, toB) {
    return toA + (toB - toA) * (value - fromA) / (fromB - fromA);
  }

  /**
   * Linearly interpolates a number.
   *
   * @param {number} a First value.
   * @param {number} b Second value.
   * @param {number} t A value between 0 and 1.
   * @return {number}
   */
  static lerp(a, b, t) {
    return a + t * (b - a);
  }

  /**
   * Compares two numbers using given epsilon value.
   *
   * @param {number} a First value.
   * @param {number} b Second value.
   * @param {number} epsilon Comparison threshold.
   * @returns {boolean}
   */
  static equals(a, b, epsilon = Number.EPSILON) {
    return (a - epsilon < b) && (a + epsilon > b);
  }
}

/**
 * Pi divided by 4.
 * @type {number}
 */
MathEx.PI_Q = Math.PI / 4;

/**
 * PI multiplied by 2.
 * @type {number}
 */
MathEx.PI2 = Math.PI * 2;

/**
 * Degrees to radians constant.
 * @const
 * @type {number}
 */
MathEx.DEG2RAD = 0.01745329251994329576923690768489;

/**
 * Radians to degrees constant.
 * @type {number}
 */
MathEx.RAD2DEG = 57.295779513082320876798154814105;