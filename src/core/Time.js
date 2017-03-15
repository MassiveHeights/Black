/* @echo EXPORT */
class Time {
  constructor() {
  }

  static get time(){
    return Time.mTime;
  }

  static get dt() {
    return Time.mDeltaTime;
  }

  static get scale() {
    return Time.mScale;
  }

  static set scale(value) {
    Assert.is(value >= 0, 'Time.scale must be >= 0.');

    Time.mScale = value;
  }
}

/** @type {number} */
Time.mTime = 0;

/** @type {number} */
Time.mDeltaTime = 0;

/** @type {number} */
Time.mScale = 1;
