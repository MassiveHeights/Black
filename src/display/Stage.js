/**
 * The root container for all renderable objects
 *
 * @cat display
 * @extends GameObject
 */
/* @echo EXPORT */
class Stage extends GameObject {
  constructor() {
    super();

    /** @private @type {string} */
    this.mName = 'stage';

    /** @private @type {StageScaleMode} */
    this.mScaleMode = StageScaleMode.NORMAL;

    /** @private @type {number} */
    this.mWidth = 960;
    /** @private @type {number} */
    this.mHeight = 640;

    /** @private @type {number} */
    this.mStageWidth = 0;
    /** @private @type {number} */
    this.mStageHeight = 0;
    /** @private @type {number} */
    this.mStageScaleFactor = 0;

    /** @private @type {number} */
    this.mCacheWidth = 0;
    /** @private @type {number} */
    this.mCacheHeight = 0;

    /** @private @type {StageOrientation} */
    this.mOrientation = StageOrientation.UNIVERSAL;

    this.addComponent(new InputComponent());
  }

  /**
   * Gets/Sets stage orientation
   * 
   * @returns {StageOrientation}
   */
  get orientation() {
    return this.mOrientation;
  }

  /**
   * @ignore
   * @param {StageOrientation} value
   * @returns {void}
   */
  set orientation(value) {
    this.mOrientation = value;
    this.__refresh();
  }

  /**
   * Sets stage size by given width and height
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
  onUpdate(dt) {
    let size = Black.instance.viewport.size;

    if (this.mCacheWidth !== size.width || this.mCacheHeight !== size.height) {
      this.mCacheWidth = size.width;
      this.mCacheHeight = size.height;
      this.__refresh();
    }
  }

  /**
   * @private
   * @ignore
   * @returns {void}
   */
  __refresh() {
    if (this.mScaleMode === StageScaleMode.FIXED) {
      let size = Black.instance.viewport.size;
      let windowWidth = size.width;
      let windowHeight = size.height;
      let mw = this.LP(windowWidth * this.mHeight / windowHeight, windowWidth * this.mWidth / windowHeight);
      let mh = this.LP(windowHeight * this.mWidth / windowWidth, windowHeight * this.mHeight / windowWidth);
      let scaleFactor = Math.max(mw / windowWidth, mh / windowHeight);
      let width = windowWidth * scaleFactor;
      let height = windowHeight * scaleFactor;

      this.mStageWidth = width;
      this.mStageHeight = height;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
    } else if (this.mScaleMode === StageScaleMode.NORMAL) {
      let size = Black.instance.viewport.size;
      this.mStageWidth = Black.instance.viewport.size.width;
      this.mStageHeight = Black.instance.viewport.size.height;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1;
    } else if (this.mScaleMode === StageScaleMode.LETTERBOX) {
      let size = Black.instance.viewport.size;
      let windowWidth = size.width;
      let windowHeight = size.height;
      let mw = this.LP(windowWidth * this.mHeight / windowHeight, windowWidth * this.mWidth / windowHeight);
      let mh = this.LP(windowHeight * this.mWidth / windowWidth, windowHeight * this.mHeight / windowWidth);
      let scaleFactor = Math.max(mw / windowWidth, mh / windowHeight);
      let width = windowWidth * scaleFactor;
      let height = windowHeight * scaleFactor;

      let two = 2 * scaleFactor;
      this.mX = width / two - (this.LP(this.mWidth, this.mHeight) / two);
      this.mY = height / two - (this.LP(this.mHeight, this.mWidth) / two);

      this.mStageWidth = this.LP(this.mWidth, this.mHeight);
      this.mStageHeight = this.LP(this.mHeight, this.mWidth);
      
      this.mScaleX = this.mScaleY = this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
    } else {
      // NO SCALE
      let size = Black.instance.viewport.size;
      this.mStageWidth = (size.width * this.dpr);
      this.mStageHeight = (size.height * this.dpr);
      
      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1 / this.dpr;
    }

    this.mStageWidth = Math.round(this.mStageWidth);
    this.mStageHeight = Math.round(this.mStageHeight);

    // TODO: i don't like this line
    // TODO: me neither
    Black.driver.__onResize(null, null);

    this.setTransformDirty();
    this.post('resize');
  }

  /**
   * Determines which of two numbers suits to stage orientation
   * 
   * @public
   * @param {number} land Landscape mode value.
   * @param {number} port Portrait mode value.
   * @returns {number}
   */
  LP(land, port) {
    if (this.mOrientation == StageOrientation.LANDSCAPE)
      return land;
    else if (this.mOrientation == StageOrientation.PORTRAIT)
      return port;

    return this.isLandscape ? land : port;
  }

  /**
   * Gets/Sets stage scale mode
   * 
   * @return {StageScaleMode}
   */
  get scaleMode() {
    return this.mScaleMode;
  }

  /**
   * @ignore
   * @param {StageScaleMode} value
   * @returns {void}
   */
  set scaleMode(value) {
    this.mScaleMode = value;
    this.__refresh();
  }

  /**
   * Device Pixel Ratio
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get dpr() {
    return Device.getDevicePixelRatio();
  }

  /**
   * Stage scale factor
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
    return this.mStageWidth * this.dpr * this.mStageScaleFactor;
  }

  /**
   * Original stage height multiplied by device pixel ratio and stage scale factor.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get renderHeight() {
    return this.mStageHeight * this.dpr * this.mStageScaleFactor;
  }

  /**
   * Specifies whether the stage is in landscape orientation
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isLandscape() {
    let size = Black.instance.viewport.size;
    return size.width >= size.height;
  }

  /**
   * Specifies whether the stage is in portrait orientation
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isPortrait() {
    return !this.isLandscape;
  }

  /**
   * Gets stage center coordinate along X-axis
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get centerX() {
    return this.mStageWidth * 0.5;
  }

  /**
   * Gets stage center coordinate along Y-axis
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
    return outRect.set(-this.mX / this.mStageScaleFactor, -this.mY / this.mStageScaleFactor, this.width + 2 * this.mX / this.mStageScaleFactor, this.height + 2 * this.mY / this.mStageScaleFactor);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, this.mStageWidth, this.mStageHeight);
  }

  removeFromParent() { Debug.error('Not allowed.'); }

  /**
   * @inheritDoc
   */
  get localTransformation() {
    // TODO: optimize
    return new Matrix(this.mScaleX, 0, 0, this.mScaleY, this.mX, this.mY);
  }

  set scaleX(value) { Debug.error('Not allowed.'); }
  get scaleX() { return 1; }

  set scaleY(value) { Debug.error('Not allowed.'); }
  get scaleY() { return 1; }

  set pivotX(value) { Debug.error('Not allowed.'); }
  get pivotX() { return 0; }

  set pivotY(value) { Debug.error('Not allowed.'); }
  get pivotY() { return 0; }

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
