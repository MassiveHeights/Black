/* @echo EXPORT */
class Animation {
  /**
   * constructor - creates an instance of  Animation class
   *
   * @param {AnimationController}    controller  Animation controller
   * @param {string}    name        Name
   * @param {Array<Texture>}    frames      Array of Texture associated with frames
   * @param {number}  [fps=14]    FPS, must be greater than 0
   * @param {boolean} [loop=true] Flag to specify whether animation will be playing in loop
   */
  constructor(controller, name, frames, fps = 14, loop = true) {
    Assert.is(fps > 0, 'FPS must be greater than 0.');

    this.mController = controller;

    /** @member @private @type {string} */
    this.mName = name;

    /** @member @private @type {Array<Texture>} */
    this.mFrames = frames;

    /** @member @private @type {number} */
    this.mCurrentFrame = 0;

    /** @member @private @type {number} */
    this.mNextFrameAt = 0;

    /** @member @private @type {number} */
    this.mFPS = fps;

    /** @member @private @type {number} */
    this.mFrameDuration = 1 / this.mFPS;

    /** @member @private @type {boolean} */
    this.mLoop = loop;

    /** @member @private @type {boolean} */
    this.mPaused = false;

    /** @member @private @type {number} */
    this.mElapsed = 0;

    /** @member @private @type {boolean} */
    this.mStopped = false;

    /** @member @private @type {boolean} */
    this.mCompleted = false;
  }

  /**
   * Plays animation. If Animation is completed, current frame is reset to 0.
   *
   *
   * @return {Texture} Texture associated with current frame.
   */
  play() {
    if (this.mCompleted === true) {
      this.mCurrentFrame = 0;
      this.mElapsed = 0;
    }

    this.mPaused = false;
    this.mStopped = false;
    this.mCompleted = false;

    this.mNextFrameAt = Black.instance.uptime + this.mFrameDuration - this.mElapsed;
    this.mElapsed = 0;

    return this.mFrames[this.mCurrentFrame];
  }

  /**
   *  Stops animation and resets the value of current frame.
   *
   * @return {void}
   */
  stop() {
    this.mStopped = true;
    this.mCurrentFrame = 0;
  }

  /**
   * Pauses animation.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;
    this.mElapsed = this.mNextFrameAt - Black.instance.uptime;
  }

  /**
   * @ignore
   * @param {number} dt
   * @param {number} t
   *
   * @return {Texture|null}
   */
  __update(dt, t) {
    if (t < this.mNextFrameAt || this.mPaused === true || this.mStopped === true || this.mCompleted === true)
      return null;

    this.mCurrentFrame++;

    if (this.mCurrentFrame >= this.mFrames.length) {
      if (this.mLoop === true) {
        this.mCurrentFrame = 0;
      }
      else {
        this.mCurrentFrame = this.mFrames.length - 1;
        this.mController.sendMessage('complete', this);
        this.mCompleted = true;
        return null;
      }
    }

    this.mNextFrameAt = Black.instance.uptime + this.mFrameDuration;
    let texture = this.mFrames[this.mCurrentFrame];
    return texture;
  }

  /**
   * Gets/Sets annimation speed in Frames per Second
   *
   * @return {number}
   */
  get fps() {

    return this.mFPS;
  }

  /**
   *@ignore
   *
   * @param  {number} value
   * @return {void}
   */
  set fps(value) {
    Assert.is(value > 0, 'FPS must be greater than 0.');

    this.mFPS = value;
    this.mFrameDuration = 1 / this.mFPS;

    // update next frame start time
    let diff = this.mNextFrameAt - Black.instance.uptime;
    this.mNextFrameAt += diff;
  }

  /**
   * Gets/Sets loop flag. If true, animation will be looping (starting over after finishing)
   *
   * @return {boolean}
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * @ignore
   *
   * @param {boolean} value New value of Loop flag.
   *
   * @return {void}
   */
  set loop(value) {
    this.mLoop = value;
  }

  /**
   * Gets array of Texture.
   *
   * @return {Array<Texture>} current value of Texture array.
   */
  get frames() {
    return this.mFrames;
  }

  /**
   * Returns true if Animation is playing (neither stopped nor paused).
   *
   * @return {boolean}
   */
  get isPlaying(){
    return this.mPaused === false && this.mStopped === false;
  }

  /**
   * Returns true if animation is completed.
   *
   * @return {boolean}
   */
  get isComplete(){
    return this.mCompleted;
  }

  /**
   *  Returns name.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }
}
