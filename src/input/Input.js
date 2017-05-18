/*
 Has to be static class.

 + before update store all events locally
 - check root object! add collider automatically? or do it on demand?
 */

/* @echo EXPORT */
class Input extends System {
  constructor() {
    super();

    /** @type {Input} */
    this.constructor.instance = this;

    /** @type {Vector} */
    this.mPointerPosition = new Vector();

    /** @type {Element} */
    this.mDom = Black.instance.containerElement;

    /** @type {Array<string>} */
    this.mEventList = null;

    /** @type {Array<string>} */
    this.mKeyEventList = null;

    this.__initListeners();

    /** @type {Array<{e: Event, x: number, y:number}>} */
    this.mPointerQueue = [];

    /** @type {Array<Event>} */
    this.mKeyQueue = [];

    /** @type {Array<number>} */
    this.mPressedKeys = [];

    /** @type {boolean} */
    this.mIsPointerDown = false;

    this.mNeedUpEvent = false;

    /** @type {Array<InputComponent>} */
    this.mInputListeners = [];
  }

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

  __sortListeners() {
    // console.log('-----------')
    for (let i = 0; i < this.mInputListeners.length; i++) {
      let go = this.mInputListeners[i].gameObject;
      // console.log(go.name, go.displayDepth);
    }
  }


  /**
   * @param {Event} e
   *
   * @return {boolean}
   */
  __onKeyEvent(e) {
    this.mKeyQueue.push(e);
    return true;
  }

  __onPointerEventDoc(e) {
    let over = e.target == this.mDom || e.target.parentElement == this.mDom;

    if (over === false && this.mNeedUpEvent === true) {
      this.mNeedUpEvent = false;
      this.__pushEvent(e);
    }
  }


  /**
   * @param {Event} e Description
   *
   * @return {boolean} Description
   */
  __onPointerEvent(e) {
    e.preventDefault();

    this.__pushEvent(e);

    return true;
  }

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
   * __getPointerPos - Description
   *
   * @param {Element} canvas Description
   * @param {Event} evt    Description
   *
   * @return {Vector} Description
   */
  __getPointerPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.clientWidth / rect.width;
    let scaleY = canvas.clientHeight / rect.height;
    return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  }

  /**
   * __getTouchPos - Description
   *
   * @param {Element} canvas Description
   * @param {TouchEvent} evt    Description
   *
   * @return {Vector} Description
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
   * __addListener - Description
   *
   * @param {Array<InputComponent>} array Description
   *
   * @return {void} Description
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
   * onChildrenAdded - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenAdded(child) {
    let cs = GameObject.findComponents(child, InputComponent);
    if (!cs || cs.length === 0)
      return;

    this.__addListener(cs);
  }


  /**
   * onChildrenRemoved - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenRemoved(child) {
    let cs = GameObject.findComponents(child, InputComponent);
    if (!cs || cs.length === 0)
      return;

    for (var i = cs.length - 1; i >= 0; i--) {
      let component = cs[i];
      let index = this.mInputListeners.indexOf(/** @type {InputComponent} */ (component));

      if (index !== -1)
        this.mInputListeners.splice(index, 1);
    }

    this.__sortListeners();
  }


  /**
   * onComponentAdded - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentAdded(child, component) {
    if (component.constructor !== InputComponent)
      return;

    this.__addListener([component]);
  }


  /**
   * onComponentRemoved - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentRemoved(child, component) {
    if (component.constructor !== InputComponent)
      return;

    let index = this.mInputListeners.indexOf(/** @type {InputComponent} */ (component));
    if (index !== -1) {
      this.mInputListeners.splice(index, 1);
      this.__sortListeners();
    }
  }


  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
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
   * on - Description
   *
   * @param {string} name           Description
   * @param {Function} callback       Description
   * @param {Object=} [context=null] Description
   *
   * @return {void} Description
   */
  static on(name, callback, context = null) {
    Input.instance.on(name, callback, context);
  }


  /**
   * isPointerDown - Description
   *
   * @return {boolean} Description
   */
  static get isPointerDown() {
    return Input.instance.mIsPointerDown;
  }


  /**
   * pointerX - Description
   *
   * @return {number} Description
   */
  static get pointerX() {
    return Input.instance.mPointerPosition.x;
  }


  /**
   * pointerY - Description
   *
   * @return {number} Description
   */
  static get pointerY() {
    return Input.instance.mPointerPosition.y;
  }


  /**
   * pointerPosition - Description
   *
   * @return {Vector} Description
   */
  static get pointerPosition() {
    return Input.instance.mPointerPosition;
  }

  static get pressedKeys() {
    return Input.instance.mPressedKeys;
  }
}

/** @type {Input}
 * @nocollapse
 */
Input.instance = null;


/** @type {number}
 *  @const
 */
Input.POINTER_MOVE = 0;

/** @type {number}
 *  @const
 */
Input.POINTER_DOWN = 1;

/** @type {number}
 *  @const
 */
Input.POINTER_UP = 2;

/** @type {number}
 *  @const
 */
Input.POINTER_CANCEL = 3;

/** @type {number}
 *  @const
 */
Input.POINTER_IN = 4;

/** @type {number}
 *  @const
 */
Input.POINTER_OUT = 5;

/** @type {Array<string>}
 *  @const
 */
Input.mKeyEventList = ['keydown', 'keyup'];

/** @type {Array<string>}
 *  @const
 */
Input.mKeyEventsLookup = ['keyDown', 'keyUp', 'keyPress'];

/** @type {Array<string>}
 *  @const
 */
Input.mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerIn', 'pointerOut'];

/** @type {Array<string>}
 *  @const
 */
Input.mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointerenter', 'pointerleave'];

/** @type {Array<string>}
 *  @const
 */
Input.mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'];

/** @type {Array<string>}
 *  @const
 */
Input.mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchenter', 'touchleave'];
