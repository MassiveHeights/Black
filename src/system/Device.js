import { Black } from "../Black";

/**
 * @type {number|null}
 */
let mPixelRatioCache = null;

/**
 * Contains system functions.
 * @static
 * @cat system
 */
export class Device {
  /**
   * Static class.
   */
  constructor() {
  }

  /**
   * Returns current OS name.
   * 
   * @return {string}
   */
  static get os() {
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
    if (mPixelRatioCache === null)
      mPixelRatioCache = Device.getDevicePixelRatio();

    return mPixelRatioCache;
  }

  /**
   * Returns true if web audio is supported.
   *
   * @return {boolean}
   */
  static get webAudioSupported() {
    return window['AudioContext'] != null || window['webkitAudioContext'] != null;
  }

  /**
   * Returns device pixel ratio.
   *
   * @static
   * @suppress {missingProperties}
   * @return {number} Description
   */
  static getDevicePixelRatio() {
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI)
      return window.screen.systemXDPI / window.screen.logicalXDPI;
    else if (window.devicePixelRatio !== undefined)
      return window.devicePixelRatio;

    return 1;
  }

  /**
   * Returns true if device is in landscape orientation.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  static get isLandscape() {
    let size = Black.engine.viewport.size;
    return size.width >= size.height;
  }

  /**
   * Returns true if device is in portrait orientation.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  static get isPortrait() {
    return !Device.isLandscape;
  }
}