/* @echo EXPORT */
class Ease {
  constructor() {}

  /**
   * linear - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static linear(k) {
    return k;
  }

  /**
   * quadraticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quadraticIn(k) {
    return k * k;
  }

  /**
   * quadraticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quadraticOut(k) {
    return k * (2 - k);
  }

  /**
   * quadraticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quadraticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k;

    return -0.5 * (--k * (k - 2) - 1);
  }

  /**
   * cubicIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static cubicIn(k) {
    return k * k * k;
  }

  /**
   * cubicOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static cubicOut(k) {
    return --k * k * k + 1;
  }

  /**
   * cubicInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static cubicInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k;

    return 0.5 * ((k -= 2) * k * k + 2);
  }

  /**
   * quarticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quarticIn(k) {
    return k * k * k * k;
  }

  /**
   * quarticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quarticOut(k) {
    return 1 - (--k * k * k * k);
  }

  /**
   * quarticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quarticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k;

    return -0.5 * ((k -= 2) * k * k * k - 2);
  }

  /**
   * quinticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quinticIn(k) {
    return k * k * k * k * k;
  }

  /**
   * quinticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quinticOut(k) {
    return --k * k * k * k * k + 1;
  }

  /**
   * quinticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static quinticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k * k;

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }

  /**
   * sinusoidalIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  }

  /**
   * sinusoidalOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  }

  /**
   * sinusoidalInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * exponentialIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }

  /**
   * exponentialOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }

  /**
   * exponentialInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
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
   * circularIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  }

  /**
   * circularOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static circularOut(k) {
    return Math.sqrt(1 - (--k * k));
  }

  /**
   * circularInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static circularInOut(k) {
    if ((k *= 2) < 1)
      return -0.5 * (Math.sqrt(1 - k * k) - 1);

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  }

  /**
   * elasticIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static elasticIn(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  }

  /**
   * elasticOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static elasticOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
  }

  /**
   * elasticInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
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
   * backIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }

  /**
   * backOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  }

  /**
   * backInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static backInOut(k) {
    const s = 1.70158 * 1.525;

    if ((k *= 2) < 1)
      return 0.5 * (k * k * ((s + 1) * k - s));

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }

  /**
   * bounceIn - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static bounceIn(k) {
    return 1 - Ease.bounceOut(1 - k);
  }

  /**
   * bounceOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
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
   * bounceInOut - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static bounceInOut(k) {
    if (k < 0.5)
      return Ease.bounceIn(k * 2) * 0.5;

    return Ease.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }

  /**
   * smoothstep - Description
   *
   * @param {number} k Description
   *
   * @return {number} Description
   */
  static smootherStep(k) {
    return k * k * k * (k * (6.0 * k - 15.0) + 10.0);
  }
}
