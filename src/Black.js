/**
 * THE BLACK ENGINE ITSELF.
 *
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Black extends MessageDispatcher {

  /**
   * Creates a new Black instance.
   * @param {string}                          containerElementId The id of an DOM element.
   * @param {function(new: GameObject)}       rootClass          Type name of an GameObject to start execution from.
   * @param {function(new: VideoNullDriver)}  [videoDriverClass] Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   */
  constructor(containerElementId, rootClass, videoDriverClass) {
    super();

    // Dirty GCC workaround
    window['Black'] = {};
    window['Black']['instance'] = this;

    console.log('%c                         >>> BLACK <<<                         ', 'background: #000; color: #fff;');

    /**
     * @private
     * @type {string}
     */
    this.mContainerElementId = containerElementId;

    /**
     * @private
     * @type {HTMLElement}
     */
    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    /**
     * @private
     * @type {function(new: VideoNullDriver)}
     */
    this.mVideoDriverClass = videoDriverClass;

    /**
     * @private
     * @type {number}
     */
    this.mStageWidth = this.mContainerElement.clientWidth;

    /**
     * @private
     * @type {number}
     */
    this.mStageHeight = this.mContainerElement.clientHeight;

    /**
     * @private
     * @type {number}
     */
    this.mSimulationTimestep = 1000 / 60;

    /**
     * @private
     * @type {number}
     */
    this.mUptime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFrameAccum = 0;

    /**
     * @private
     * @type {number}
     */
    this.mLastFrameTimeMs = 0;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFPS = 60;

    /**
     * @private
     * @type {number}
     */
    this.mLastFpsUpdate = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFramesThisSecond = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNumUpdateSteps = 0;

    /**
     * @private
     * @type {number}
     */
    this.mMinFrameDelay = 0;

    /**
     * @private
     * @type {Array<System>}
     */
    this.mSystems = [];

    /**
     * @private
     * @type {boolean}
     */
    this.mIsRunning = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsStarted = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPanic = false;

    /**
     * @private
     * @type {number}
     */
    this.mLastFrameUpdateTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mLastFrameRenderTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.mRAFHandle = -1; // not sure

    /**
     * @private
     * @type {Viewport}
     */
    this.mViewport = null;

    /**
     * @private
     * @type {VideoNullDriver}
     */
    this.mVideo = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mPaused = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mUnpausing = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mPauseOnHide = true;

    /**
     * @private
     * @type {boolean}
     */
    this.mPauseOnBlur = true;

    /**
     * @private
     * @type {Object<string, Array>}
     */
    this.mTagCache = {};

    /**
     * @private
     * @type {function(new: GameObject)|null}
     */
    this.mRootClass = rootClass;

    /**
     * @private
     * @type {GameObject|null}
     */
    this.mRoot = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mEnableFixedTimeStep = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mWasStopped = false;
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;
  }

  /**
   * Resumes update execution.
   *
   * @return {void}
   */
  resume() {
    this.mUnpausing = true;
  }

  /**
   * @private
   * @returns {void}
   */
  __bootViewport() {
    this.mViewport = new Viewport(this.mContainerElement);
  }

  /**
   * @private
   * @returns {void}
   */
  __bootSystems() {
    this.addSystem(new Input());
  }

  /**
   * @private
   * @returns {void}
   */
  __bootStage() {
    window.onblur = event => this.__onVisbilityChange(event);
    window.onfocus = event => this.__onVisbilityChange(event);
    window.onpagehide = event => this.__onVisbilityChange(event);
    window.onpageshow = event => this.__onVisbilityChange(event);

    if (document.hidden && this.mPauseOnHide === true)
      this.mPaused = true;
  }

  /**
   * @private
   * @returns {void}
   */
  __onVisbilityChange(event) {
    let type = event.type;

    if (type === 'blur' && this.mPauseOnBlur === true)
      this.mPaused = true;
    else if (type === 'pagehide' && this.mPauseOnHide === true)
      this.mPaused = true;
    else if (type === 'focus' || type === 'pageshow') {
      if (document.hidden === false)
        this.mUnpausing = true;
    }
  }

  /**
   * Adds a given system to the execution list.
   *
   * @param  {System} system The System object you want to add.
   * @return {System}
   */
  addSystem(system) {
    this.mSystems.push(system);
    return system;
  }

  /**
   * Removes the given system from execution list.
   *
   * @param {System} system The System instance to remove.
   * @return {System|null}
   */
  removeSystem(system) {
    // TODO: remove system on next frame
    var ix = this.mSystems.indexOf(system);
    if (ix === -1)
      return null;

    this.mSystems.splice(ix, 1);
    return system;
  }

  /**
   * @private
   * @returns {void}
   */
  __bootVideo() {
    this.mVideo = new this.mVideoDriverClass(this.mContainerElement, this.mStageWidth, this.mStageHeight);
  }

  /**
   * Boots up the engine!
   *
   * @return {void}
   */
  start() {
    if (this.mWasStopped === true) {
      Debug.error('Black engine cannot be re-started.');
      return;
    }

    this.constructor.instance = this;

    if (this.mIsStarted === true)
      return;

    this.__bootViewport();
    this.__bootSystems();
    this.__bootVideo();
    this.__bootStage();

    this.mRoot = new this.mRootClass();
    this.mRoot.name = 'root';
    this.mRoot.mAdded = true; // why are not added actually?
    this.mRoot.onAdded();

    const self = this;

    this.mIsStarted = true;
    this.mVideo.start();

    this.mRAFHandle = requestAnimationFrame(function (timestamp) {
      // TODO: do first update here
      self.mIsRunning = true;

      self.mLastFrameTimeMs = timestamp;
      self.mLastFpsUpdate = timestamp;
      self.mFramesThisSecond = 0;

      // Start the main loop.
      self.mRAFHandle = requestAnimationFrame((x) => {
        self.__update(x);
      });
    });

    // TODO: show only when needed, eg required by any system
    if (this.mEnableFixedTimeStep === false)
      Debug.info('Fixed time-step is disabled, some systems may not work.');
  }

  /**
   * Stops any executions, destroys resources and scene.
   *
   * @return {void}
   */
  stop() {
    this.mIsStarted = false;
    this.mIsRunning = false;
    cancelAnimationFrame(this.mRAFHandle);

    console.log('%c                        <<< BUY BUY >>>                        ', 'background: #000; color: #fff;');
  }

  /**
   * @private
   * @param {number} timestamp
   *
   * @return {void}
   */
  __update(timestamp) {
    // TODO: this method seems to be totaly broken. maxAllowedFPS is not working correctly
    this.constructor.instance = this;

    const self = this;

    if (this.mPaused === true && this.mUnpausing === true) {
      this.mUnpausing = this.mPaused = false;

      this.mLastFrameTimeMs = 0;
      this.mLastFpsUpdate = timestamp;
      this.mLastFrameTimeMs = timestamp;
      this.mCurrentTime = 0; // same as first update
      this.mFrameAccum = 0;
    }

    if (timestamp < this.mLastFrameTimeMs + this.mMinFrameDelay) {
      this.mRAFHandle = window.requestAnimationFrame(this.__update.bind(this));
      return;
    }

    if (this.mPaused === false) {
      this.mFrameAccum += (timestamp - this.mLastFrameTimeMs);
      this.mLastFrameTimeMs = timestamp;

      // BEGIN
      if (timestamp > this.mLastFpsUpdate + 1000) {
        this.mFPS = this.mFramesThisSecond;

        this.mLastFpsUpdate = timestamp;
        this.mFramesThisSecond = 0;
      }
      this.mFramesThisSecond++;

      this.mNumUpdateSteps = 0;

      // fix first update
      if (this.mCurrentTime === 0)
        this.mCurrentTime = timestamp - this.mMinFrameDelay;

      const dt = Time.scale * ((timestamp - this.mCurrentTime) * 0.001);
      this.mCurrentTime = timestamp;
      Time.mDeltaTime = dt;

      if (this.mEnableFixedTimeStep === true) {
        while (this.mFrameAccum >= this.mSimulationTimestep) {
          this.__internalFixedUpdate(this.mSimulationTimestep * 0.001);

          this.mFrameAccum -= this.mSimulationTimestep;

          if (++this.mNumUpdateSteps >= (60 * 3)) { // 3 seconds window
            console.log('[BLACK]: Not enough time to calculate update logic.');
            this.mIsPanic = true;
            break;
          }
        }
      }

      this.__internalUpdate(dt);
      this.__internalPostUpdate(dt);

      this.mVideo.beginFrame();
      this.mRoot.__render(this.mVideo, this.mUptime, 1, BlendMode.AUTO);
      this.mVideo.endFrame();

      // TODO: remove uptime
      this.mUptime += dt;
      Time.mTime = this.mUptime;

      this.mIsPanic = false;
    }

    this.mRAFHandle = window.requestAnimationFrame(this.__update.bind(this));
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalFixedUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onFixedUpdate(dt);

    this.mRoot.__fixedUpdate(dt);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate(dt, this.mUptime);

    this.mRoot.__update(dt);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalPostUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate(dt, this.mUptime);

    this.mRoot.__postUpdate(dt);
  }

  /**
   * Returns the root GameObject.
   * @return {GameObject}
   */
  get root() {
    return this.mRoot;
  }

  /**
   * Returns current video driver instance.
   * @return {VideoNullDriver}
   */
  get video() {
    return this.mVideo;
  }

  /**
   * If `enableFixedTimeStep` is set to `true` returns number of milliseconds fixed-time-step will run over.
   * @return {number}
   */
  get simulationTimestep() {
    return this.mSimulationTimestep;
  }

  /**
   * Sets the number of milliseconds for fixed-time-step to run over.
   *
   * @param {number} timestep
   * @return {void}
   */
  set simulationTimestep(timestep) {
    this.mSimulationTimestep = timestep;
  }

  /**
   * Returns current frame rate
   * @return {number}
   */
  get FPS() {
    return this.mFPS;
  }

  /**
   * Returns max number of updates engine must do in a second.
   * @return {number}
   */
  get maxAllowedFPS() {
    return 1000 / this.mMinFrameDelay;
  }

  /**
   * maxAllowedFPS - Sets the number of update engine must do per second.
   * @param {number} fps The max allowed FPS. If less then zero engine will be stopped.
   * @return {void}
   */
  set maxAllowedFPS(fps) {
    if (fps <= 0)
      this.stop();
    else
      this.mMinFrameDelay = 1000 / fps;
  }

  /**
   * Returns the current viewport instance. Used to get size of a game screen, or listen for resize messages.
   * @return {Viewport}
   */
  get viewport() {
    return this.mViewport;
  }

  /**
   * Retruns the DOM element the engine runs in.
   * @return {Element}
   */
  get containerElement() {
    return this.mContainerElement;
  }

  /**
   * Returns amount of seconds since engine start.
   * @return {number}
   */
  get uptime() {
    return this.mUptime;
  }

  /**
   * @protected
   * @param {GameObject} child
   * @param {string|null} oldTag
   * @param {string|null} newTag
   *
   * @return {void}
   */
  onTagUpdated(child, oldTag, newTag) {
    if (oldTag !== null) {
      let arr = this.mTagCache[oldTag];
      arr.splice(arr.indexOf(child), 1);

      if (arr.length === 0)
        delete this.mTagCache[oldTag];
    }

    if (newTag !== null) {
      if (this.mTagCache.hasOwnProperty(newTag) === false)
        this.mTagCache[newTag] = [];

      this.mTagCache[newTag].push(child);
    }
  }

  /**
   * @protected
   * @param  {GameObject} child
   * @return {void}
   */
  onChildrenAdded(child) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenAdded(child);

    GameObject.forEach(child, (x) => {
      if (x.mAdded === true)
        return;

      this.onTagUpdated(x, null, x.mTag);

      x.mAdded = true;
      x.onAdded();

      for (let i = 0; i < x.mComponents.length; i++) {
        let c = x.mComponents[i];

        if (c.mAdded === true)
          continue;

        c.mAdded = true;
        c.onAdded(x);
      }
    });
  }

  /**
   * @protected
   * @param  {GameObject} child
   * @return {void}
   */
  onChildrenRemoved(child) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenRemoved(child);

    GameObject.forEach(child, (x) => {
      if (x.mAdded === true) {
        this.onTagUpdated(x, x.mTag, null);

        x.mAdded = false;
        x.onRemoved();

        for (let i = 0; i < x.mComponents.length; i++) {
          let c = x.mComponents[i];

          if (c.mAdded === false)
            continue;

          c.mAdded = false;
          c.onRemoved(x);
        }
      }
    });
  }

  /**
   * @protected
   * @param  {GameObject} child
   * @param  {Component} component
   * @return {void}
   */
  onComponentAdded(child, component) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentAdded(child, component);

    if (component.mAdded === true)
      return;

    component.mAdded = true;
    component.onAdded(child);
  }

  /**
   * @param  {GameObject} child
   * @param  {Component} component
   * @return {void}
   */
  onComponentRemoved(child, component) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentRemoved(child, component);

    if (component.mAdded === false)
      return;

    component.mAdded = false;
    component.onRemoved(child);
  }

  /**
   * Returns if engine should be automatically paused when window is hidden.
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * Sets if engine should be automatically paused when window is hidden.
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * Returns if engine should be automatically paused when container element is blured.
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
   * Sets if engine should be automatically paused when container element is blured.
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnBlur(value) {
    this.mPauseOnBlur = value;
  }


  /**
   * Returns if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
   * @return {boolean}
   */
  get enableFixedTimeStep() {
    return this.mEnableFixedTimeStep;
  }


  /**
   * Returns True if engine is paused.
   *
   * @returns {boolean}
   */
  get isPaused() {
    return this.mPaused;
  }

  /**
   * Sets if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
   *
   * @param {boolean} value
   * @return {void}
   */
  set enableFixedTimeStep(value) {
    this.mEnableFixedTimeStep = value;
  }

  dispose() {
    // todo: call dispose on eveyrthing!
  }

  get magic() {
    return Math.random();
  }
}