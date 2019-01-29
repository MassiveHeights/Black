let ID = 0;
/**
 * The Black class represents the core of the Black Engine.
 *
 * @fires Black#paused
 * @fires Black#unpaused
 * @fires Black#ready
 * @fires Black#looped
 *
 * @export
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Black extends MessageDispatcher {
  /**
   * Creates a new Black instance.
   * 
   * First parameter has to be a id of the HTML div element the game will be rendered to.
   * Second parameter has to be `GameObject` class which will be the root object of your application.
   * Third parameter has to be a class name of `VideoNullDriver` subclass eg `CanvasDriver`.
   * Fourth parameter is optional array of System to use,
   * 
   * @example
   * // Creates new Black instance with MyGame as a root class, CanvasDriver as renderer and Arcade physics as a system.
   * new Black('game-container', MyGame, CanvasDriver, [Arcade]);
   * 
   * @param {string}                                                       containerElementId The id of an DOM element.
   * @param {function(new: GameObject)}                                    gameClass          Type name of an GameObject to start execution from.
   * @param {function(new: VideoNullDriver, HTMLElement, number, number)}  videoDriverClass   Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   * @param {Array<function(new: System)>  }                               systemClasses      The list of systems to be initialized with Black engine.
   */
  constructor(containerElementId, gameClass, videoDriverClass, systemClasses = null) {
    super();

    this.id = ++ID;

    Black.instance = this;

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
     * @type {function(new: VideoNullDriver, HTMLElement, number, number)} 
     */
    this.mVideoDriverClass = videoDriverClass;

    /** 
     * @private 
     * @type {Array<function(new: System)>} 
     */
    this.mSystemClasses = systemClasses;

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
    this.mLastUpdateTime = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLastRenderTime = 0;

    /** 
     * @private 
     * @type {Array<System>} 
     */
    this.mSystems = [];

    /** 
     * @private 
     * @type {GameObject|null} 
     */
    this.mGameObject = null;

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
     * @type {function(new: GameObject)} 
     */
    this.mGameClass = gameClass;

    /** 
     * @private 
     * @type {Stage} 
     */
    this.mStage = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mWasStopped = false;

    /** 
     * @private 
     * @type {SplashScreen} 
     */
    this.mSplashScreen = new SplashScreen();

    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mFrameTimes = [];

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mUseHiDPR = Device.isMobile;

    this.__bootViewport();

    this.__update = this.__update.bind(this);

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPendingDispose = false;
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;

    /**
     * Posted after engine entered paused state.
     *
     * @event Black#paused
     */
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

    /**
     * Posted after engine is unpaused.
     *
     * @event Black#unpaused
     */
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
    this.mVideo = new this.mVideoDriverClass(this.mViewport.mViewportElement, this.mStageWidth, this.mStageHeight);
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

    Black.instance = this;

    if (this.mIsStarted === true)
      return;

    new Time();

    this.__bootSystems();
    this.__bootStage();
    this.__bootVideo();

    this.mStage.__refresh();

    /**
     * Posted when all systems, stage and driver ready to be used. 
     *
     * @event Black#ready
     */
    this.post(Message.READY);

    this.mGameObject = new this.mGameClass();
    this.mStage.addChild(this.mGameObject);

    const self = this;

    this.mIsStarted = true;
    this.mVideo.start();

    // TODO: is there a way to cancel first raf? no! eg pause will not work
    this.mRAFHandle = window.requestAnimationFrame(function (timestamp) {
      // TODO: do first update here
      self.mIsRunning = true;

      // show splash screen
      if (SplashScreen.enabled === true)
        self.mSplashScreen.show();

      self.mLastUpdateTime = timestamp;
      self.mLastRenderTime = self.mLastUpdateTime;

      // Start the main loop.
      self.__update(timestamp, true);
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

    console.log('%c                        <<< BYE BYE >>>                        ', 'background: #000; color: #fff;');
  }

  /**
   * Destroys the whole thing!
   */
  destroy() {
    this.mPendingDispose = true;
  }

  __dispose() {
    this.stop();

    this.mVideo.dispose();
    this.mViewport.dispose();

    AssetManager.default.dispose();
    AssetManager.mDefault = null;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].dispose();

    MessageDispatcher.dispose();

    Black.numUpdates = 0;
    Black.__frameNum = 0;
    Black.instance = null;
  }

  /**
   * @private
   * @param {number} timestamp
   * @param {boolean} forceUpdate
   * @return {void}
   */
  __update(timestamp, forceUpdate) {
    // Calculate FPS
    if (this.mPaused === true && this.mUnpausing === true) {
      this.mUnpausing = false;

      this.mLastUpdateTime = timestamp;
      this.mLastRenderTime = this.mLastUpdateTime;

      this.__setUnpaused();
    }

    this.mRAFHandle = window.requestAnimationFrame(/** @type {function(number)} */(this.__update));

    if (this.mPaused === true)
      return;

    let numTicks = Math.floor((timestamp - this.mLastUpdateTime) / Time.mDeltaTimeMs);

    if (forceUpdate === true)
      numTicks = 1;

    if (numTicks > Black.maxUpdatesPerFrame) {
      /**
       * Posted when engine is not able to achieve desired amount of updates per second. 
       * 
       * Usually happens when user switches to another tab in browser or update logic is too heavy to be executed 
       * withing one update loop. Lowering `Black.ups` value can help if update is heavy. 
       * Increasing `Black.maxUpdatesPerFrame` can lead to dead lock.
       *
       * @event Black#looped
       */
      this.post('looped', numTicks);
      Debug.warn(`Unable to catch up ${numTicks} update(s).`);

      numTicks = Black.maxUpdatesPerFrame;
    }

    Black.numUpdates = numTicks;
    for (let i = 0; i < numTicks; i++) {
      Time.mActualTime += Time.delta;
      Time.mTime = Time.mActualTime;

      this.__internalUpdate();
      this.__internalSystemPostUpdate();
    }

    for (let l = timestamp - Time.mDeltaTimeMs; this.mLastUpdateTime < l;)
      this.mLastUpdateTime += Time.mDeltaTimeMs;

    if (numTicks === 0)
      Time.mAlphaTime = (timestamp - this.mLastUpdateTime) / Time.mDeltaTimeMs;
    else
      Time.mAlphaTime = 0;

    Time.mTime = Time.mActualTime + ((timestamp - this.mLastUpdateTime) * 0.001) * Time.mScale;

    this.__internalSystemRender();
    this.mVideo.beginFrame();
    this.mVideo.render(this.mStage);
    this.mVideo.endFrame();

    Black.__frameNum++;

    this.mIsPanic = false;
    Renderer.__dirty = false;

    this.mLastRenderTime = timestamp;

    if (this.mPendingDispose === true)
      this.__dispose();
  }

  /**
   * @private
   * @return {void}
   */
  __internalUpdate() {
    this.mViewport.__update();

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate();

    this.mStage.__update();
  }

  /**
   * @private
   * @return {void}
   */
  __internalSystemPostUpdate() {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate();
  }

  /**
   * @private
   * @return {void}
   */
  __internalSystemRender() {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onRender();
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

    GameObject.forEach(child, (x) => {
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
   * Gets/Sets the number of updates should be done per second.
   *
   * @return {number}
   */
  get ups() {
    return Time.mDeltaTimeMs * 0.001;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set ups(value) {
    Debug.isNumber(value);
    Debug.assert(value > 0);

    Time.mDeltaTimeMs = 1000 / value;
    Time.mDeltaTime = Time.mDeltaTimeMs * 0.001;
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
   * Gets/Sets if engine should be automatically paused when window is hidden.
   *
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * Gets/Sets if engine should be automatically paused when container element is blurred.
   *
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
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
   * Returns current stage.
   *
   * @readonly
   * @returns {Stage}
   */
  get stage() {
    return this.mStage;
  }

  /**
   * Returns HTML container element id.
   * @returns {string}
   */
  get containerElementId() {
    return this.mContainerElementId;
  }

  /**
   * Returns currently active splash screen. Splash screen posts Message.COMPLETE message on hide.
   *
   * @returns {SplashScreen}
   */
  get splashScreen() {
    return this.mSplashScreen;
  }


  /**
   * Gets/sets whenever driver should be created with high DPR support. 
   * NOTE: Cannot be changed at runtime.
   * 
   * @returns {boolean}
   */
  get useHiDPR() {
    return this.mUseHiDPR;
  }

  /**
   * @param {boolean} value
   * @returns {void}
   */
  set useHiDPR(value) {
    this.mUseHiDPR = value;
  }

  /**
   * `Black.magic`! Got it? Got it?!?! Same as `Math.random()` but much cooler.
   * 
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

/** 
 * Indicates how many updates will be done during this frame.
 * 
 * @type {number}
 */
Black.numUpdates = 0;

/** 
 * Limit for number of updates to be done per one RAF.
 * @public
 */
Black.maxUpdatesPerFrame = 60;