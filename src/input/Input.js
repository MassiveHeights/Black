/**
 * A input system class is reponsible for mouse, touch and keyboard input events.
 * Pointer events works for a single target only.
 * Global Input messages has higher priority.
 *
 * When GameObject gets a `pointerDown` message it gets target locked. Other
 * objects will not receive `pointerMove` or `pointerUp` messages. Target locked
 * object will receive `pointerUp` message even if pointer is outside of its
 * bounds.
 *
 * @cat input
 * @extends System
 */
/* @echo EXPORT */
class Input extends System {
  /**
   * Private constructor.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {Input}
     */
    this.constructor.instance = this;

    /**
     * @private
     * @type {Vector}
     */
    this.mPointerPosition = new Vector();

    /**
     * @private
     * @type {Vector}
     */
    this.mStagePosition = new Vector();

    /**
     * @private
     * @type {Element}
     */
    this.mDom = Black.instance.containerElement;

    /**
     * @private
     * @type {Array<string>}
     */
    this.mEventList = null;

    /**
     * @private
     * @type {Array<string>}
     */
    this.mKeyEventList = null;

    this.__initListeners();

    /**
     * @private
     * @type {Array<{e: Event, x: number, y:number}>}
     */
    this.mPointerQueue = [];

    /**
     * @private
     * @type {Array<Event>}
     */
    this.mKeyQueue = [];

    /**
     * @private
     * @type {Array<number>}
     */
    this.mPressedKeys = [];

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPointerDown = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mNeedUpEvent = false;

    /**
     * NOTE: we need guarantee that keys are not going to chage theirs order
     * when iterating.
     * @private
     * @type {Map}
     */
    this.mInputListeners = new Map();

    this.mTarget = null;
    this.mTargetComponent = null;
    this.mLockedTarget = null;

