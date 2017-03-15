/**
 * randomBetween
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
Math.randomBetween = function (a, b) {
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
Math.clamp = function (value, min, max) {
  return (value < min) ? min : (value > max) ? max : value;
};


/**
 * lerp
 *
 * @param {number} a
 * @param {number} b
 * @param {number} t
 *
 * @return {number}
 */
Math.lerp = function (a, b, t) {
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
Math.lerpp = function (a, b, t) {
  return (1 - t) * a + t * b;
};

/** @const
 *  @type {number}
 */
Math.PI_Q = Math.PI / 4;

/** @const
 *  @type {number}
 */
Math.PI2 = Math.PI * 2;

/** @const
 *  @type {number}
 */
Math.DEG2RAD = 0.01745329251994329576923690768489;

/** @const
 *  @type {number}
 */
Math.RAD2DEG = 57.295779513082320876798154814105;
// 
//
//
// /**
//  * fsin - Fast sin
//  *
//  * @param {number} x
//  *
//  * @return {number}
//  */
// Math.fsin = function(x) {
//   if (x === 0)
//     return 0;
//
//   // modulo to range of -PI..PI
//   const width = 3.14159265 - -3.14159265;
//   const offsetValue = x - -3.14159265;
//   x = (offsetValue - (Math.floor(offsetValue / width) * width)) + -3.14159265;
//
//   return x < 0 ? 1.27323954 * x + 0.405284735 * x * x : 1.27323954 * x - 0.405284735 * x * x;
// }
//
//
// /**
//  * fcos - Fast cos
//  *
//  * @param {number} x
//  *
//  * @return {number}
//  */
// Math.fcos = function(x) {
//   x += 1.57079632;
//
//   // modulo to range of -PI..PI
//   const width = 3.14159265 - -3.14159265;
//   const offsetValue = x - -3.14159265;
//   x = (offsetValue - (Math.floor(offsetValue / width) * width)) + -3.14159265;
//
//   return x < 0 ? 1.27323954 * x + 0.405284735 * x * x : 1.27323954 * x - 0.405284735 * x * x;
// }
