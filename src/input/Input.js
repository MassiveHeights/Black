import { System } from "../core/System";
import { Debug } from "../core/Debug";
import { Vector } from "../geom/Vector";
import { Black } from "../Black";
import { InputComponent } from "./InputComponent";
import { KeyInfo } from "./KeyInfo";
import { Device } from "../system/Device";
import { Camera } from "../display/Camera";

/**
 * A input system class is responsible for mouse, touch and keyboard input events.
 * Pointer events works for a single target only.
 * Global Input messages has higher priority.
 *
 * When GameObject gets a `pointerDown` message it gets target locked. Other
 * objects will not receive `pointerMove` or `pointerUp` messages. Target locked
 * object will receive `pointerUp` message even if pointer is outside of its
 * bounds.
 * 
 * Every object in the display list should be `touchable` in order to receive input messages.
 *
 * @cat input
 * @fires Input#pointerMove
 * @fires Input#pointerDown
 * @fires Input#pointerUp
 * 
 * @fires GameObject#pointerMove
 * @fires GameObject#pointerDown
 * @fires GameObject#pointerUp
 * 
 * @extends black-engine~System
 */
export class Input extends System {
  /**
   * Private constructor.
   */
  constructor() {
    super();

    Debug.assert(this.constructor.instance == null, 'Only single instance is allowed');

    Black.input = this;

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mViewportPosition = new Vector();

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mPointerPosition = new Vector();

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mStagePosition = new Vector();

    /** 
     * @private 
     * @type {Element|null} 
     */
    this.mDom = null;

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

    /** 
     * @private 
     * @type {Array<{name: String, listener: Function}>} 
     */
    this.mBoundListeners = [];

    /** 
     * @private 
     * @type {Array<{e: Event, x: number, y:number}>} 
     */
    this.mPointerQueue = [];

    /** 
     * @private 
     * @type {Array<KeyboardEvent>} 
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

    // NOTE: we need guarantee that keys are not going to change theirs order when iterating.
    /** 
     * @private 
     * @type {Map} 
     */
    this.mInputListeners = new Map();

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mTarget = null;

    /** 
     * @private 
     * @type {black-engine~Component} 
     */
    this.mTargetComponent = null;

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mLockedTarget = null;

    /** 
     * @private 
     * @type {black-engine~Component} 
     */
    this.mLastInTargetComponent = null;

    this.__initialize();
  }

  /**
   * @ignore
   */
  __initialize() {
    this.mDom = Black.engine.viewport.nativeElement;

    this.__initListeners();
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __initListeners() {
    this.mKeyEventList = mKeyEventList;
    let isMouseDevice = false;

    if (window.PointerEvent) {
      this.mEventList = mPointerEventList;
      isMouseDevice = true;
    }
    else if (Black.device.isTouch && Black.device.isMobile) {
      this.mEventList = mTouchEventList;
    }
    else {
      this.mEventList = mMouseEventList;
      isMouseDevice = true;
    }

    for (let i = 0; i < 3; i++)
      this.mDom.addEventListener(this.mEventList[i], e => this.__onPointerEvent(e), false);

    let addBoundsListener = (target, name, action) => {
      const listener = e => action.call(this, e);

      this.mBoundListeners.push({ name: name, listener: listener });
      target.addEventListener(name, listener);
    };

    addBoundsListener(document, this.mEventList[IX_POINTER_MOVE], this.__onPointerEventDoc);
    addBoundsListener(document, this.mEventList[IX_POINTER_UP], this.__onPointerEventDoc);

    if (isMouseDevice === true)
      addBoundsListener(window, 'wheel', this.__onPointerEventDoc);

    // handle keyboard listeners
    for (let i = 0; i < this.mKeyEventList.length; i++)
      addBoundsListener(document, this.mKeyEventList[i], this.__onKeyEvent);
  }

  /**
   * @ignore
   * @private
   * @param {KeyboardEvent} e
   * @returns {boolean}
   */
  __onKeyEvent(e) {
    if (Black.engine.isPaused === true)
      return false;

    this.mKeyQueue.push(e);
    return true;
  }

  /**
   * @ignore
   * @private
   * @param {Event} e
   * @returns {void}
   */
  __onPointerEventDoc(e) {
    if (Black.engine.isPaused === true)
      return;

    let over = false;

    // IE11 does not have support for `path`
    let element = e.target;
    while (element) {
      if (element === this.mDom) {
        over = true;
        break;
      }
      element = element.parentElement;
    }

    if (e.type === 'wheel') {
      if (over === true)
        this.__pushEvent(e);
    } else {
      if (over === false && this.mIsPointerDown === true)
        this.__pushEvent(e);
    }
  }

  /**
   * @ignore
   * @private
   * @param {Event} e
   * @returns {boolean}
   */
  __onPointerEvent(e) {
    if (Black.engine.isPaused === true)
      return false;

    e.preventDefault();

    this.__pushEvent(e);
    return true;
  }

  /**
   * @ignore
   * @private
   * @param {Event} e
   * @returns {void}
   */
  __pushEvent(e) {
    let /** @type {Vector|null} */ p = null;
    if (e.type.indexOf('touch') === 0)
      p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */(e));
    else
      p = this.__getPointerPos(this.mDom, e);

    this.mPointerQueue.push({ e: e, x: p.x, y: p.y });
  }

