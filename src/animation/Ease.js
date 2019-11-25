/**
 * A static class with many static easing functions.
 *
 * @cat animation
 * 
 * @static
 * @staticClass
 */
export class Ease {
  /**
   * linear
   * 
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static linear(k) {
    return k;
  }

  /**
   * quadraticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quadraticIn(k) {
    return k * k;
  }

  /**
   * quadraticOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quadraticOut(k) {
    return k * (2 - k);
  }

  /**
   * quadraticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quadraticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k;

    return -0.5 * (--k * (k - 2) - 1);
  }

  /**
   * cubicIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static cubicIn(k) {
    return k * k * k;
  }

  /**
   * cubicOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static cubicOut(k) {
    return --k * k * k + 1;
  }

  /**
   * cubicInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static cubicInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k;

    return 0.5 * ((k -= 2) * k * k + 2);
  }

  /**
   * quarticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quarticIn(k) {
    return k * k * k * k;
  }

  /**
   * quarticOut
   * 
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quarticOut(k) {
    return 1 - (--k * k * k * k);
  }

  /**
   * quarticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quarticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k;

    return -0.5 * ((k -= 2) * k * k * k - 2);
  }

  /**
   * quinticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quinticIn(k) {
    return k * k * k * k * k;
  }

  /**
   * quinticOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quinticOut(k) {
    return --k * k * k * k * k + 1;
  }

  /**
   * quinticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quinticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k * k;

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }

  /**
   * sinusoidalIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  }

  /**
   * sinusoidalOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  }

  /**
   * sinusoidalInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * exponentialIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }

  /**
   * exponentialOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }

  /**
   * exponentialInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static exponentialInOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    if ((k *= 2) < 1)
      return 0.5 * Math.pow(1024, k - 1);

    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  }

  /**
   * circularIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  }

  /**
   * circularOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static circularOut(k) {
    return Math.sqrt(1 - (--k * k));
  }

  /**
   * circularInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static circularInOut(k) {
    if ((k *= 2) < 1)
      return -0.5 * (Math.sqrt(1 - k * k) - 1);

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  }

  /**
   * elasticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static elasticIn(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  }

  /**
   * elasticOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static elasticOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
  }

  /**
   * elasticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static elasticInOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    k *= 2;

    if (k < 1)
      return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

    return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

  }

  /**
   * backIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }

  /**
   * backOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  }

  /**
   * backInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static backInOut(k) {
    const s = 1.70158 * 1.525;

    if ((k *= 2) < 1)
      return 0.5 * (k * k * ((s + 1) * k - s));

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }

  /**
   * bounceIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static bounceIn(k) {
    return 1 - Ease.bounceOut(1 - k);
  }

  /**
   * bounceOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static bounceOut(k) {
    if (k < (1 / 2.75))
      return 7.5625 * k * k;
    else if (k < (2 / 2.75))
      return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    else if (k < (2.5 / 2.75))
      return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;

    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
  }

  /**
   * bounceInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static bounceInOut(k) {
    if (k < 0.5)
      return Ease.bounceIn(k * 2) * 0.5;

    return Ease.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }

  /**
   * smoothstep
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static smootherStep(k) {
    return k * k * k * (k * (6.0 * k - 15.0) + 10.0);
  }
}
