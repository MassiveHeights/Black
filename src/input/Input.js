/**
 * A input system class is reponsible for mouse, touch and keyboard input events.
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
     * @private
     * @type {Array<InputComponent>}
     */
    this.mInputListeners = [];
  }


  /**
   * @private
   *
   * @returns {void}
   */
  __initListeners() {
    this.mKeyEventList = Input.mKeyEventList;
    //debugger;

    if (window.PointerEvent)
      this.mEventList = Input.mPointerEventList;
    else if (Device.isTouch && Device.isMobile)
      this.mEventList = Input.mTouchEventList;
    else
      this.mEventList = Input.mMouseEventList;

    for (let i = 0; i < 6; i++)
      this.mDom.addEventListener(this.mEventList[i], e => this.__onPointerEvent(e), false);

    document.addEventListener(this.mEventList[Input.POINTER_UP], e => this.__onPointerEventDoc(e), false);

    for (let i = 0; i < this.mKeyEventList.length; i++)
      document.addEventListener(this.mKeyEventList[i], e => this.__onKeyEvent(e), false);
  }


  /**
   * @private
   *
   * @returns {void}
   */
  __sortListeners() {
    // TODO: make it faster
    // - try insert sort

    console.log('------');
    this.mInputListeners.sort((a, b) => {
      let depthA = a.gameObject.depth;
      let depthB = b.gameObject.depth;

      let indexA = a.gameObject.index;
      let indexB = b.gameObject.index;

      if (depthA === depthB)
        return (indexA < indexB) ? -1 : (indexA > indexB) ? 1 : 0;
      else
        return depthA < depthB ? 1 : 1;
    });
  }

  /**
   * @private
   * @param {Event} e
   *
   * @return {boolean}
   */
  __onKeyEvent(e) {
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
      p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */ (e));
    else
      p = this.__getPointerPos(this.mDom, e);

    this.mPointerPosition.x = p.x;
    this.mPointerPosition.y = p.y;

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
   * @private
   * @param {Array<InputComponent>} array
   *
   * @return {void}
   */
  __addListener(array) {
    // check for duplicates
    for (let i = 0; i < array.length; i++) {
      let item = /** @type {InputComponent} */ (array[i]);

      if (this.mInputListeners.indexOf(item) === -1)
        this.mInputListeners.push(item);
    }

    this.__sortListeners();
  }


  /**
   * @inheritdoc
   * @override
   * @param {GameObject} child
   *
   * @return {void}
   */
  onChildrenAdded(child) {
    let cs = GameObject.findComponents(child, InputComponent);
    if (!cs || cs.length === 0)
      return;

    this.__addListener(cs);
  }


  /**
   * @inheritdoc
   * @override
   * @param {GameObject} child
   *
   * @return {void}
   */
  onChildrenRemoved(child) {
    let cs = GameObject.findComponents(child, InputComponent);
    if (!cs || cs.length === 0)
      return;

    for (var i = cs.length - 1; i >= 0; i--) {
      let component = cs[i];
      let index = this.mInputListeners.indexOf( /** @type {InputComponent} */ (component));

      if (index !== -1)
        this.mInputListeners.splice(index, 1);
    }

    this.__sortListeners();
  }


  /**
   * @inheritdoc
   * @override
   *
   * @param {GameObject} child
   * @param {Component} component
   *
   * @return {void}
   */
  onComponentAdded(child, component) {
    if (component.constructor !== InputComponent)
      return;

    this.__addListener([component]);
  }

  /**
   * @inheritdoc
   * @override
   *
   * @param {GameObject} child
   * @param {Component} component
   *
   * @return {void}
   */
  onComponentRemoved(child, component) {
    if (component.constructor !== InputComponent)
      return;

    let index = this.mInputListeners.indexOf( /** @type {InputComponent} */ (component));
    if (index !== -1) {
      this.mInputListeners.splice(index, 1);
      this.__sortListeners();
    }
  }

  /**
   * @inheritdoc
   * @override
   * @param {number} dt
   *
   * @return {void}
   */
  onUpdate(dt) {
    let pointerPos = new Vector();

    for (let i = 0; i < this.mPointerQueue.length; i++) {
      let nativeEvent = this.mPointerQueue[i];

      let ix = this.mEventList.indexOf(nativeEvent.e.type);
      let fnName = Input.mInputEventsLookup[ix];

      if (fnName === 'pointerDown')
        this.mNeedUpEvent = true;

      pointerPos.set(nativeEvent.x, nativeEvent.y);

      /** @type {InputComponent|null} */
      let currentComponent = null;
      for (let k = 0; k < this.mInputListeners.length; k++) {
        currentComponent = this.mInputListeners[k];

        // if (currentComponent.gameObject === null)
        //   console.log(currentComponent);

        if (GameObject.intersects(currentComponent.gameObject, pointerPos) === false) {
          // check for out events
          if (currentComponent.mPointerInside === true) {
            currentComponent.mPointerInside = false;
            currentComponent.gameObject.post('~pointerOut');
          }

          continue;
        }

        // TODO: fix weird extra pointerMove bug on chrome, happens right after down and before up
        if (ix === Input.POINTER_DOWN)
          this.mIsPointerDown = true;
        else if (ix === Input.POINTER_UP)
          this.mIsPointerDown = false;

        if (currentComponent.mPointerInside === false) {
          currentComponent.mPointerInside = true;
          currentComponent.gameObject.post('~pointerIn');
        }

        currentComponent.gameObject.post('~' + fnName);
      }

      this.post(fnName);
    }

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

    this.mPointerQueue.splice(0, this.mPointerQueue.length);
    this.mKeyQueue.splice(0, this.mKeyQueue.length);
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

/**
 * @type {Input}
 * @nocollapse
 */
Input.instance = null;

/**
 * @type {number}
 * @const
 */
Input.POINTER_MOVE = 0;

/**
 * @type {number}
 * @const
 */
Input.POINTER_DOWN = 1;

/**
 * @type {number}
 * @const
 */
Input.POINTER_UP = 2;

/**
 * @type {number}
 * @const
 */
Input.POINTER_CANCEL = 3;

/**
 * @type {number}
 * @const
 */
Input.POINTER_IN = 4;

/**
 * @type {number}
 * @const
 */
Input.POINTER_OUT = 5;

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
