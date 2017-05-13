/**
 * Tween
 * @unrestricted
 * @extends Component
 */
/* @echo EXPORT */
class Tween extends Component {
  /**
   * constructor - Description
   * @param {Object}   values            Description
   * @param {number} [duration=0.25]   Description
   * @param {Object|null}   [properties=null] Description
   */
  constructor(values, duration = 0.250, properties = null) {
    super();

    /** @dict */
    this.mValues = values;

    /** @type {number} */
    this.mDuration = duration;

    /** @dict */
    this.mProperties = properties;

    /** @type {boolean} */
    this.mIsPlaying = false;

    /** @type {boolean} */
    this.mIsPaused = false;

    /** @type {number} */
    this.mStartTime = 0;

    /** @type {number} */
    this.mPausedTime = 0;

    /** @dict */
    this.mValuesStart = {};

    /** @type {number} */
    this.mElapsed = 0;

    /** @type {function (v:?Array, e:number):number} */
    this.mInterpolation = Interpolation.linear;

    /** @type {number} */
    this.mDelay = 0;

    /** @type {number} */
    this.mRepeatTimes = 0;

    /** @type {boolean} */
    this.mInitiated = false;

    /** @type {boolean} */
    this.mStarted = false;

    /** @type {boolean} */
    this.mReverse = false;

    /** @type {boolean} */
    this.mRemoveOnComplete = true;

    /** @type {boolean} */
    this.mPlayOnAdded = true;

   /** @type {function(e:number):number} */
    this.mEase = Ease.smootherStep;

    if (this.mProperties !== null) {
      for (let f in this.mProperties) {
        this[f] = /** @dict */ (this.mProperties[f]);
      }
    }
  }

  /**
   * ease - Description
   *
   * @return {function(e:number):number} Description
   */
  get ease() {
    return this.mEase;
  }

  /**
   * ease - Description
   *
   * @param {function(e:number):number} value Description
   *
   * @return {void} Description
   */
  set ease(value) {
    this.mEase = value;
  }

  /**
   * interpolation - Description
   *
   * @return {function(p:Array, v:number):number} Description
   */
  get interpolation() {
    return this.mInterpolation;
  }

  /**
   * interpolation - Description
   *
   * @param {function(p:Array, v:number):number} value Description
   *
   * @return {void} Description
   */
  set interpolation(value) {
    this.mInterpolation = value;
  }

  /**
   * elapsed - Description
   *
   * @return {number} Description
   */
  get elapsed() {
    return this.mElapsed;
  }

  /**
   * delay - Description
   *
   * @return {number} Description
   */
  get delay() {
    return this.mDelay;
  }

  /**
   * delay - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set delay(value) {
    this.mDelay = value;
  }

  /**
   * removeOnComplete - Description
   *
   * @return {boolean} Description
   */
  get removeOnComplete() {
    return this.mRemoveOnComplete;
  }

  /**
   * removeOnComplete - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set removeOnComplete(value) {
    this.mRemoveOnComplete = value;
  }

  /**
   * playOnAdded - Description
   *
   * @return {boolean} Description
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * playOnAdded - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }


  /**
   * __start - Description
   *
   * @param {number} t Description
   *
   * @return {void} Description
   */
  __start(t) {
    this.mIsPlaying = true;
    this.mStartTime = t + this.mDelay;
  }

  /**
   * play - Description
   *
   * @return {Tween} Description
   */
  play() {
    if (!this.mIsPaused) {
      this.__start(Black.instance.uptime);
    } else {
      this.__resume();
    }

    return this;
  }

  /**
   * stop - Description
   *
   * @return {Tween} Description
   */
  stop() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPlaying = false;

