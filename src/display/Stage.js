import { GameObject } from "../core/GameObject";
import { StageScaleMode } from "./StageScaleMode";
import { Black } from "../Black";
import { InputComponent } from "../input/InputComponent";
import { Input } from "../input/Input";
import { Rectangle } from "../geom/Rectangle";
import { Message } from "../messages/Message";
import { Debug } from "../core/Debug";

/**
 * The root container for all renderable objects
 *
 * @cat display
 * @fires Stage#resize
 * @extends black-engine~GameObject
 */
export class Stage extends GameObject {
  constructor() {
    super();

    /** 
     * @private 
     * @type {string} 
     */
    this.mName = 'stage';

    /** 
     * @private 
     * @type {black-engine~StageScaleMode} 
     */
    this.mScaleMode = StageScaleMode.NORMAL;

    /** 
     * @private 
     * @type {number} 
     */
    this.mWidth = 960;
    /** 
     * @private 
     * @type {number} 
     */
    this.mHeight = 640;

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
    this.mStageScaleFactor = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mCacheWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mCacheHeight = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDPR = Black.device.getDevicePixelRatio();

    this.mAdded = true;

    // Fake 
    if (Black.engine.hasSystem(Input)){
      let c = new InputComponent()
      c.mAdded = true;
      this.addComponent(c);
    }
  }

  /**
   * Sets stage size by given width and height.
   *
   * @param {number} width New stage width.
   * @param {number} height New stage height.
   * @returns {void}
   */
  setSize(width, height) {
    this.mWidth = width;
    this.mHeight = height;

    this.__refresh();
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    let size = Black.engine.viewport.size;

    if (this.mCacheWidth !== size.width || this.mCacheHeight !== size.height) {
      this.mCacheWidth = size.width;
      this.mCacheHeight = size.height;

      this.__refresh();
    }
  }

  /**
   * Refreshes stage size. Call this method only if you are changing the size of the container manually. 
   */
  refresh() {
    this.__refresh();
  }

  /**
   * @private
   * @ignore
   * @returns {void}
   */
  __refresh() {
    const size = Black.engine.viewport.size;
    const windowWidth = size.width;
    const windowHeight = size.height;

    if (this.mScaleMode === StageScaleMode.FIXED) {
      const mw = windowWidth * this.mHeight / windowHeight;
      const mh = windowHeight * this.mWidth / windowWidth;
      const sc = Math.max(mw / windowWidth, mh / windowHeight);
      const width = windowWidth * sc;
      const height = windowHeight * sc;

      this.mStageWidth = width;
      this.mStageHeight = height;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
    } else if (this.mScaleMode === StageScaleMode.LETTERBOX || this.mScaleMode === StageScaleMode.COVER) {
      const sc = this.mScaleMode === StageScaleMode.COVER ?
        Math.max(windowWidth / this.mWidth, windowHeight / this.mHeight) :
        Math.min(windowWidth / this.mWidth, windowHeight / this.mHeight);

      this.mX = (windowWidth - this.mWidth * sc) / 2;
      this.mY = (windowHeight - this.mHeight * sc) / 2;

      this.mStageWidth = this.mWidth;
      this.mStageHeight = this.mHeight;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = sc;
    } else if (this.mScaleMode === StageScaleMode.NORMAL) {
      this.mStageWidth = windowWidth;
      this.mStageHeight = windowHeight;
      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1;
    } else if (this.mScaleMode === StageScaleMode.NO_SCALE) {
      this.mStageWidth = (windowWidth * this.mDPR);
      this.mStageHeight = (windowHeight * this.mDPR);

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1 / this.mDPR;
    } else {
      Debug.error('Not supported stage scale mode.');
    }

    this.mStageWidth = Math.round(this.mStageWidth);
    this.mStageHeight = Math.round(this.mStageHeight);
    this.mX = Math.round(this.mX);
    this.mY = Math.round(this.mY);

    // TODO: i don't like this line
    // TODO: me neither
    // TODO: but its setting Renderer.__dirty which is good
    // TODO: replace with priority message?
    Black.driver.__onResize(null, null);

    this.setTransformDirty();

    this.mLocalTransform.set(this.mScaleX, 0, 0, this.mScaleY, this.mX, this.mY);

    /**
     * Posts every time stage size is changed.
     * @event Stage#resize
     */
    this.post(Message.RESIZE);
  }

  /**
   * Gets/Sets stage scale mode.
   *
   * @return {black-engine~StageScaleMode}
   */
  get scaleMode() {
    return this.mScaleMode;
  }

  /**
   * @param {black-engine~StageScaleMode} value
   * @returns {void}
   */
  set scaleMode(value) {
    this.mScaleMode = value;
    this.__refresh();
  }

  /**
   * Stage scale factor.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get scaleFactor() {
    return this.mStageScaleFactor;
  }

  /**
   * Original stage width multiplied by device pixel ratio and stage scale factor.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get renderWidth() {
    return this.mStageWidth * this.mDPR * this.mStageScaleFactor;
  }

  /**
   * Original stage height multiplied by device pixel ratio and stage scale factor.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get renderHeight() {
    return this.mStageHeight * this.mDPR * this.mStageScaleFactor;
  }

  /**
   * Gets stage center coordinate along X-axis.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get centerX() {
    return this.mStageWidth * 0.5;
  }

  /**
   * Gets stage center coordinate along Y-axis.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get centerY() {
    return this.mStageHeight * 0.5;
  }

  /**
   * @inheritDoc
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(-this.mX / this.mStageScaleFactor, -this.mY / this.mStageScaleFactor, this.mStageWidth + 2 * this.mX / this.mStageScaleFactor, this.mStageHeight + 2 * this.mY / this.mStageScaleFactor);
  }

  /**
   * @override
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, this.mStageWidth, this.mStageHeight);
  }

  /**
   * Returns local transformation `Matrix`
   *
   * @override
   * @return {black-engine~Matrix}
   */
  get localTransformation() {
    return this.mLocalTransform;
  }

  /**
   * @override
   * @param {black-engine~Matrix} value
   * @return {void}
   */
  set localTransformation(value) {
    Debug.error('Not allowed.');
  }

  removeFromParent() { Debug.error('Not allowed.'); }

  set scaleX(value) { Debug.error('Not allowed.'); }
  get scaleX() { return 1; }

  set scaleY(value) { Debug.error('Not allowed.'); }
  get scaleY() { return 1; }

  set pivotOffsetX(value) { Debug.error('Not allowed.'); }
  get pivotOffsetX() { return 0; }

  set pivotOffsetY(value) { Debug.error('Not allowed.'); }
  get pivotOffsetY() { return 0; }

  set anchorX(value) { Debug.error('Not allowed.'); }
  get anchorX() { return 0; }

  set anchorY(value) { Debug.error('Not allowed.'); }
  get anchorY() { return 0; }

  set x(value) { Debug.error('Not allowed.'); }
  get x() { return this.mX / this.mStageScaleFactor; } // GG ES6

  set y(value) { Debug.error('Not allowed.'); }
  get y() { return this.mY / this.mStageScaleFactor } // GG ES6

  set rotation(value) { Debug.error('Not allowed.'); }
  get rotation() { return 0; } // GG ES6

  set width(value) { Debug.error('Not allowed.'); }
  get width() { return this.mStageWidth; }

  set height(value) { Debug.error('Not allowed.'); }
  get height() { return this.mStageHeight; }

  set name(value) { Debug.error('Not allowed.'); }
  get name() { return this.mName }
}
