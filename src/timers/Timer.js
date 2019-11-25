import { Component } from "../core/Component";
import { Debug } from "../core/Debug";
import { Black } from "../Black";

/**
 * Timer component.
 *
 * @cat timers
 * 
 * @fires Timer#complete
 * @fires Timer#tick
 * 
 * @extends black-engine~Component
 */
export class Timer extends Component {
  constructor(interval = 1, ticksCount = 1, startOnAdded = true) {
    super();
    
    Debug.assert(interval > 0, 'the interval value must be greater than 0');
    Debug.assert(ticksCount > 0, 'the ticksCount value must be greater than 0');
    
    /** 
     * @private 
     * @type {boolean} 
     */
    this.mStartOnAdded = startOnAdded;

    /** 
     * @private 
     * @type {number} 
     */
    this.mInterval = interval;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTicksCount = ticksCount;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsRunning = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTick = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mElapsedSeconds = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTotalElapsedSeconds = 0;
  }

  /**
   * @inheritDoc
   */
  onAdded() {
    if (this.mStartOnAdded)
      this.start();
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    if (this.mIsRunning === false)
      return;

    this.mElapsedSeconds += Black.time.delta;
    this.mTotalElapsedSeconds += Black.time.delta;

    if (this.mElapsedSeconds >= this.mInterval) {
      this.mElapsedSeconds = 0;

      const ticksPerUpdate = Math.max(1, ~~(Black.time.delta / this.mInterval));
      for (let i = 0; i < ticksPerUpdate; i++) {
        this.mTick++;

        /**
        * Posted on every timer tick.
        * @event Timer#tick
        */
        this.post('tick', this.mTick);

        if (this.mTick >= this.mTicksCount) {
          this.mIsRunning = false;

          /**
           * Posted on timer complete.
           * @event Timer#complete
           */
          this.post('complete');
          return;
        }
      }
    }
  }

  /**
   * Start timer.
   *
   * @return {black-engine~Timer} Returns this.
   */
  start() {
    this.mIsRunning = true;
    return this;
  }

  /**
   * Stop and reset timer.
   *
   * @return {black-engine~Timer} Returns this.
   */
  stop() {
    this.mIsRunning = false;
    this.reset();
    return this;
  }

  /**
   * Pauses the timer.
   *
   * @return {black-engine~Timer} Returns this.
   */
  pause() {
    this.mIsRunning = false;
    return this;
  }

  /**
   * Reset timer.
   *
   * sets ticks elapsedSeconds and totalElapsedSeconds to 0
   * @return {black-engine~Timer} Returns this.
   */
  reset() {
    this.mTick = 0;
    this.mElapsedSeconds = 0;
    this.mTotalElapsedSeconds = 0;
    return this;
  }

  /** How many ticks left.
   *
   * @return {number} Returns this.
   */
  get ticksLeft() {
    return this.mTicksCount - this.mTick;
  }

  /** current tick index.
   *
   * @return {number} Returns this.
   */
  get currentTick() {
    return this.mTick;
  }

  /**
   * elapsed seconds from previous tick.
   *
   * @return {number}
   */
  get elapsedSeconds() {
    return this.mElapsedSeconds;
  }

  /** how many seconds left to the next tick.
   *
   * @return {number} Returns this.
   */
  get secondsToNextTick() {
    return this.mInterval - this.mElapsedSeconds;
  }

  /** If the timer is running, returns true, otherwise false.
   *
   * @return {boolean} Returns this.
   */
  get isRunning() {
    return this.mIsRunning === true;
  }

  /** If the number of ticks is less than the specified number, returns false, otherwise true.
   *
   * @return {boolean} Returns this.
   */
  get isComplete() {
    return this.mTick >= this.mTicksCount;
  }

  /**
   * Sets/Get the number of timer ticks.
   *
   * @return {number}
   */
  get ticksCount() {
    return this.mTicksCount;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set ticksCount(value) {
    Debug.assert(value > 0, 'the ticksCount value must be greater than 0');
    this.mTicksCount = value;
  }

  /**
   * Sets/Get the timer interval in seconds.
   *
   * @return {number}
   */
  get interval() {
    return this.mInterval;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set interval(value) {
    Debug.assert(value > 0, 'the interval value must be greater than 0');
    this.mInterval = value;
  }

  /**
   * total elapsed seconds.
   *
   * @return {number}
   */
  get totalElapsedSeconds() {
    return this.mTotalElapsedSeconds;
  }

  /**
   * Sets/Gets whether the timer should start automatically when added to the root.
   * 
   * @return {boolean}
   */
  get startOnAdded() {
    return this.mStartOnAdded;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set startOnAdded(value) {
    this.mStartOnAdded = value;
  }
}