/* @echo EXPORT */
class MathEx {
  /**
   * randomBetween
   *
   * @param {number} a
   * @param {number} b
   *
   * @return {number}
   */
  static randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };


  /**
   * clamp
   *
   * @param {number} value
   * @param {number} min
   * @param {number} max
   *
   * @return {number}
   */
  static clamp(value, min, max) {
    return (value < min) ? min : (value > max) ? max : value;
  }

  /**
   * distance between two points
   * 
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * 
   * @return {number}
   */
  static distance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * squared distance between two points
   * 
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * 
   * @return {number}
   */
  static distanceSqr(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    return (x * x) + (y * y);
  }

  /**
   * angle in radians between two points
   * 
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * 
   * @return {number}
   */
  static angleBetween(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  /**
   * @param  {number} value
   * @param  {number} fromA
   * @param  {number} fromB
   * @param  {number} toA
   * @param  {number} toB
   * 
   * @return {number}
   */
  static mapRange(value, fromA, fromB, toA, toB) {
    return toA + (toB - toA) * (value - fromA) / (fromB - fromA);
  }

  /**
   * lerp
   *
   * @param {number} a
   * @param {number} b
   * @param {number} t
   *
   * @return {number}
   */
  static lerp(a, b, t) {
    return a + t * (b - a);
  };


  /**
   * lerpp
   *
   * @param {number} a
   * @param {number} b
   * @param {number} t
   *
   * @return {number}
   */
  static lerpp(a, b, t) {
    return (1 - t) * a + t * b;
  }

  static equals(a, b, epsilon = Number.EPSILON) {
    return (a - epsilon < b) && (a + epsilon > b);
  }
}

/** @const
 *  @type {number}
 */
MathEx.PI_Q = Math.PI / 4;

/** @const
 *  @type {number}
 */
MathEx.PI2 = Math.PI * 2;

/** @const
 *  @type {number}
 */
MathEx.DEG2RAD = 0.01745329251994329576923690768489;

/** @const
 *  @type {number}
 */
MathEx.RAD2DEG = 57.295779513082320876798154814105;