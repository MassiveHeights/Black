/**
 * Provides time related methods.
 *
 * @cat core
 * @static
 */
/* @echo EXPORT */
class Time {
  constructor() {
  }

  /**
   * Time since start in seconds.
   * @returns {number}
   */
  static get time(){
    return Time.mTime;
  }

  /**
   * @ignore
   */
  static get dt() {
    return Time.mDeltaTime;
  }

  /**
   * @ignore
   */
  static get scale() {
    return Time.mScale;
  }

  /**
   * @ignore
   */
  static set scale(value) {
    Debug.assert(value >= 0, 'Time.scale must be >= 0.');

    Time.mScale = value;
  }
}

/**
 * @ignore
 * @type {number}
 */
Time.mTime = 0;

/** 
 * @ignore
 * @type {number}
 */
Time.mDeltaTime = 0;

/** 
 * @ignore
 * @type {number}
 */
Time.mScale = 1;