    this.mLastInTargetComponent = null;
  }

  /**
   * @private
   *
   * @returns {void}
   */
  __initListeners() {
    this.mKeyEventList = Input.mKeyEventList;

    if (window.PointerEvent)
      this.mEventList = Input.mPointerEventList;
    else if (Device.isTouch && Device.isMobile)
      this.mEventList = Input.mTouchEventList;
    else
      this.mEventList = Input.mMouseEventList;

    for (let i = 0; i < 3; i++)
      this.mDom.addEventListener(this.mEventList[i], e => this.__onPointerEvent(e), false);

    document.addEventListener(this.mEventList[Input.IX_POINTER_UP], e => this.__onPointerEventDoc(e), false);

    for (let i = 0; i < this.mKeyEventList.length; i++)
      document.addEventListener(this.mKeyEventList[i], e => this.__onKeyEvent(e), false);
  }

  /**
   * @private
   * @param {Event} e
   *
   * @return {boolean}
   */
  __onKeyEvent(e) {
    if (Black.instance.isPaused === true)
      return false;

    this.mKeyQueue.push(e);
    return true;
  }

  /**
   * @private
   * @param {Event} e
   *
   * @returns {void}
   */
  __onPointerEventDoc(e) {
    if (Black.instance.isPaused === true)
      return;

    // dirty check
    let over = e.target == this.mDom || e.target.parentElement == this.mDom;

    if (over === false && this.mNeedUpEvent === true) {
      this.mNeedUpEvent = false;
      this.__pushEvent(e);
    }
  }

  /**
   * @private
   * @param {Event} e
   *
   * @return {boolean}
   */
  __onPointerEvent(e) {
    if (Black.instance.isPaused === true)
      return false;

    e.preventDefault();

    this.__pushEvent(e);

    return true;
  }

  /**
   * @private
   * @param {Event} e
   *
   * @returns {void}
   */
  __pushEvent(e) {
    let /** @type {Vector|null} */ p = null;
    if (e.type.indexOf('touch') === 0)
      p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */(e));
    else
      p = this.__getPointerPos(this.mDom, e);

    this.mPointerQueue.push({
      e: e,
      x: p.x,
      y: p.y
    });
  }

  /**
   * @private
   * @param {Element} canvas
   * @param {Event} evt
   *
   * @return {Vector}
   */
  __getPointerPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
    return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  }

  /**
   * @private
   * @param {Element} canvas
   * @param {TouchEvent} evt
   *
   * @return {Vector}
   */
  __getTouchPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    /** @type {Touch} */
    let touch = evt.changedTouches[0]; // ios? what about android?
    let x = touch.clientX;
    let y = touch.clientY;

    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
    return new Vector((x - rect.left) * scaleX, (y - rect.top) * scaleY);
  }

  /**
   * @inheritDoc
   * 
   * @param {number} dt
   *
   * @return {void}
   */
  onUpdate(dt) {
    // omg, who gave you keyboard?
    this.__updateKeyboard();

    let stage = Black.stage;

    for (var i = 0; i < this.mPointerQueue.length; i++) {
      let nativeEvent = this.mPointerQueue[i];

      // update to the lattest position
      this.mPointerPosition.x = nativeEvent.x;
      this.mPointerPosition.y = nativeEvent.y;

      this.mStagePosition.x = nativeEvent.x;
      this.mStagePosition.y = nativeEvent.y;

      // TODO: optimize
      let inv = stage.localTransformation.clone().invert();
      inv.transformVector(this.mStagePosition, this.mStagePosition);

      let eventType = Input.mInputEventsLookup[this.mEventList.indexOf(nativeEvent.e.type)];

      this.__findTarget(this.mPointerPosition);
      this.__processNativeEvent(nativeEvent, this.mPointerPosition, eventType);
    }

    // Erase the pointer queue
    this.mPointerQueue.splice(0, this.mPointerQueue.length);
    this.mKeyQueue.splice(0, this.mKeyQueue.length);
  }

  __findTarget(pos) {
    //debugger
    let obj = Black.instance.stage.hitTest(pos);

    if (obj === null) {
      this.mTarget = null;
      this.mTargetComponent = null;
      return;
    }

    this.mTarget = obj;
    this.mTargetComponent = obj.getComponent(InputComponent);
  }

  __processNativeEvent(nativeEvent, pos, type) {
    if (type === Input.POINTER_DOWN) {
      this.mIsPointerDown = true;
      this.mNeedUpEvent = true;
    }
    else if (type === Input.POINTER_UP) {
      this.mIsPointerDown = false;
    }

    this.post(type);

    if (this.mTarget === null && this.mLockedTarget === null)
      return;

    let info = new PointerInfo(this.mTarget, pos.x, pos.y);

    if (type === Input.POINTER_DOWN) {
      this.mLockedTarget = this.mTarget;
    }
    else if (type === Input.POINTER_UP && this.mLockedTarget !== null) {
      this.mLockedTarget.post('~pointerUp', info);
      this.mLockedTarget = null;
      return;
    }

    let sameTarget = this.mTarget === this.mLockedTarget;

    if (this.mLockedTarget === null) {
      if (this.mTarget !== null) {
        // regular non locked post
        //console.log('regular');
        this.mTarget.post('~' + type, info);
      }
    } else {
      if (sameTarget === true) {
        // just bubble the event
        this.mLockedTarget.post('~' + type, info);
      }
      else {
        // send skipping this gameObject
        if (this.mLockedTarget.mParent !== null && this.mTarget !== null)
          this.mLockedTarget.mParent.post('~' + type, info);
      }
    }
  }

  /**
   * @private
   *
   * @returns {void}
   */
  __updateKeyboard() {
    for (let i = 0; i < this.mKeyQueue.length; i++) {
      let nativeEvent = this.mKeyQueue[i];

      let ix = this.mKeyEventList.indexOf(nativeEvent.type);
      let pIx = this.mPressedKeys.indexOf(nativeEvent.keyCode);
      let fnName = Input.mKeyEventsLookup[ix];

      if (fnName === 'keyUp' && pIx !== -1)
        this.mPressedKeys.splice(pIx, 1);

      else if (fnName === 'keyDown' && pIx === -1) {
        this.mPressedKeys.push(nativeEvent.keyCode);
        fnName = 'keyPress';
      }

      this.post(fnName, new KeyInfo(nativeEvent), nativeEvent);
    }
  }

  /**
   * Listens for global input event by given message name.
   *
   * @param {string} name            The name of the message to listen for.
   * @param {Function} callback      The callback function that will be called when message received.
   * @param {Object=} [context=null] Optional context.
   *
   * @return {void}
   */
  static on(name, callback, context = null) {
    Input.instance.on(name, callback, context);
  }

  /**
   * Indicates if mouse or touch in down at this moment.
   *
   * @return {boolean}
   */
  static get isPointerDown() {
    return Input.instance.mIsPointerDown;
  }

  /**
   * Returns mouse or touch pointer x-component.
   * @return {number}
   */
  static get pointerX() {
    return Input.instance.mPointerPosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component.
   *
   * @return {number} Description
   */
  static get pointerY() {
    return Input.instance.mPointerPosition.y;
  }

  /**
   * Returns mouse or touch pointer x-component relative to stage.
   * @return {number}
   */
  static get stageX() {
    return Input.instance.mStagePosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component  relative to stage.
   *
   * @return {number} Description
   */
  static get stageY() {
    return Input.instance.mStagePosition.y;
  }

  /**
   * Returns mouse or touch pointer position.
   *
   * @return {Vector}
   */
  static get pointerPosition() {
    return Input.instance.mPointerPosition;
  }

  /**
   * Returns list of pressed keys.
   *
   * @returns {Array<number>}
   */
  static get pressedKeys() {
    return Input.instance.mPressedKeys;
  }
}

Input.POINTER_DOWN = 'pointerDown';
Input.POINTER_MOVE = 'pointerMove';
Input.POINTER_UP = 'pointerUp';

/**
 * @type {Input}
 * @nocollapse
 */
Input.instance = null;

/**
 * @type {number}
 * @const
 */
Input.IX_POINTER_MOVE = 0;

/**
 * @type {number}
 * @const
 */
Input.IX_POINTER_DOWN = 1;

/**
 * @type {number}
 * @const
 */
Input.IX_POINTER_UP = 2;

// /**
//  * @type {number}
//  * @const
//  */
// Input.IX_POINTER_IN = 3;
//
// /**
//  * @type {number}
//  * @const
//  */
// Input.IX_POINTER_OUT = 4;

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mKeyEventList = ['keydown', 'keyup'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mKeyEventsLookup = ['keyDown', 'keyUp', 'keyPress'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerIn', 'pointerOut'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointerenter', 'pointerleave'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
Input.mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchenter', 'touchleave'];

/**
 * Stores additional information about pointer events.
 *
 * @cat input
 */
/* @echo EXPORT */
class PointerInfo {
  /**
   * Creates new PointerInfo instance. For internal use only.
   *
   * @param {GameObject} activeObject
   * @param {number} x
   * @param {number} y
   */
  constructor(activeObject, x, y) {
    /**
     * @private
     * @type {GameObject}
     */
    this.mActiveObject = activeObject;

    /**
     * @private
     * @type {number}
     */
    this.mX = x;

    /**
     * @private
     * @type {number}
     */
    this.mY = y;
  }

  /**
   * Returns the object under cursor right now.
   * @readonly
   *
   * @returns {GameObject}
   */
  get activeObject() {
    return this.mActiveObject;
  }

  get x() {
    return this.mX;
  }

  get y() {
    return this.mY;
  }
}
