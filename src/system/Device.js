/* @echo EXPORT */
class Device {
  constructor() {
    /** @type {Device} */
    this.constructor.mInstance = this;

    /** @type {number} */
    this.mPixelRatio = 0;

    /** @type {number} */
    Device.mInstance.mPixelRatio = Device.getDevicePixelRatio();
  }

  /**
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
   * isTouch - Description
   *
   * @return {boolean} Description
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
   * isMobile - Description
   *
   * @return {boolean} Description
   */
  static get isMobile() {
    return /Mobi/.test(navigator.userAgent);
  }

  /**
   * pixelRatio - Description
   *
   * @return {number} Description
   */
  static get pixelRatio() {
    return Device.mInstance.mPixelRatio;
  }

  /**
   * getDevicePixelRatio - Description
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

/** @type {Device}
 * @nocollapse
 */
Device.mInstance = null;
