/**
 * A tweening component.
 *
 * @cat animation
 * @unrestricted
 * @extends Component
 */
/* @echo EXPORT */
class Tween extends Component {
  /**
   * Creates new instance of Tween Component.
   * @param {Object}        values            The values to tween.
   * @param {number}        [duration=0.25]   Duraction in seconds.
   * @param {Object|null}   [properties=null] Tween properties Object.
   */
  constructor(values, duration = 0.250, properties = null) {
    super();

    /**
     * @private
     * @dict
     */
    this.mValues = values;

    /**
     * @private
     * @type {number}
     */
    this.mDuration = duration;

    /**
     * @private
     * @dict
     */
    this.mProperties = properties;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPlaying = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPaused = false;

    /**
     * @private
     * @type {number}
     */
    this.mStartTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mPausedTime = 0;

    /**
     * @private
     * @dict
     */
    this.mValuesStart = {};

    /**
     * @private
     * @type {number}
     */
    this.mElapsed = 0;

    /**
     * @private
     * @type {function (Array, number):number}
     */
    this.mInterpolation = Interpolation.linear;

    /**
     * @private
     * @type {number}
     */
    this.mDelay = 0;

    /**
     * @private
     * @type {number}
     */
    this.mRepeatTimes = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mInitiated = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mStarted = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mReverse = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mRemoveOnComplete = true;

    /**
     * @private
     * @type {boolean}
     */
    this.mPlayOnAdded = true;

   /**
    * @private
    * @type {function(number):number}
    */
    this.mEase = Ease.smootherStep;

    // TODO: fix ESDOC issue
    if (this.mProperties !== null) {
      for (let f in this.mProperties) {
        this[f] = /** @dict */ (this.mProperties[f]);
      }
    }
  }

  /**
   * Returns active ease function.
   *
   * @return {function(number):number}
   */
  get ease() {
    return this.mEase;
  }

  /**
   * Sets easing function to use.
   *
   * @param {function(number):number} value The easing function.
   * @return {void}
   */
  set ease(value) {
    this.mEase = value;
  }

  /**
   * Returns the interpolation algorithm.
   *
   * @return {function(Array, number):number}
   */
  get interpolation() {
    return this.mInterpolation;
  }

  /**
   * Sets the interpolation algorithm. Possible values Interpolation.linear, Interpolation.bezier, Interpolation.catmullRom or your custom function.
   *
   * @param {function(Array, number):number} value The interpolation function.
   * @return {void}
   */
  set interpolation(value) {
    this.mInterpolation = value;
  }

  /**
   * Time elapsed since tween start in seconds.
   *
   * @return {number}
   */
  get elapsed() {
    return this.mElapsed;
  }

  /**
   * Returns amount of seconds to wait before tweening.
   *
   * @return {number}
   */
  get delay() {
    return this.mDelay;
  }

  /**
   * Set amount of seconds to wait before tweening.
   *
   * @param {number} value Seconds to wait.
   * @return {void}
   */
  set delay(value) {
    this.mDelay = value;
  }

  /**
   * Returns if Tween Component should be automatically detached from owner GameObject after completation.
   *
   * @return {boolean}
   */
  get removeOnComplete() {
    return this.mRemoveOnComplete;
  }

  /**
   * Sets if Tween Component should be automatically detached from owner GameObject after completation.
   *
   * @param {boolean} value
   * @return {void}
   */
  set removeOnComplete(value) {
    this.mRemoveOnComplete = value;
  }

  /**
   * Returns whether the tween should start playing automatically when added to the root.
   * @return {boolean}
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * Sets whether the tween should start playing automatically when added to the root.
   *
   * @param {boolean} value
   * @return {void}
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  /**
   * @private
   * @param {number} t
   *
   * @return {void}
   */
  __start(t) {
    this.mIsPlaying = true;
    this.mStartTime = t + this.mDelay;
  }

  /**
   * Starts tweening.
   *
   * @return {Tween} Returns this.
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
   * Stops current tween.
   *
   * @return {Tween} Returns this.
   */
  stop() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPlaying = false;

    return this;
  }

  /**
   * Sets the values for tweening.
   *
   * @param {Object} values   Values to tween.
   * @param {number} duration Duration in seconds.
   *
   * @return {Tween} Returns this.
   */
  to(values = {}, duration = 0.250) {
    this.mValues = values;

    this.mDuration = duration;

    this.mInitiated = false;

    return this;
  }

  /**
   * Pauses current tween.
   *
   * @return {Tween} Returns this.
   */
  pause() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPaused = true;
    this.mPausedTime = Black.instance.uptime;

    return this;
  }

  /**
   * @private
   * @return {void} Description
   */
  __resume() {
    if (!this.mIsPaused)
      return;

    this.mIsPaused = false;
    this.mStartTime += Black.instance.uptime - this.mPausedTime;
  }


  /**
   * @protected
   * @return {void}
   */
  removeFromParent() {
    if (this.mIsPlaying)
      this.stop();

    super.removeFromParent();
  }

  // /**
  //  * @return {void}
  //  */
  // dispose() {
  //   this.remove();
  // }

  /**
   * Sets the number of times the tween wiil be repeated after first execution.
   *
   * @return {Tween} Returns this.
   */
  repeat(times) {
    this.mRepeatTimes = times;

    return this;
  }

  /**
   * Sets if tween should be looped over.
   *
   * @return {Tween} Return this.
   */
  loop(value = true) {
    this.mRepeatTimes = value ? Infinity : 0;
    return this;
  }

   /**
   * Enables/disables reversing of tween values.
   *
   * @return {Tween} Returns this.
   */
  reverse(value = true) {
    this.mReverse = value;
    return this;
  }

  /**
   * Add specified tween object into the queue. The specified tween will be executed after completation of this tween,
   *
   * @return {Tween} Returns this.
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
   * @override
   * @protected
   * @param  {GameObject} gameObject
   * @return {void}
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.__start(Black.instance.uptime);
    }
  }

  /**
   * @private
   * @param {number} t
   *
   * @return {void}
   */
  __update(t) {

  }

  /**
   * Updates tween values.
   *
   * @param {Object} values The Object to get values from.
   * @return {void}
   */
  set(values) {
    this.mValues = values;

    for (let f in this.mValues)
      this.mValuesStart[f] = parseFloat(this.gameObject[f]);
  }

  /**
   * @protected
   * @override
   * @param {number} dt
   *
   * @returns {void}
   */
  onPostUpdate(dt){
    let t = Time.time;

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
      if (this.mRepeatTimes-- > 0) {
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
          this.removeFromParent();
        } else {
          for (let f in this.mValues) {
            this.mValuesStart[f] = this.mValues[f];
          }

          this.mStarted = false;
        }
      }
    }
  }
}
