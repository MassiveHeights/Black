/**
 * Contains system functions.
 * @static
 * @cat system
 */
/* @echo EXPORT */
class Device {
  /**
   * Static class.
   */
  constructor() {
    /**
     * @private
     * @type {Device}
     */
    this.constructor.mInstance = this;

    /**
     * @private
     * @type {number}
     */
    this.mPixelRatio = 0;

    /**
     * @private
     * @type {number}
     */
    Device.mInstance.mPixelRatio = Device.getDevicePixelRatio();
  }

  /**
   * Returns current OS name.
   * @return {string}
   */
  static get os() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

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
  static get isTouch() {
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
  static get isMobile() {
    return /Mobi/.test(navigator.userAgent);
  }

  /**
   * Returns screen pixel ratio.
   *
   * @return {number}
   */
  static get pixelRatio() {
    return Device.mInstance.mPixelRatio;
  }

  /**
   * @private
   *
   * @suppress {missingProperties}
   *
   * @return {number} Description
   */
  static getDevicePixelRatio() {
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI)
      return window.screen.systemXDPI / window.screen.logicalXDPI;
    else if (window.devicePixelRatio !== undefined)
      return window.devicePixelRatio;

    return 1;
  }

}

/**
 * @private
 * @type {Device}
 * @nocollapse
 */
Device.mInstance = null;
