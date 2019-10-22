import { Debug } from "./Debug";

/**
 * Provides time related methods.
 *
 * @cat core
 * 
 * @static
 */
export class Time {
  constructor() {
    /** 
     * @private
     * @type {number} 
     */
    this.mTime = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mActualTime = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mDeltaTimeMs = 1000 / 60;

    /** 
     * @private
     * @type {number} 
     */
    this.mDeltaTime = (1000 / 60) * 0.001;

    /** 
     * @private
     * @type {number} 
     */
    this.mScale = 1;

    /** 
     * @private
     * @type {number} 
     */
    this.mAlphaTime = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mRenderOffset = 0;
  }

  /**
   * Time since start in seconds.
   * 
   * @static
   * @returns {number}
   */
  get now() {
    return this.mTime;
  }

  /**
   * Time since last frame.
   * 
   * @static
   * @returns {number}
   */
  get dt() {
    return this.mDeltaTime * this.mScale;
  }

  /**
   * Time since last update.
   * 
   * @static
   * @returns {number}
   */
  get alpha() {
    return this.mAlphaTime;
  }

  /**
   * Time since last frame.
   * 
   * @static
   * @returns {number}
   */
  get delta() {
    return this.mDeltaTime * this.mScale;
  }

  /**
   * Gets/Sets timescale for engine
   * 
   * @returns {number}
   */
  get scale() {
    return this.mScale;
  }

  /**
   * @param {number} value
   */
  set scale(value) {
    Debug.assert(value >= 0, 'Time scale must be >= 0.');

    this.mScale = value;
  }
}
