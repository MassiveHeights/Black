import { MathEx } from "../math/MathEx";

/**
 * Interpolation functions.
 *
 * @cat animation
 * @static
 */
export class Interpolation {
  /**
   * Linear interpolation.
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @param {function(number, number, number):number=} lerpFunction Interpolation function.
   * @return {number}  The interpolated value
   */
  static linear(v, k, lerpFunction) {
    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    lerpFunction = lerpFunction || MathEx.lerp;

    if (k < 0)
      return lerpFunction(v[0], v[1], f);

    if (k > 1)
      return lerpFunction(v[m], v[m - 1], m - f);

    return lerpFunction(v[i], v[i + 1 > m ? m : i + 1], f - i);
  }

  /**
   * Cubic bezier interpolation.
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static bezier(v, k) {
    let b = 0;
    let n = v.length;
    let pow = Math.pow;
    // Bernstein basis polynomials
    let bn = (n, i) => {
      let fc = Interpolation.__factorial;
      return fc(n) / fc(i) / fc(n - i);
    };

    for (let i = 0; i < n; i++)
      b += pow(1 - k, n - i) * pow(k, i) * v[i] * bn(n, i);

    return b;
  }

  /**
   * Catmull Rom interpolation.
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static catmullRom(v, k) {
    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    let fn = (p0, p1, p2, p3, t) => {
      let v0 = (p2 - p0) * 0.5;
      let v1 = (p3 - p1) * 0.5;
      let t2 = t * t;
      let t3 = t * t2;

      return ((p1 - p2) * 2 + v0 + v1) * t3 + ((p2 - p1) * 3 - 2 * v0 - v1) * t2 + v0 * t + p1;
    };

    if (v[0] === v[m]) {
      if (k < 0)
        i = Math.floor(f = m * (1 + k));

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0)
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      else if (k > 1)
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  }
}

/**
 * @private
 * @param {number} n
 * @return {number}
 */
Interpolation.__factorial = (function() {
  let a = [1];

  return function(n) {
    if (a[n])
      return a[n];

    let s = n;

    while (--n)
      s *= n;

    a[n] = s;
    return s;
  };
})();
