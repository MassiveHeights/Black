/**
 * THE BLACK ENGINE ITSELF!
 *
 * @export
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Black extends MessageDispatcher {

  /**
   * Creates a new Black instance.
   * @param {string}                                                       containerElementId The id of an DOM element.
   * @param {function(new: GameObject)}                                    gameClass          Type name of an GameObject to start execution from.
   * @param {function(new: VideoNullDriver, HTMLElement, number, number)}  videoDriverClass   Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   * @param {Array<function(new: System)>  }                               systemClasses      The list of systems to be initialized with Black engine.
   */
  constructor(containerElementId, gameClass, videoDriverClass, systemClasses = null) {
    super();

    Black.instance = this;

    console.log('%c                         >>> BLACK <<<                         ', 'background: #000; color: #fff;');

    /** @private @type {string} */
    this.mContainerElementId = containerElementId;

    /** @private @type {HTMLElement} */
    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    /** @private @type {function(new: VideoNullDriver, HTMLElement, number, number)} */
    this.mVideoDriverClass = videoDriverClass;

    /** @private @type {Array<function(new: System)>} */
    this.mSystemClasses = systemClasses;

    /** @private @type {number} */
    this.mStageWidth = this.mContainerElement.clientWidth;

    /** @private @type {number} */
    this.mStageHeight = this.mContainerElement.clientHeight;

    /** @private @type {number} */
    this.mSimulationTimestep = 1000 / 60;

    /** @private @type {number} */
    this.mUptime = 0;

    /** @private @type {number} */
    this.mFrameAccum = 0;

    /** @private @type {number} */
    this.mLastFrameTimeMs = 0;

    /** @private @type {number} */
    this.mCurrentTime = 0;

    /** @private @type {number} */
    this.mFPS = 60;

    /** @private @type {number} */
    this.mLastFpsUpdate = 0;

    /** @private @type {number} */
    this.mFramesThisSecond = 0;

    /** @private @type {number} */
    this.mNumUpdateSteps = 0;

    /** @private @type {number} */
    this.mMinFrameDelay = 0;

    /** @private @type {Array<System>} */
    this.mSystems = [];

    /** @private @type {GameObject|null} */
    this.mGameObject = null;

    /** @private @type {boolean} */
    this.mIsRunning = false;

    /** @private @type {boolean} */
    this.mIsStarted = false;

    /** @private @type {boolean} */
    this.mIsPanic = false;

    /** @private @type {number} */
    this.mLastFrameUpdateTime = 0;

    /** @private @type {number} */
    this.mLastFrameRenderTime = 0;

    /** @private @type {number} */
    this.mRAFHandle = -1; // not sure

    /** @private @type {Viewport} */
    this.mViewport = null;

    /** @private @type {VideoNullDriver} */
    this.mVideo = null;

    /** @private @type {boolean} */
    this.mPaused = false;

    /** @private @type {boolean} */
    this.mUnpausing = false;

    /** @private @type {boolean} */
    this.mPauseOnHide = true;

    /** @private @type {boolean} */
    this.mPauseOnBlur = true;

    /** @private @type {Object<string, Array>} */
    this.mTagCache = {};

    /** @private @type {function(new: GameObject)} */
    this.mGameClass = gameClass;

    /** @private @type {GameObject|null} */
    this.mGame = null;

    /** @private @type {Stage} */
    this.mStage = null;

    /** @private @type {boolean} */
    this.mEnableFixedTimeStep = false;

    /** @private @type {boolean} */
    this.mWasStopped = false;

    /** @private @type {SplashScreen} */
    this.mSplashScreen = new SplashScreen();

    this.__bootViewport();
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;
    this.post('paused');
  }

  /**
   * Resumes update execution.
   *
   * @return {void}
   */
  resume() {
    if (this.mPaused === true)
      this.mUnpausing = true;
  }

  __setUnpaused() {
    this.mPaused = false;
    this.post('unpaused');
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
    if (this.mSystemClasses === null)
      return;

    for (let i = 0; i < this.mSystemClasses.length; i++)
      this.__addSystem(new this.mSystemClasses[i]());
  }

  /**
   * @private
   * @returns {void}
   */
  __bootStage() {
    this.mStage = new Stage();

    window.onblur = event => this.__onVisibilityChange(event);
    window.onfocus = event => this.__onVisibilityChange(event);
    window.onpagehide = event => this.__onVisibilityChange(event);
    window.onpageshow = event => this.__onVisibilityChange(event);

    if (document.hidden && this.mPauseOnHide === true)
      this.pause();
  }

  /**
   * @private
   * @returns {void}
   */
  __onVisibilityChange(event) {
    let type = event.type;
    if (type === 'blur' && this.mPauseOnBlur === true)
      this.pause();
    else if (type === 'pagehide' && this.mPauseOnHide === true)
      this.pause();
    else if (type === 'focus' || type === 'pageshow') {
      if (document.hidden === false)
        this.resume();
    }
  }

  /**
   * Returns true if system exists.
   * 
   * @param {Function} systemTypeName
   */
  hasSystem(systemTypeName) {
    for (let i = 0; i < this.mSystems.length; i++) {
      let c = this.mSystems[i];
      if (c instanceof systemTypeName)
        return true;
    }

    return false;
  }

  /**
   * @private
   * @param  {System} system The System object you want to add.
   * @return {System}
   */
  __addSystem(system) {
    this.mSystems.push(system);
    return system;
  }

  /**
   * Gets system by type.
   *
   * @param {Function} typeName The system type.
   * @return {System|null} The `System` instance or null if not found.
   */
  getSystem(typeName) {
    for (let i = 0; i < this.mSystems.length; i++) {
      let s = this.mSystems[i];
      if (s instanceof typeName)
        return s;
    }

    return null;
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

    // TODO: show only when needed, eg required by any system
    Debug.assertInfo(this.mEnableFixedTimeStep === true, 'Fixed time-step is disabled, some systems may not work.');

    this.__bootSystems();
    this.__bootStage();
    this.__bootVideo();

    this.mStage.__refresh();

    this.mGameObject = new this.mGameClass();
    this.mStage.addChild(this.mGameObject);

    const self = this;

    this.mIsStarted = true;
    this.mVideo.start();

    this.mRAFHandle = window.requestAnimationFrame(function (timestamp) {
      // TODO: do first update here
      self.mIsRunning = true;

      self.mLastFrameTimeMs = timestamp;
      self.mLastFpsUpdate = timestamp;
      self.mFramesThisSecond = 0;

      // show splash screen
      if (SplashScreen.enabled === true)
        self.mSplashScreen.show();

      // Start the main loop.
      self.mRAFHandle = window.requestAnimationFrame(self.__update.bind(self));
    });
  }

  /**
   * Stops any executions, destroys resources and scene.
   *
   * @return {void}
   */
  stop() {
    this.mIsStarted = false;
    this.mIsRunning = false;
    window.cancelAnimationFrame(this.mRAFHandle);

    console.log('%c                        <<< BUY BUY >>>                        ', 'background: #000; color: #fff;');
  }

  /**
   * @private
   * @param {number} timestamp
   * @return {void}
   */
  __update(timestamp) {
    // TODO: this method seems to be totaly broken. maxAllowedFPS is not working correctly
    Black.instance = this;

    if (this.mPaused === true && this.mUnpausing === true) {
      this.mUnpausing = false;

      this.mLastFrameTimeMs = 0;
      this.mLastFpsUpdate = timestamp;
      this.mLastFrameTimeMs = timestamp;
      this.mCurrentTime = 0; // same as first update
      this.mFrameAccum = 0;

      this.__setUnpaused();
    }

    if (timestamp < this.mLastFrameTimeMs + this.mMinFrameDelay) {
      this.mRAFHandle = window.requestAnimationFrame(x => {
        this.__update(x);
      });
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

      // UPDATE
      Black.mUpdateTime = performance.now();
      this.__internalUpdate(dt);
      this.__internalPostUpdate(dt);
      Black.mUpdateTime = performance.now() - Black.mUpdateTime;

      // RENDER
      Black.mRenderTime = performance.now();
      this.mVideo.beginFrame();
      this.mVideo.render(this.mStage);
      this.mVideo.endFrame();
      Black.mRenderTime = performance.now() - Black.mRenderTime;

      Black.__frameNum++;

      // TODO: remove uptime
      this.mUptime += dt;
      Time.mTime = this.mUptime;

      this.mIsPanic = false;
      Renderer.__dirty = false;
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

    this.mStage.__fixedUpdate(dt);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalUpdate(dt) {
    this.mViewport.__update(dt);

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate(dt, this.mUptime);

    this.mStage.__update(dt);
  }

  /**
   * @private
   * @param {number} dt
   * @return {void}
   */
  __internalPostUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate(dt, this.mUptime);

    this.mStage.__postUpdate(dt);
  }

  /**
   * Gets/Sets the number of milliseconds fixed-time-step will run over.
   *
   * @return {number}
   */
  get simulationTimestep() {
    return this.mSimulationTimestep;
  }

  /**
   * @ignore
   * @param {number} timestep
   * @return {void}
   */
  set simulationTimestep(timestep) {
    this.mSimulationTimestep = timestep;
  }

  /**
   * Returns current frame rate
   *
   * @return {number}
   */
  get FPS() {
    return this.mFPS;
  }

  /**
   * Gets/Sets max number of updates engine must do in a second.
   *
   * @return {number}
   */
  get maxAllowedFPS() {
    return 1000 / this.mMinFrameDelay;
  }

  /**
   * @ignore
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
   *
   * @return {Viewport}
   */
  get viewport() {
    return this.mViewport;
  }

  /**
   * Returns the DOM element the engine runs in.
   *
   * @return {Element}
   */
  get containerElement() {
    return this.mContainerElement;
  }

  /**
   * Returns amount of seconds since engine start.
   *
   * @return {number}
   */
  get uptime() {
    return this.mUptime;
  }

  /**
   * Called when tag changed for specific `GameObject`.
   *
   * @protected
   * @param {GameObject} child   A game object fired the event.
   * @param {string|null} oldTag Old tag.
   * @param {string|null} newTag New tag.
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
   * Called when specific game object is added to display list.
   *
   * @protected
   * @param  {GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenAdded(child) {
    Renderer.__dirty = true;

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
   * Called when specific game object is changed its index in display list.
   *
   * @protected
   * @param {GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenChanged(child) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenChanged(child);
  }

  /**
   * Called when specific game object is added to display list.
   *
   * @protected
   * @param  {GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenRemoved(child) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenRemoved(child);

    let forEach = (gameObject, action) => {
      let cloned = gameObject.mChildren.slice();
      action(gameObject);
            
      for (let i = 0; i < cloned.length; i++) {
        GameObject.forEach(cloned[i], action);
      }
    };
    
    forEach(child, (x) => {
      if (x.mAdded === true) {
        this.onTagUpdated(x, null, x.mTag);

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
   * Called when specific component is added to GameObject instance.
   *
   * @protected
   * @param  {GameObject} child Instance of GameObject.
   * @param  {Component} component Instance of Component added to game object.
   * @return {void}
   */
  onComponentAdded(child, component) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentAdded(child, component);

    if (component.mAdded === true)
      return;

    component.mAdded = true;
    component.onAdded(child);
  }

  /**
   * Called when specific component is removed from its owner.
   *
   * @protected
   * @param  {GameObject} child Instance of GameObject.
   * @param  {Component} component Instance of Component removed from game object.
   * @return {void}
   */
  onComponentRemoved(child, component) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentRemoved(child, component);

    if (component.mAdded === false)
      return;

    component.mAdded = false;
    component.onRemoved(child);
  }

  /**
   * Gets/Sets if engine should be automatically paused when window is hidden.
   *
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * Gets/Sets if engine should be automatically paused when container element is blured.
   *
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnBlur(value) {
    this.mPauseOnBlur = value;
  }

  /**
   * Returns True if engine is paused.
   *
   * @readonly
   * @returns {boolean}
   */
  get isPaused() {
    return this.mPaused;
  }

  /**
   * Gets/Sets if fixed-time-step update should happen. When disabled the physics system and other systems may not work.
   * @return {boolean}
   */
  get enableFixedTimeStep() {
    return this.mEnableFixedTimeStep;
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
  set enableFixedTimeStep(value) {
    this.mEnableFixedTimeStep = value;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {Stage}
   */
  get stage() {
    return this.mStage;
  }

  /**
   * Retuns HTML comtainer element id.
   * @returns {string}
   */
  get containerElementId() {
    return this.mContainerElementId;
  }

  /**
   * Returns currently active splash screen. Splash screen posts 'complete' message on hide.
   * 
   * @returns {SplashScreen}
   */
  get splashScreen() {
    return this.mSplashScreen;
  }

  /**
   * `Black.magic`! Got it? Got it?!?! Same as `Math.random()` but much cooler.
   * @readonly
   * @returns {number}
   */
  static get magic() {
    return Math.random();
  }

  /**
   * Returns current video driver.
   *
   * @readonly
   * @returns {VideoNullDriver}
   */
  static get driver() {
    return Black.instance.mVideo;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {Stage}
   */
  static get stage() {
    return Black.instance.mStage;
  }

  /**
   * Returns number of frame since engine start.
   *
   * @readonly
   * @returns {number}
   */
  static get frameNum() {
    return Black.__frameNum;
  }
}

/**
 * @ignore
 * @type {number}
 * @private
 */
Black.__frameNum = 0;

/**
 * Reference to the current Black instance.
 * @type {Black}
 * @static
 */
Black.instance = null;

Black.mUpdateTime = 0;
Black.mRenderTime = 0;