  /**
   * @ignore
   * @private
   * @param {Element} canvas
   * @param {Event} evt
   * @returns {black-engine~Vector}
   */
  __getPointerPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    const rotation = Black.engine.viewport.rotation;

    let scaleX = (rotation === 0 ? canvas.clientWidth : canvas.clientHeight) / rect.width;
    let scaleY = (rotation === 0 ? canvas.clientHeight : canvas.clientWidth) / rect.height;

    return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  }

  /**
   * @ignore
   * @private
   * @param {Element} canvas
   * @param {TouchEvent} evt
   * @returns {black-engine~Vector}
   */
  __getTouchPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    /** @type {Touch} */
    let touch = evt.changedTouches[0]; // ios? what about android?
    let x = touch.clientX;
    let y = touch.clientY;

    const rotation = Black.engine.viewport.rotation;
    let scaleX = (rotation === 0 ? canvas.clientWidth : canvas.clientHeight) / rect.width;
    let scaleY = (rotation === 0 ? canvas.clientHeight : canvas.clientWidth) / rect.height;

    return new Vector((x - rect.left) * scaleX, (y - rect.top) * scaleY);
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    // omg, who gave you keyboard?
    this.__updateKeyboard();

    const size = Black.engine.viewport.size;
    const rotation = Black.engine.viewport.rotation;

    let stage = Black.stage;

    while (this.mPointerQueue.length > 0) {
      const nativeEvent = this.mPointerQueue.shift();

      const x = nativeEvent.x;
      const y = nativeEvent.y;

      if (rotation === 1) {
        nativeEvent.x = y;
        nativeEvent.y = size.height - x;
      } else if (rotation === -1) {
        nativeEvent.x = size.width - y;
        nativeEvent.y = x;
      }

      // update to the latest position
      this.mPointerPosition.x = nativeEvent.x;
      this.mPointerPosition.y = nativeEvent.y;

      this.mViewportPosition.copyFrom(this.mPointerPosition);

      if (Black.camera !== null)
        Black.camera.worldTransformation.transformVector(this.mPointerPosition, this.mPointerPosition);

      this.mStagePosition.copyFrom(this.mPointerPosition);

      let inv = stage.worldTransformationInverted;
      inv.transformVector(this.mStagePosition, this.mStagePosition);

      let eventType = mInputEventsLookup[this.mEventList.indexOf(nativeEvent.e.type)];

      this.__findTarget(this.mPointerPosition);
      this.__processNativeEvent(nativeEvent, this.mPointerPosition, eventType);
    }
  }

  /**
   * @ignore
   * @private
   * @param {black-engine~Vector} pos
   */
  __findTarget(pos) {
    let obj = Black.stage.hitTest(pos);

    if (obj === null) {
      this.mTarget = null;
      this.mTargetComponent = null;
      return;
    }

    this.mTarget = obj;
    this.mTargetComponent = obj.getComponent(InputComponent);
  }

  /**
   * @ignore
   * @private
   * @param {Object} nativeEvent
   * @param {black-engine~Vector} pos
   * @param {string} type
   */
  __processNativeEvent(nativeEvent, pos, type) {
    if (type === Input.POINTER_DOWN) {
      this.mIsPointerDown = true;
    }
    else if (type === Input.POINTER_UP) {
      this.mIsPointerDown = false;
    }

    let delta = 0;
    if (type === Input.WHEEL)
      delta = nativeEvent.e.deltaY > 0 ? 1 : -1;

    const info = new PointerInfo(this.mTarget, pos.x, pos.y, nativeEvent.e.button, delta);
    this.post(type, info);

    if (this.mTarget === null && this.mLockedTarget === null)
      return;

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
      if (this.mTarget !== null)
        this.mTarget.post('~' + type, info);
    } else {
      if (sameTarget === true)
        this.mLockedTarget.post('~' + type, info);
      else {
        if (this.mLockedTarget.mParent !== null && this.mTarget !== null)
          this.mLockedTarget.mParent.post('~' + type, info);
      }
    }
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __updateKeyboard() {
    while (this.mKeyQueue.length > 0) {
      let nativeEvent = this.mKeyQueue.shift();

      let ix = this.mKeyEventList.indexOf(nativeEvent.type);
      let pIx = this.mPressedKeys.indexOf(nativeEvent.keyCode);
      let fnName = mKeyEventsLookup[ix];

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
   * @override
   */
  dispose() {
    super.dispose();

    while (this.mBoundListeners.length > 0) {
      let keyValue = this.mBoundListeners.pop();
      document.removeEventListener(keyValue.name, keyValue.listener);
    }

    Black.input = null;
  }

  /**
   * Indicates if mouse or touch in down at this moment.
   *
   * @returns {boolean}
   */
  get isPointerDown() {
    return this.mIsPointerDown;
  }

  /**
   * Returns mouse or touch pointer x-component.
   *
   * @returns {number}
   */
  get pointerX() {
    return this.mPointerPosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component.
   *
   * @returns {number}
   */
  get pointerY() {
    return this.mPointerPosition.y;
  }

  /**
   * Returns mouse or touch pointer x-component relative to stage.
   *
   * @returns {number}
   */
  get stageX() {
    return this.mStagePosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component  relative to stage.
   *
   * @returns {number}
   */
  get stageY() {
    return this.mStagePosition.y;
  }

  /**
   * Returns mouse or touch pointer position relative to viewport.
   *
   * @returns {black-engine~Vector}
   */
  get viewportPosition() {
    return this.mViewportPosition;
  }

  /**
   * Returns mouse or touch pointer position including active camera transformation.
   *
   * @returns {black-engine~Vector}
   */
  get pointerPosition() {
    return this.mPointerPosition;
  }

  /**
   * Returns pointer position relative to the stage.
   * 
   * @returns {black-engine~Vector}
   */
  get stagePosition() {
    return this.mStagePosition;
  }

  /**
   * Returns list of pressed keys.
   *
   * @returns {Array<number>}
   */
  get pressedKeys() {
    return this.mPressedKeys;
  }

  /**
   * @type {string}
   * @const
   */
  static get POINTER_DOWN() { return 'pointerDown'; }

  /**
   * @type {string}
   * @const
   */
  static get POINTER_MOVE() { return 'pointerMove'; }

  /**
   * @type {string}
   * @const
   */
  static get POINTER_UP() { return 'pointerUp'; }

  /**
   * @type {string}
   * @const
   */
  static get WHEEL() { return 'wheel'; }
}


/**
 * @private
 * @type {number}
 * @const
 */
const IX_POINTER_MOVE = 0;

/**
 * @private
 * @type {number}
 * @const
 */
const IX_POINTER_DOWN = 1;

/**
 * @private
 * @type {number}
 * @const
 */
const IX_POINTER_UP = 2;

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mKeyEventList = ['keydown', 'keyup'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mKeyEventsLookup = ['keyDown', 'keyUp', 'keyPress'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerIn', 'pointerOut', 'wheel'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointerenter', 'pointerleave', 'wheel'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'wheel'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchenter', 'touchleave'];

/**
 * Posts when mouse down or touch down event happened.
 * @event Input#pointerDown
 */

/**
 * Posts when mouse up or touch up event happened.
 * @event Input#pointerUp
 */

/**
 * Posts when mouse move or touch move event happened.
 * @event Input#pointerMove
 */

/**
* Posts when mouse down or touch down event happened.
* @event GameObject#pointerDown
*/

/**
 * Posts when mouse up or touch up event happened.
 * @event GameObject#pointerUp
 */

/**
 * Posts when mouse move or touch move event happened.
 * @event GameObject#pointerMove
 */

/**
 * Stores additional information about pointer events.
 *
 * @ignore
 * @cat input
 */
class PointerInfo {
  /**
   * Creates new PointerInfo instance. For internal use only.
   *
   * @param {black-engine~GameObject} activeObject `GameObject` the cursor is above.
   * @param {number} x x-coordinate
   * @param {number} y y-coordinate
   * @param {number} button active pressed button
   */
  constructor(activeObject, x, y, button, delta = 0) {

    /** 
     * @private 
     * @type {black-engine~GameObject} 
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

    /** 
     * @private 
     * @type {number} 
     */
    this.mButton = button;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDelta = delta;
  }

  /**
   * Retruns normalized wheel delta value.
   * @returns {number}
   */
  get delta() {
    return this.mDelta;
  }

  /**
   * Retruns current pressed button.
   * @returns {number}
   */
  get button() {
    return this.mButton;
  }

  /**
   * Returns the object under cursor right now.
   *
   * @readonly
   * @returns {black-engine~GameObject}
   */
  get activeObject() {
    return this.mActiveObject;
  }

  /**
   * X-coordinate.
   *
   * @readonly
   * @returns {number}
   */
  get x() {
    return this.mX;
  }

  /**
   * Y-coordinate.
   *
   * @readonly
   * @returns {number}
   */
  get y() {
    return this.mY;
  }
}