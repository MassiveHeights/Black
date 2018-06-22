/**
 * A tweening component.
 *
 * @fires Tween#start
 * @fires Tween#update
 * @fires Tween#loop
 * @fires Tween#complete 
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
  constructor(values, duration = 0.250, properties = null, plugins = null) {
    super();

    /** @private @dict */
    this.mValues = values;

    /** @private @type {number} */
    this.mDuration = duration;

    /** @private @dict */
    this.mProperties = properties;

    /** @private @dict */
    this.mPlugins = plugins;

    /** @private @type {boolean} */
    this.mIsPlaying = false;

    /** @private @type {boolean} */
    this.mIsPaused = false;

    /** @private @type {number} */
    this.mStartTime = 0;

    /** @private @type {number} */
    this.mPausedTime = 0;

    /** @private @dict */
    this.mValuesStart = {};

    /** @private @type {number} */
    this.mElapsed = 0;

    /** @private @type {function (Array, number):number} */
    this.mInterpolation = Interpolation.linear;

    /** @private @type {number} */
    this.mDelay = 0;

    /** @private @type {number} */
    this.mRepeatDelay = 0;

    /** @private @type {number} */
    this.mRepeats = 0;

    /** @private @type {boolean} */
    this.mInitiated = false;

    /** @private @type {boolean} */
    this.mStarted = false;

    /** @private @type {boolean} */
    this.mReversed = false;

    /** @private @type {boolean} */
    this.mYoyo = false;

    /** @private @type {boolean} */
    this.mIsYoyoBack = false;

    /** @private @type {boolean} */
    this.mReverseOnInit = false;

    /** @private @type {boolean} */
    this.mRemoveOnComplete = true;

    /** @private @type {boolean} */
    this.mPlayOnAdded = true;

    /** @private @type {function(number):number} */
    this.mEase = Tween.DEFAULT_EASE;

    // TODO: fix ESDOC issue
    if (this.mProperties !== null) {
      for (let f in this.mProperties) {
        this[f] = /** @dict */ (this.mProperties[f]);
      }
    }
  }

  /**
   * Sets/Gets active ease function.
   *
   * @return {function(number):number}
   */
  get ease() {
    return this.mEase;
  }

  /**
   * @ignore
   * @param {function(number):number} value The easing function.
   * @return {void}
   */
  set ease(value) {
    this.mEase = value;
  }

  /**
   * Sets/Gets the interpolation algorithm. Possible values Interpolation.linear, Interpolation.bezier, Interpolation.catmullRom or your custom function.
   *
   * @return {function(Array, number):number}
   */
  get interpolation() {
    return this.mInterpolation;
  }

  /**
   * @ignore
   * @param {function(Array, number):number} value The interpolation function.
   * @return {void}
   */
  set interpolation(value) {
    this.mInterpolation = value;
  }

  /**
   * Time elapsed since tween start in seconds.
   *
   * @readonly
   * @return {number}
   */
  get elapsed() {
    return this.mElapsed;
  }

  /**
   * Sets/Gets amount of seconds to wait before tweening.
   *
   * @return {number}
   */
  get delay() {
    return this.mDelay;
  }

  /**
   * @ignore
   * @param {number} value Seconds to wait.
   * @return {void}
   */
  set delay(value) {
    this.mDelay = value;
  }

  /**
   * Gets/Sets the number of times the tween will be repeated after first execution.
   *
   * @return {number}
   */
  get repeats() {
    return this.mRepeats;
  }

  /**
   * @ignore
   * @param {number} value Number of times.
   * @return {void}
   */
  set repeats(value) {
    this.mRepeats = value;
  }

  /**
   * Sets/Gets amount of seconds to wait between repeats.
   *
   * @return {number}
   */
  get repeatDelay() {
    return this.mRepeatDelay;
  }

  /**
   * @ignore
   * @param {number} value Seconds to wait.
   * @return {void}
   */
  set repeatDelay(value) {
    this.mRepeatDelay = value;
  }

  /**
   * Gets/Sets if tween should be looped over.
   *
   * @return {boolean}
   */
  get loop() {
    return this.mRepeats === Infinity;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set loop(value) {
    this.mRepeats = value ? Infinity : 0;
  }

  /**
   * Enables/disables reversing between repeats.
   *
   * @return {boolean}
   */
  get yoyo() {
    return this.mYoyo;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set yoyo(value) {
    this.mYoyo = value;
  }

  /**
   * Enables/disables reversed playback on start.
   *
   * @return {boolean}
   */
  get reversed() {
    return this.mReversed;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set reversed(value) {
    this.mReversed = value;
  }

  /**
   * Sets/Gets whether the Tween Component should be automatically detached from owner GameObject after completion.
   *
   * @return {boolean}
   */
  get removeOnComplete() {
    return this.mRemoveOnComplete;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set removeOnComplete(value) {
    this.mRemoveOnComplete = value;
  }

  /**
   * Sets/Gets whether the tween should start playing automatically when added to the root.
   * 
   * @return {boolean}
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  /**
   * Sets/Gets optional object with custom interpolation handler function for specific target properties.
   * 
   * @return {Object}
   */
  get plugins() {
    return this.mPlugins;
  }

  /**
   * @ignore
   * @param {Object} value
   * @return {void}
   */
  set plugins(value) {
    this.mPlugins = value;
  }

  /**
   * Gets this tween duration.
   * 
   * @return {number}
   */
  get duration() {
    return this.mDuration;
  }

  /**
   * Indicated whether the tween is playing and not paused.
   * 
   * @return {boolean}
   */
  get isPlaying() {
    return this.mIsPlaying === true && this.mIsPaused === false;
  }

  /**
   * @private
   * @param {number} t
   * @return {void}
   */
  __start(t) {
    this.mIsPlaying = true;
    this.mStartTime = t + this.mDelay;
    this.__collectStartingValues();
  }

  /**
   * Starts tweening.
   *
   * @return {Tween} Returns this.
   */
  play() {
    if (!this.mIsPaused) {
      this.__start(Time.now);
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
   * Resets current tween.
   *
   * @return {Tween} Returns this.
   */
  reset() {
    this.mElapsed = 0;
    if (this.mIsPlaying)
      this.play();

    return this;
  }

  /**
   * Sets the values for tweening.
   *
   * @param {Object} values Values to tween.
   * @param {number} [duration=0.25] Duration in seconds.
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
    this.mPausedTime = Time.now;

    return this;
  }

  /**
   * @ignore
   * @private
   * @return {void} Description
   */
  __resume() {
    if (!this.mIsPaused)
      return;

    this.mIsPaused = false;
    this.mStartTime += Time.now - this.mPausedTime;
  }


  /**
   * @inheritDoc
   */
  removeFromParent() {
    if (this.mIsPlaying)
      this.stop();

    super.removeFromParent();
  }

  /**
   * Add specified tween object into the queue. The specified tween will be executed after completion of this tween,
   *
   * @return {Tween} Returns tween to chain.
   */
  chain(tween) {
    if (!tween) {
      return this;
    }

    this.mRemoveOnComplete = false;
    tween.playOnAdded = false;

    this.on(Message.COMPLETE, () => {
      tween.play();
    });

    return tween;
  }

  /**
   * @inheritDoc
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.__start(Time.now);
    }
  }

  /**
   * @private
   * @param {number} t
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
   * Switches end values with start values.
   *
   * @param {boolean} asYoyo Indicates wether easing function should be also reversed.
   * @return {Tween} Returns this.
   */
  reverse(asYoyo = false) {
    if (this.mInitiated) {
      this.__reverse();
    } else {
      this.mReverseOnInit = true;
    }

    if (asYoyo)
      this.mIsYoyoBack = !this.mIsYoyoBack;

    return this;
  }

  /**
   * @private
   * @return {void}
   */
  __reverse() {
    for (let f in this.mValues) {
      [this.mValues[f], this.mValuesStart[f]] = [this.mValuesStart[f], this.mValues[f]];
    }
  }

  onRender() {
    if (Black.numUpdates !== 0)
      return;

    let time = Time.now;

    if (time < this.mStartTime || this.mIsPlaying === false || this.mIsPaused === true)
      return;

    if (this.mStarted === false || this.mInitiated === false)
      return;

    this.mElapsed = (time - this.mStartTime) / this.mDuration;

    if (this.mElapsed > 1)
      this.mElapsed = 1;

    let t = this.mEase(this.mIsYoyoBack ? 1 - this.mElapsed : this.mElapsed);

    for (let f in this.mValues) {
      let start = /** @type {number} */ (this.mValuesStart[f]);
      let end = /** @type {number|Array} */ (this.mValues[f]);

      if (this.mPlugins !== null && this.mPlugins.hasOwnProperty(f)) {
        let toLerp = Array.isArray(end) ? end : [start, end];
        this.gameObject[f] = Interpolation.linear(toLerp, t, this.mPlugins[f]);
      } else if (Array.isArray(end)) {
        this.gameObject[f] = this.mInterpolation(end, t);
      } else {
        this.gameObject[f] = /** @type {number} */ (start + (/** @type {number} */(end) - start) * (this.mIsYoyoBack ? 1 - t : t));
      }
    }
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    let t = Time.now;

    if (t < this.mStartTime || this.mIsPlaying === false || this.mIsPaused === true)
      return;

    this.mElapsed = (t - this.mStartTime) / this.mDuration;

    if (this.mElapsed > 1)
      this.mElapsed = 1;

    let tt = this.mEase(this.mIsYoyoBack ? 1 - this.mElapsed : this.mElapsed);

    for (let f in this.mValues) {
      let start = /** @type {number} */ (this.mValuesStart[f]);
      let end = /** @type {number|Array} */ (this.mValues[f]);

      if (this.mPlugins !== null && this.mPlugins.hasOwnProperty(f)) {
        let toLerp = Array.isArray(end) ? end : [start, end];
        this.gameObject[f] = Interpolation.linear(toLerp, tt, this.mPlugins[f]);
      } else if (Array.isArray(end)) {
        this.gameObject[f] = this.mInterpolation(end, tt);
      } else {
        this.gameObject[f] = /** @type {number} */ (start + (/** @type {number} */(end) - start) * (this.mIsYoyoBack ? 1 - tt : tt));
      }
    }

    /**
     * Posted on every tween update. 
     * Note: tween can update object values inside `onRender` method without posting `Tween#update` message.
     * @event Tween#update
     */
    this.post(Message.UPDATE, this.gameObject);

    if (this.mElapsed === 1) {
      if (this.mRepeats-- > 0) {
        if (this.mYoyo === true) {
          this.reverse(true);
        }

        this.mStartTime = t + this.mRepeatDelay;

        /**
         * Posted everytime tween is repeating.
         * @event Tween#loop
         */
        this.post('loop', this.gameObject);
      } else {
        this.mIsPlaying = false;

        /**
         * Posten when tween is finished.
         * @event Tween#complete
         */
        this.post(Message.COMPLETE, this.gameObject);

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

  __collectStartingValues() {
    if (this.mStarted === false) {
      this.mStarted = true;

      /**
       * Posted when tween started.
       * @event Tween#start
       */
      this.post('start', this.gameObject);

      for (let f in this.mValues) {
        if (!this.mInitiated && Array.isArray(this.mValues[f])) {
          this.mValues[f] = [this.gameObject[f]].concat(this.mValues[f]);
        }
        this.mValuesStart[f] = parseFloat(this.gameObject[f]);
      }

      if (this.mReversed === true || this.mReverseOnInit === true)
        this.__reverse();

      this.mInitiated = true;
    }

  }
}

/**
 * Ease to be used in all tweens, if another ease is not specified. `Ease.smootherStep`.
 *
 * @public
 * @type {function(number):number}
 * @nocollapse
 */
Tween.DEFAULT_EASE = Ease.smootherStep;