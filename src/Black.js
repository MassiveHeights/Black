//.########::'##::::::::::'###:::::'######::'##:::'##:
// ##.... ##: ##:::::::::'## ##:::'##... ##: ##::'##::
// ##:::: ##: ##::::::::'##:. ##:: ##:::..:: ##:'##:::
// ########:: ##:::::::'##:::. ##: ##::::::: #####::::
// ##.... ##: ##::::::: #########: ##::::::: ##. ##:::
// ##:::: ##: ##::::::: ##.... ##: ##::: ##: ##:. ##::
// ########:: ########: ##:::: ##:. ######:: ##::. ##:
//........:::........::..:::::..:::......:::..::::..::

/* @echo EXPORT */
class Black extends MessageDispatcher {

  /**
   * constructor
   * @param {string}   containerElementId
   * @param {function(new: GameObject)}   rootClass
   * @param {string=} [videoDriverName=canvas]
   */
  constructor(containerElementId, rootClass, videoDriverName = 'canvas') {
    super();

    // Dirty GCC workaround
    window['Black'] = {};
    window['Black']['instance'] = this;

    var css = "background: #000; color: #fff;";
    console.log('%c ~Black ', css);

    /** @type {string} */
    this.mContainerElementId = containerElementId;

    /** @type {HTMLElement} */
    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    /** @type {string} */
    this.mVideoName = videoDriverName;

    /** @type {number} */
    this.mStageWidth = this.mContainerElement.clientWidth;

    /** @type {number} */
    this.mStageHeight = this.mContainerElement.clientHeight;

    /** @type {number} */
    this.mSimulationTimestep = 1000 / 60;

    /** @type {number} */
    this.mUptime = 0;

    /** @type {number} */
    this.mFrameAccum = 0;

    /** @type {number} */
    this.mLastFrameTimeMs = 0;

    /** @type {number} */
    this.mCurrentTime = 0;

    /** @type {number} */
    this.mFPS = 60;

    /** @type {number} */
    this.mLastFpsUpdate = 0;

    /** @type {number} */
    this.mFramesThisSecond = 0;

    /** @type {number} */
    this.mNumUpdateSteps = 0;

    /** @type {number} */
    this.mMinFrameDelay = 0;

    /** @type {Array<System>} */
    this.mSystems = [];

    /** @type {Rectangle} */
    this.mBounds = new Rectangle();

    /** @type {boolean} */
    this.mIsRunning = false;

    /** @type {boolean} */
    this.mIsStarted = false;

    /** @type {boolean} */
    this.mIsPanic = false;

    /** @type {number} */
    this.mLastFrameUpdateTime = 0;

    /** @type {number} */
    this.mLastFrameRenderTime = 0;

    /** @type {number} */
    this.mRAFHandle = -1; // not sure

    /** @type {Viewport} */
    this.mViewport = null;

    /** @type {NullDriver} */
    this.mVideo = null;

    /** @type {boolean} */
    this.mPaused = false;

    /** @type {boolean} */
    this.mUnpausing = false;

    /** @type {boolean} */
    this.mPauseOnHide = true;

    /** @type {boolean} */
    this.mPauseOnBlur = false;

    /** @type {Object<string, Array>} */
    this.mTagCache = {};

    /** @type {function(new: GameObject)|null} */
    this.mRootClass = rootClass;

    /** @type {GameObject|null} */
    this.mRoot = null;
  }

  pause() {
    this.mPaused = true;
  }

  resume() {
    this.mUnpausing = true;
  }

  __bootViewport() {
    this.mViewport = new Viewport(this.mContainerElement);
  }

  __bootSystems() {
    this.addSystem(new Input());
  }

  __bootStage() {
    window.onblur = event => this.__onVisbilityChange(event);
    window.onfocus = event => this.__onVisbilityChange(event);
    window.onpagehide = event => this.__onVisbilityChange(event);
    window.onpageshow = event => this.__onVisbilityChange(event);

    if (document.hidden && this.mPauseOnHide === true)
      this.mPaused = true;
  }

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
   * addSystem - Adds a given system to the system list.
   *
   * @param  {System} system
   * @return {System}
   */
  addSystem(system) {
    this.mSystems.push(system);
    return system;
  }


