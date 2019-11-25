import { MessageDispatcher } from "./messages/MessageDispatcher";
import { Device } from "./system/Device";
import { Viewport } from "./core/Viewport";
import { Renderer } from "./drivers/Renderer";
import { System } from "./core/System";
import { Stage } from "./display/Stage";
import { VideoNullDriver } from "./drivers/VideoNullDriver";
import { Message } from "./messages/Message";
import { GameObject } from "./core/GameObject";
import { Black } from './Black';
import { Debug } from "./core/Debug";
import { Time } from "./core/Time";

let ID = 0;
/**
 * The Black class represents the core of the Black Engine.
 *
 * @fires Engine#paused
 * @fires Engine#unpaused
 * @fires Engine#ready
 * @fires Engine#looped
 *
 * @extends black-engine~MessageDispatcher
 */
export class Engine extends MessageDispatcher {
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
   * @param {function(new: black-engine~GameObject)}                                    gameClass          Type name of an GameObject to start execution from.
   * @param {function(new: black-engine~VideoNullDriver, HTMLElement, number, number)}  videoDriverClass   Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   * @param {Array<function(new: black-engine~System)>  }                               systemClasses      The list of systems to be initialized with Black engine.
   */
  constructor(containerElementId, gameClass, videoDriverClass, systemClasses = null) {
    super();

    this.id = ++ID;

    Black.engine = this;

    /** 
     * @private 
     * @type {string} 
     */
    this.mContainerElementId = containerElementId;

    /** 
     * @private 
     * @type {HTMLElement|null} 
     */
    this.mContainerElement = null;

    /** 
     * @private 
     * @type {function(new: black-engine~VideoNullDriver, HTMLElement, number, number)} 
     */
    this.mVideoDriverClass = videoDriverClass;

    /** 
     * @private 
     * @type {Array<function(new: black-engine~System)>} 
     */
    this.mSystemClasses = systemClasses;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStageWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStageHeight = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLastUpdateTime = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mFrameNum = 0;

    /** 
     * @private
     * @type {number}
     */
    this.mNumUpdates = 0;

    /** 
     * @private
     * @type {number}
     */
    this.mMaxUpdatesPerFrame = 60;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLastRenderTime = 0;

    /** 
     * @private 
     * @type {Array<black-engine~System>} 
     */
    this.mSystems = [];

    /** 
     * @private 
     * @type {black-engine~GameObject|null} 
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
     * @type {black-engine~Viewport} 
     */
    this.mViewport = null;

    /** 
     * @private 
     * @type {black-engine~VideoNullDriver} 
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
     * @type {function(new: black-engine~GameObject)} 
     */
    this.mGameClass = gameClass;

    /** 
     * @private 
     * @type {black-engine~Stage} 
     */
    this.mStage = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mWasStopped = false;

    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mFrameTimes = [];

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mUseHiDPR = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPendingDispose = false;

    this.__initialize();
  }

