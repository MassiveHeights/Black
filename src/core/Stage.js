// TODO: remove removeFromParent
/* @echo EXPORT */
class Stage extends GameObject {
  constructor() {
    super();

    this.mName = 'stage';

    this.addComponent(new InputComponent());
    this.mScaleMode = StageScaleMode.NORMAL;

    // set default
    // this.scaleMode = StageScaleMode.NORMAL;
    this.mWidth = 960;
    this.mHeight = 640;

    this.mStageWidth = 0;
    this.mStageHeight = 0;
    this.mStageScaleFactor = 0;
  }

  __refresh( ){
    let size = Black.instance.viewport.size;
    let windowWidth = size.width;
    let windowHeight = size.height;
    let mw = this.LP(windowWidth * this.mHeight / windowHeight, windowWidth * this.mWidth / windowHeight);
    let mh = this.LP(windowHeight * this.mWidth / windowWidth, windowHeight * this.mHeight / windowWidth);
    let scaleFactor = Math.max(mw / windowWidth, mh / windowHeight);
    let width = windowWidth * scaleFactor;
    let height = windowHeight * scaleFactor;

    this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
    this.mStageWidth = width;
    this.mStageHeight = height;
  }

  LP(land, port) {
    return this.isLandscape ? land : port;
  }

  get scaleMode() {
    return this.mScaleMode;
  }

  set scaleMode(value) {
    this.mScaleMode = value;
    
    if (this.mScaleMode === StageScaleMode.FIXED) {
      this.__refresh();
      this.mScaleX = this.mScaleY = this.mStageScaleFactor;
    } else {
      this.mScaleX = this.mScaleY = 1 / this.scaleFactor;
    }

    this.setTransformDirty();
  }

  get scaleFactor() {
    return this.mScaleMode === StageScaleMode.NORMAL ? Device.getDevicePixelRatio() : 1;
  }

  get width() {
    if (this.mScaleMode === StageScaleMode.FIXED) {
     return this.mStageWidth;
    }

    return Black.instance.viewport.size.width * this.scaleFactor;
  }

  get height() {
    if (this.mScaleMode === StageScaleMode.FIXED) {
      return this.mStageHeight;
    }

    return Black.instance.viewport.size.height * this.scaleFactor;
  }

  get isLandscape() {
    let size = Black.instance.viewport.size;
    return size.width >= size.height;
  }

  get isPortrait() {
    return !this.isLandscape;
  }

  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    return outRect.set(0, 0, this.width, this.height);
  }

  onGetLocalBounds() {
    throw new Error();
  }

  set scaleX(value) { Debug.error('Not allowed.'); }
  set scaleY(value) { Debug.error('Not allowed.'); }

  set pivotX(value) { Debug.error('Not allowed.'); }
  set pivotY(value) { Debug.error('Not allowed.'); }

  set anchorX(value) { Debug.error('Not allowed.'); }
  set anchorY(value) { Debug.error('Not allowed.'); }

  set x(value) { Debug.error('Not allowed.'); }
  set y(value) { Debug.error('Not allowed.'); }

  set rotation(value) { Debug.error('Not allowed.'); }

  set width(value) { Debug.error('Not allowed.'); }
  set height(value) { Debug.error('Not allowed.'); }

  set name(value) { Debug.error('Not allowed.'); }
}

/**
 * A blend mode enum.
 * @cat drivers
 * @enum {string}
 */
/* @echo EXPORT */
var StageScaleMode = {
  NORMAL: 'normal',
  NO_SCALE: 'noScale',
  FIXED: 'fixed'
};