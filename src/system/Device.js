/**
 * Contains system functions.
 * @static
 * @cat system
 */
export class Device {
  constructor() {
    /**
     * @type {number|null}
     * @private
     */
    this.mPixelRatioCache = null;
  }

  /**
   * Returns current OS name.
   * 
   * @return {string}
   */
  get os() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent))
      return 'Windows Phone';

    if (/android/i.test(userAgent))
      return 'Android';

    if (/iPad|iPhone|iPod/.test(userAgent)/* && !window.MSStream*/)
      return 'iOS';

    return 'unknown';
  }

  /**
   * Returns True if touch screen is present.
   *
   * @return {boolean}
   */
  get isTouch() {
    let hasEvent = 'ontouchstart' in window;
    if (hasEvent)
      return true;

    if (navigator.maxTouchPoints > 0)
      return true;

    return false;
  }

  /**
   * Returns True if engine is running on mobile device.
   *
   * @return {boolean}
   */
  get isMobile() {
    return /Mobi/.test(navigator.userAgent);
  }

  /**
   * Returns screen pixel ratio.
   *
   * @return {number}
   */
  get pixelRatio() {
    if (this.mPixelRatioCache === null)
      this.mPixelRatioCache = this.getDevicePixelRatio();

    return this.mPixelRatioCache;
  }

  /**
   * Returns true if web audio is supported.
   *
   * @return {boolean}
   */
  get webAudioSupported() {
    return window['AudioContext'] != null || window['webkitAudioContext'] != null;
  }

  /**
   * Returns device pixel ratio.
   *
   * @suppress {missingProperties}
   * @return {number} Description
   */
  getDevicePixelRatio() {
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI)
      return window.screen.systemXDPI / window.screen.logicalXDPI;
    else if (window.devicePixelRatio !== undefined)
      return window.devicePixelRatio;

    return 1;
  }
}