  /**
   * @ignore
   */
  __initialize() {
    console.log('%c                         >>> BLACK <<<                         ', 'background: #000; color: #fff;');

    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    Black.device = new Device();

    this.mStageWidth = this.mContainerElement.clientWidth;
    this.mStageHeight = this.mContainerElement.clientHeight;
    this.mUseHiDPR = Black.device.isMobile;

    this.__bootViewport();
    this.__update = this.__update.bind(this);
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPause();

    /**
     * Posted after engine entered paused state.
     *
     * @event Engine#paused
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

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onResume();

    /**
     * Posted after engine is unpaused.
     *
     * @event Engine#unpaused
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

  __checkVisibility() {
    if (typeof document.hidden === 'undefined') {
      // lets fake hidden if there is no support for Page Visibility API
      document.hidden = false;
      document.visibilityState = 'visible';

      window.onpagehide = event => this.__onVisibilityChangeFallback(event);
      window.onpageshow = event => this.__onVisibilityChangeFallback(event);
    } else {
      document.addEventListener('visibilitychange', event => this.__onVisibilityChange(event), false);
    }

    window.onblur = event => this.__onVisibilityChangeFallback(event);
    window.onfocus = event => this.__onVisibilityChangeFallback(event);
  }

  /**
   * @private
   * @returns {void}
   */
  __bootStage() {
    this.mStage = new Stage();

    this.__checkVisibility();

    if (document.hidden && this.mPauseOnHide === true)
      this.pause();
  }

  /**
   * @private
   * @returns {void}
   */
  __onVisibilityChangeFallback(event) {
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

  __onVisibilityChange() {
    if (this.mPauseOnHide === true && document.visibilityState === 'hidden')
      this.pause();
    else if (document.visibilityState === 'visible')
      this.resume();
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
   * @param  {black-engine~System} system The System object you want to add.
   * @return {black-engine~System}
   */
  __addSystem(system) {
    this.mSystems.push(system);
    return system;
  }

  /**
   * Gets system by type.
   *
   * @param {Function} typeName The system type.
   * @return {black-engine~System|null} The `System` instance or null if not found.
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

    Black.engine = this;

    if (this.mIsStarted === true)
      return;

    Black.time = new Time();

    this.__bootSystems();
    this.__bootStage();
    this.__bootVideo();

    this.mStage.__refresh();

    /**
     * Posted when all systems, stage and driver ready to be used. 
     *
     * @event Engine#ready
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

    Black.assets.dispose();
    Black.assets = null;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].dispose();

    MessageDispatcher.dispose();

    this.mNumUpdates = 0;
    this.mFrameNum = 0;
    Black.engine = null;
  }

  /**
   * @private
   * @param {number} timestamp
   * @param {boolean} forceUpdate
   * @return {void}
   */
  __update(timestamp, forceUpdate) {
    let time = Black.time;

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

    let numTicks = Math.floor((timestamp - this.mLastUpdateTime) / time.mDeltaTimeMs);

    if (forceUpdate === true)
      numTicks = 1;

    if (numTicks > this.mMaxUpdatesPerFrame) {
      /**
       * Posted when engine is not able to achieve desired amount of updates per second. 
       * 
       * Usually happens when user switches to another tab in browser or update logic is too heavy to be executed 
       * withing one update loop. Lowering `Black.ups` value can help if update is heavy. 
       * Increasing `Black.maxUpdatesPerFrame` can lead to dead lock.
       *
       * @event Engine#looped
       */
      this.post('looped', numTicks);
      Debug.warn(`Unable to catch up ${numTicks} update(s).`);

      numTicks = this.mMaxUpdatesPerFrame;
    }

    this.mNumUpdates = numTicks;
    for (let i = 0; i < numTicks; i++) {
      time.mActualTime += time.delta;
      time.mTime = time.mActualTime;

      this.__internalUpdate();
      this.__internalSystemPostUpdate();
    }

    for (let l = timestamp - time.mDeltaTimeMs; this.mLastUpdateTime < l;)
      this.mLastUpdateTime += time.mDeltaTimeMs;

    if (numTicks === 0)
      time.mAlphaTime = (timestamp - this.mLastUpdateTime) / time.mDeltaTimeMs;
    else
      time.mAlphaTime = 0;

    time.mTime = time.mActualTime + ((timestamp - this.mLastUpdateTime) * 0.001) * time.mScale;

    this.__internalSystemRender();
    this.mVideo.beginFrame();
    this.mVideo.render(this.mStage);
    this.mVideo.endFrame();

    this.mFrameNum++;

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
   * @param {black-engine~GameObject} child   A game object fired the event.
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
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenAdded(child, parent) {
    if (!(parent.root instanceof Stage))
      return;

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
   * @param {black-engine~GameObject} child Instance of GameObject.
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
   * @param  {black-engine~GameObject} child Instance of GameObject.
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
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @param  {black-engine~Component} component Instance of Component added to game object.
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
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @param  {black-engine~Component} component Instance of Component removed from game object.
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
    return Black.time.mDeltaTimeMs * 0.001;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set ups(value) {
    Debug.isNumber(value);
    Debug.assert(value > 0);

    Black.time.mDeltaTimeMs = 1000 / value;
    Black.time.mDeltaTime = Black.time.mDeltaTimeMs * 0.001;
  }

  /**
   * Returns the current viewport instance. Used to get size of a game screen, or listen for resize messages.
   *
   * @return {black-engine~Viewport}
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
   * @returns {black-engine~Stage}
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
   * Returns number of frame since engine start.
   *
   * @readonly
   * @returns {number}
   */
  get frameNum() {
    return this.mFrameNum;
  }

  /**
   * Indicates how many updates will be done during this frame.
   *
   * @readonly
   * @returns {number}
   */
  get numUpdates() {
    return this.mNumUpdates;
  }

  /** 
   * Limit for number of updates to be done per one RAF.
   * @returns {number}
   */
  get maxUpdatesPerFrame() {
    return this.mMaxUpdatesPerFrame;
  }

  /** 
   * Limit for number of updates to be done per one RAF.
   * @param {number} value
   * @returns {void}
   */
  set maxUpdatesPerFrame(value) {
    this.mMaxUpdatesPerFrame = value;
  }
}