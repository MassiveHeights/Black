import { Debug } from "../core/Debug";
import { Message } from "../messages/Message";
import { Time } from "../core/Time";
import { Black } from "../Black";

/**
 * Holds details about sprite animation.
 *
 * @fires AnimationInfo#complete
 * @cat animation
 */
export class AnimationInfo {
  /**
   * Creates an instance of Animation class
   *
   * @param {black-engine~AnimationController}    controller  Animation controller
   * @param {string}                 name        The name of animation
   * @param {Array<black-engine~Texture>}         frames      Array of Textures for this animation
   * @param {number}                 [fps=14]    Frame rate
   * @param {boolean}                [loop=true] Is animations should be looped
   */
  constructor(controller, name, frames, fps = 14, loop = true) {
    Debug.assert(fps > 0, 'FPS must be greater than 0.');

    /**
     * @private
     * @type {black-engine~AnimationController}
     */
    this.mController = controller;

    /**
     * @private
     * @type {string}
     */
    this.mName = name;

    /**
     * @private
     * @type {Array<black-engine~Texture>}
     */
    this.mFrames = frames;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentFrame = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNextFrameAt = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFPS = fps;

    /**
     * @private
     * @type {number}
     */
    this.mFrameDuration = 1 / this.mFPS;

    /**
     * @private
     * @type {boolean}
     */
    this.mLoop = loop;

    /**
     * @private
     * @type {boolean}
     */
    this.mPaused = false;

    /**
     * @private
     * @type {number}
     */
    this.mElapsed = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mStopped = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mCompleted = false;
  }

  /**
   * Plays animation. If Animation is completed, current frame is reset to 0.
   * 
   * @ignore
   * @return {black-engine~Texture} Returns the current frame Texture.
   */
  __play() {
    if (this.mCompleted === true) {
      this.mCurrentFrame = 0;
      this.mElapsed = 0;
    }

    this.mPaused = false;
    this.mStopped = false;
    this.mCompleted = false;

    this.mNextFrameAt = Black.time.now + this.mFrameDuration - this.mElapsed;
    this.mElapsed = 0;

    return this.mFrames[this.mCurrentFrame];
  }

  /**
   * Stops animation and resets the value of current frame.
   *
   * @ignore
   * @return {void}
   */
  __stop() {
    this.mStopped = true;
    this.mCurrentFrame = 0;
  }

  /**
   * Pauses animation.
   *
   * @ignore
   * @return {void}
   */
  __pause() {
    this.mPaused = true;
    this.mElapsed = this.mNextFrameAt - Black.time.now;
  }

  /**
   * @ignore
   * @return {black-engine~Texture|null}
   */
  __update() {
    let t = Black.time.now;
    let dt = Black.time.dt;
    
    if (t < this.mNextFrameAt || this.mPaused === true || this.mStopped === true || this.mCompleted === true)
      return null;

    this.mCurrentFrame++;

    if (this.mCurrentFrame >= this.mFrames.length) {
      if (this.mLoop === true) {
        this.mCurrentFrame = 0;
      } else {
        this.mCurrentFrame = this.mFrames.length - 1;

        /**
         * Post messages when animation reach its end.
         *
         * @event AnimationInfo#complete
         */
        this.mController.post(Message.COMPLETE, this);
        this.mCompleted = true;
        return null;
      }
    }

    this.mNextFrameAt = Black.time.now + this.mFrameDuration;
    return this.mFrames[this.mCurrentFrame];
  }

  /**
   * Get/Set animation speed in frames per second.
   *
   * @return {number}
   */
  get fps() {
    return this.mFPS;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set fps(value) {
    Debug.assert(value > 0, 'FPS must be greater than 0.');

    this.mFPS = value;
    this.mFrameDuration = 1 / this.mFPS;

    // update next frame start time
    this.mNextFrameAt += this.mNextFrameAt - Black.time.now;
  }

  /**
   * Get/Set if animation should be looped.
   * @return {boolean}
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set loop(value) {
    this.mLoop = value;
  }

  /**
   * Gets array of Texture.
   *
   * @return {Array<black-engine~Texture>}
   */
  get frames() {
    return this.mFrames;
  }

  /**
   * Returns true if Animation is playing (neither stopped nor paused).
   *
   * @return {boolean}
   */
  get isPlaying() {
    return this.mPaused === false && this.mStopped === false;
  }

  /**
   * Returns true if animation is completed.
   *
   * @return {boolean}
   */
  get isComplete() {
    return this.mCompleted;
  }

  /**
   * Returns name of this animation.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }
}