  /**
   * removeSystem - Removes the given system to the system list.
   *
   * @param {System} system
   *
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

  __bootVideo() {
    if (this.mVideoName === 'canvas')
      this.mVideo = new CanvasDriver(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    else if (this.mVideoName === 'dom')
      this.mVideo = new DOMDriver(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    else if (this.mVideoName === 'null' || this.mVideoName == null)
      this.mVideo = new NullDriver(this.mContainerElement, this.mStageWidth, this.mStageHeight);
    else
      Assert.is(false, 'Unsupported video driver. Use canvas or dom.');
  }

  start() {
    this.constructor.instance = this;

    if (this.mIsStarted)
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
  }


  stop() {
    this.mIsStarted = false;
    this.mIsRunning = false;
    cancelAnimationFrame(this.mRAFHandle);
  }


  /**
   * __update - Description
   *
   * @param {number} timestamp Description
   *
   * @return {void} Description
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

      while (this.mFrameAccum >= this.mSimulationTimestep) {
        this.__internalFixedUpdate(this.mSimulationTimestep * 0.001);

        this.mFrameAccum -= this.mSimulationTimestep;

        if (++this.mNumUpdateSteps >= (60 * 3)) {
          console.log('[BLACK]: Not enough time to calculate update logic.');
          this.mIsPanic = true;
          break;
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
   * __internalFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __internalFixedUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onFixedUpdate(dt);

    this.mRoot.__fixedUpdate(dt);
  }


  /**
   * __internalUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __internalUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate(dt, this.mUptime);

    this.mRoot.__update(dt);
  }

  /**
   * __internalUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __internalPostUpdate(dt) {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate(dt, this.mUptime);

    this.mRoot.__postUpdate(dt);
  }

  /**
   * bounds - Description
   *
   * @return {Rectangle} Description
   */
  get bounds() {
    return this.mBounds;
  }


  /**
   * root - Description
   *
   * @return {GameObject} Description
   */
  get root() {
    return this.mRoot;
  }


  /**
   * video - Description
   *
   * @return {NullDriver} Description
   */
  get video() {
    return this.mVideo;
  }


  /**
   * simulationTimestep - Description
   *
   * @return {number} Description
   */
  get simulationTimestep() {
    return this.mSimulationTimestep;
  }


  /**
   * simulationTimestep - Description
   *
   * @param {number} timestep Description
   *
   * @return {void} Description
   */
  set simulationTimestep(timestep) {
    this.mSimulationTimestep = timestep;
  }


  /**
   * FPS - Description
   *
   * @return {number} Description
   */
  get FPS() {
    return this.mFPS;
  }


  /**
   * maxFPS - Description
   *
   * @return {number} Description
   */
  get maxFPS() {
    return 1000 / this.mMinFrameDelay;
  }


  /**
   * maxAllowedFPS - Description
   *
   * @param {number} fps Description
   *
   * @return {void} Description
   */
  set maxAllowedFPS(fps) {
    if (fps <= 0)
      this.stop();
    else
      this.mMinFrameDelay = 1000 / fps;
  }


  /**
   * viewport - Description
   *
   * @return {Viewport} Description
   */
  get viewport() {
    return this.mViewport;
  }


  /**
   * containerElement - Description
   *
   * @return {Element} Description
   */
  get containerElement() {
    return this.mContainerElement;
  }


  /**
   * uptime - Description
   *
   * @return {number} Description
   */
  get uptime() {
    return this.mUptime;
  }

  /**
   * onTagUpdated - Description
   *
   * @param {GameObject} child Description
   * @param {string|null} oldTag   Description
   * @param {string|null} newTag   Description
   *
   * @return {void} Description
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
   * @param  {GameObject} child     description
   * @return {void}           description
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
   * @param  {GameObject} child     description
   * @return {void}           description
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
   * @param  {GameObject} child     description
   * @param  {Component} component description
   * @return {void}           description
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
   * @param  {GameObject} child     description
   * @param  {Component} component description
   * @return {void}           description
   */
  onComponentRemoved(child, component) {
    //child.mBlack = null;
    //console.log('onComponentRemoved', child, component);

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentRemoved(child, component);

    if (component.mAdded === false)
      return;

    component.mAdded = false;
    component.onRemoved(child);
  }

  /**
   * pauseOnHide
   *
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * pauseOnHide
   *
   * @param {boolean} value
   *
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * pauseOnBlur
   *
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
   * pauseOnBlur
   *
   * @param {boolean} value
   *
   * @return {void}
   */
  set pauseOnBlur(value) {
    this.mPauseOnBlur = value;
  }

  /**
   * videoName
   *
   * @return {string}
   */
  get videoName() {
    return this.mVideoName;
  }
}
