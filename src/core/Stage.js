// TODO: remove removeFromParent
/* @echo EXPORT */
class Stage extends GameObject {
  constructor() {
    super();

    this.mName = 'stage';

    this.mScaleMode = StageScaleMode.NORMAL;

    this.mWidth = 960;
    this.mHeight = 640;

    this.mStageWidth = 0;
    this.mStageHeight = 0;
    this.mStageScaleFactor = 0;

    this.mCacheWidth = 0;
    this.mCacheHeight = 0;

    //this.mOrientation = StageOrientation.UNIVERSAL;

    this.addComponent(new InputComponent());
  }

  // get orientation() {
  //   return this.mOrientation;
  // }

  // set orientation(value) {
  //   this.mOrientation = value;
  //   this.__refresh();
  // }

  setSize(width, height) {
    this.mWidth = width;
    this.mHeight = height;

    this.__refresh();
  }

  onUpdate(dt) {
    let size = Black.instance.viewport.size;

    if (this.mCacheWidth !== size.width || this.mCacheHeight !== size.height) {
      this.mCacheWidth = size.width;
      this.mCacheHeight = size.height;
      this.__refresh();
    }
  }

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

      this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
      this.mStageWidth = ~~width;
      this.mStageHeight = ~~height;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor;
    } else if (this.mScaleMode === StageScaleMode.NORMAL) {
      let size = Black.instance.viewport.size;
      this.mStageWidth = Black.instance.viewport.size.width;
      this.mStageHeight = Black.instance.viewport.size.height;
      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1;
    } else if (this.mScaleMode === StageScaleMode.FIT) {
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
      this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
      this.mScaleX = this.mScaleY = this.mStageScaleFactor;
    } else {
      let size = Black.instance.viewport.size;

      this.mStageWidth = ~~(size.width * this.dpr);
      this.mStageHeight = ~~(size.height * this.dpr);
      this.mStageScaleFactor = 1 / this.dpr;
      this.mScaleX = this.mScaleY = this.mStageScaleFactor;
    }

    Black.instance.video.__onResize();
    this.setTransformDirty();
    this.post('resize');
  }

  LP(land, port) {
    return this.isLandscape ? land : port;
  }

  get scaleMode() {
    return this.mScaleMode;
  }

  set scaleMode(value) {
    this.mScaleMode = value;
    this.__refresh();
  }

  get dpr() {
    return Device.getDevicePixelRatio();
  }

  get scaleFactor() {
    return this.mStageScaleFactor;
  }

  get renderWidth() {
    return this.mStageWidth * this.dpr * this.mStageScaleFactor;
  }

  get renderHeight() {
    return this.mStageHeight * this.dpr * this.mStageScaleFactor;
  }

  get isLandscape() {
    let size = Black.instance.viewport.size;
    return size.width >= size.height;
  }

  get isPortrait() {
    return !this.isLandscape;
  }

  get centerX() {
    return this.mStageWidth * 0.5;
  }

  get centerY() {
    return this.mStageHeight * 0.5;
  }

  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(-this.mX / this.mStageScaleFactor, -this.mY / this.mStageScaleFactor, this.width + 2 * this.mX / this.mStageScaleFactor, this.height + 2 * this.mY / this.mStageScaleFactor);
  }

  onGetLocalBounds() { Debug.error('Not allowed.'); }
  removeFromParent() { Debug.error('Not allowed.'); }

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
  get y() { this.mY / this.mStageScaleFactor } // GG ES6

  set rotation(value) { Debug.error('Not allowed.'); }
  get rotation() { return 0; } // GG ES6

  set width(value) { Debug.error('Not allowed.'); }
  get width() { return this.mStageWidth; }

  set height(value) { Debug.error('Not allowed.'); }
  get height() { return this.mStageHeight; }

  set name(value) { Debug.error('Not allowed.'); }
  get name() { return this.mName }
}

/**
 * A blend mode enum.
 * @cat drivers
 * @enum {string}
 */
/* @echo EXPORT */
var StageScaleMode = {
  NORMAL: 'normal', // the stage size will be the same no matter what DPI is
  NO_SCALE: 'noScale', // the stage size will be affected by dpi
  FIXED: 'fixed', // the stage size tries to stay inside requested size. default is 960x640
  FIT: 'fit' // the stage size will be equal to requested size, position will be centered
};

/**
 * StageOrientation
 * @cat stage
 * @enum {string}
 */
/* @echo EXPORT */
var StageOrientation = {
  UNIVERSAL: 'universal',
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};