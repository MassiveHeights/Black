/* @echo EXPORT */
class Animation {
  /**
   * constructor - Description
   *
   * @param {AnimationController}    controller  Description
   * @param {string}    name        Description
   * @param {Array<Texture>}    frames      Description
   * @param {number}  [fps=14]    Description
   * @param {boolean} [loop=true] Description
   */
  constructor(controller, name, frames, fps = 14, loop = true) {
    Assert.is(fps > 0, 'FPS must be greater than 0.');

    this.mController = controller;

    /** @type {string} */
    this.mName = name;

    /** @type {Array<Texture>} */
    this.mFrames = frames;

    /** @type {number} */
    this.mCurrentFrame = 0;

    /** @type {number} */
    this.mNextFrameAt = 0;

    /** @type {number} */
    this.mFPS = fps;

    /** @type {number} */
    this.mFrameDuration = 1 / this.mFPS;

    /** @type {boolean} */
    this.mLoop = loop;

    /** @type {boolean} */
    this.mPaused = false;

    /** @type {number} */
    this.mElapsed = 0;

    /** @type {boolean} */
    this.mStopped = false;

    /** @type {boolean} */
    this.mCompleted = false;
  }


  /**
   * play - Description
   *
   * @return {Texture} Description
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
   * stop - Description
   *
   * @return {void} Description
   */
  stop() {
    this.mStopped = true;
    this.mCurrentFrame = 0;
  }


  /**
   * pause - Description
   *
   * @return {void} Description
   */
  pause() {
    this.mPaused = true;
    this.mElapsed = this.mNextFrameAt - Black.instance.uptime;
  }


  /**
   * __update - Description
   *
   * @param {number} dt Description
   * @param {number} t  Description
   *
   * @return {Texture|null} Description
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
        this.mController.post('complete', this);
        this.mCompleted = true;
        return null;
      }
    }

    this.mNextFrameAt = Black.instance.uptime + this.mFrameDuration;
    let texture = this.mFrames[this.mCurrentFrame];
    return texture;
  }

  /**
   * fps - Description
   *
   * @return {number} Description
   */
  get fps() {
    return this.mFPS;
  }

  /**
   * fps - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
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
   * loop - Description
   *
   * @return {boolean} Description
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * loop - Description
   *
   * @param {boolean} value Description
   *
   * @return {void} Description
   */
  set loop(value) {
    this.mLoop = value;
  }


  /**
   * frames - Description
   *
   * @return {Array<Texture>} Description
   */
  get frames() {
    return this.mFrames;
  }


  /**
   * playing - Description
   *
   * @return {boolean} Description
   */
  get isPlaying(){
    return this.mPaused === false && this.mStopped === false;
  }

  /**
   * playing - Description
   *
   * @return {boolean} Description
   */
  get isComplete(){
    return this.mCompleted;
  }

  get name() {
    return this.mName;
  }
}