    return this;
  }

  /**
   * to - Description
   *
   * @param {Object} values - Description
   * @param {number} duration - Description
   *
   * @return {Tween} Description
   */
  to(values = {}, duration = 0.250) {
    this.mValues = values;

    this.mDuration = duration;

    this.mInitiated = false;

    return this;
  }

  /**
   * pause - Description
   *
   * @return {Tween} Description
   */
  pause() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPaused = true;
    this.mPausedTime = Black.instance.uptime;

    return this;
  }

  /**
   * __resume - Description
   *
   * @return {void} Description
   */
  __resume() {
    if (!this.mIsPaused)
      return;

    this.mIsPaused = false;
    this.mStartTime += Black.instance.uptime - this.mPausedTime;
  }


  /**
   * @return {void}
   */
  remove() {
    if (this.mIsPlaying)
      this.stop();

    this.gameObject.removeComponent(this);
  }

  /**
   * dispose - Description
   *
   * @return {void} Description
   */
  dispose() {
    this.remove();
  }

  /**
   * repeat - Description
   *
   * @return {Tween} Description
   */
  repeat(times) {
    this.mRepeatTimes = times;

    return this;
  }

  /**
   * loop - Description
   *
   * @return {Tween} Description
   */
  loop(value = true) {
    this.mRepeatTimes = value ? Infinity : 0;

    return this;
  }

   /**
   * reverse - Description
   *
   * @return {Tween} Description
   */
  reverse(value = true) {
    this.mReverse = value;

    return this;
  }

  /**
   * chain - Description
   *
   * @return {Tween} Description
   */
  chain(tween) {
    if (!tween) {
      return this;
    }

    this.mRemoveOnComplete = false;

    this.on('complete', () => {
      tween.play();
    });

    return this;
  }

  /**
   * onAdded - description
   *
   * @override
   * @param  {GameObject} gameObject description
   * @return {void}            description
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.__start(Black.instance.uptime);
    }
  }

  /**
   * __update - Description
   *
   * @param {number} t Description
   *
   * @return {void} Description
   */
  __update(t) {
    if (t < this.mStartTime || !this.mIsPlaying || this.mIsPaused)
      return;

    // copy values only when starting tween...
    // since values may change
    if (this.mStarted === false) {
      this.mStarted = true;
      this.post('start', this.gameObject);

      for (let f in this.mValues) {
        if (!this.mInitiated && Array.isArray(this.mValues[f])) {
          this.mValues[f] = [this.gameObject[f]].concat(this.mValues[f]);
        }
        this.mValuesStart[f] = parseFloat(this.gameObject[f]);
      }

      this.mInitiated = true;
    }

    this.mElapsed = (t - this.mStartTime) / this.mDuration;

    if (this.mElapsed > 1)
      this.mElapsed = 1;

    let value = this.mEase(this.mElapsed);

    for (let f in this.mValues) {
      let start = /** @type {number} */ (this.mValuesStart[f]);
      let end = /** @type {number|Array} */ (this.mValues[f]);

      if (Array.isArray(end)) {
        this.gameObject[f] = this.mInterpolation(end, value);
      } else {
        this.gameObject[f] = /** @type {number} */ (start + (end - start) * value);
      }
    }

    this.post('update', this.gameObject);

    if (this.mElapsed === 1) {
      if (this.mRepeatTimes > 0) {
        this.mRepeatTimes -= 1;

        if (this.mReverse) {
          for (let f in this.mValues) {
            [this.mValues[f], this.mValuesStart[f]] = [this.mValuesStart[f], this.mValues[f]];
          }
        }

        this.mStartTime = t + this.mDelay;

        this.post('loop', this.gameObject);
      } else {
        this.mIsPlaying = false;
        this.post('complete', this.gameObject);

        if (this.mRemoveOnComplete) {
          this.dispose();
        } else {
          for (let f in this.mValues) {
            this.mValuesStart[f] = this.mValues[f];
          }

          this.mStarted = false;
        }
      }
    }
  }


  /**
   * set - Description
   *
   * @param {Object} values Description
   *
   * @return {void} Description
   */
  set(values) {
    this.mValues = values;

    for (let f in this.mValues)
      this.mValuesStart[f] = parseFloat(this.gameObject[f]);
  }

  onPostUpdate(dt){
    let t = Black.instance.uptime;
    this.__update(t);
  }
}
