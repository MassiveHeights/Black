/**
 * Basic multi resolution utility component. Resizes an GameObject to match desired resolution.
 *
 * @cat components
 * @extends Component
 */
/* @echo EXPORT */
class MRComponent extends Component {
  /**
   * Creates new instance of MRComponent. Used to scale and position GameObject to a specified width and height.
   * Simplified version of scale manager.
   *
   * @param {number} [width=960]  The width.
   * @param {number} [height=640] The height.
   */
  constructor(width = 960, height = 640) {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mWidth = width;

    /**
     * @private
     * @type {number}
     */
    this.mHeight = height;

    /**
     * @private
     * @type {number}
     */
    this.mScale = 0;

    /**
     * @private
     * @type {number}
     */
    this.mInvScale = 0;

    /**
     * @private
     * @type {number}
     */
    this.mAspect = 0;

    let size = Black.instance.viewport.size;
    this.mCacheWidth = size.width;
    this.mCacheHeight = size.height;

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  onUpdate() {
    // TODO: performance wise
    let size = Black.instance.viewport.size;

    if (this.mCacheWidth !== size.width || this.mCacheHeight !== size.height)
      this.setSize(this.mWidth, this.mHeight);
  }

  __onResize(msg, rect) {
    this.setSize(this.mWidth, this.mHeight);
  }

  /**
   * Sets size of the latout.
   *
   * @param  {number} width = 960  The width.
   * @param  {number} height = 640 The height.
   * @return {void}
   */
  setSize(width = 960, height = 640){
    this.mWidth = width;
    this.mHeight = height;

    this.updateLayout();

    this.post('~resize', this.isLandscape);
  }

  /**
   * Updates layout to match specified settings.
   *
   * @return {void}
   */
  updateLayout() {
    if (!this.gameObject)
      return;

    /** @type {Rectangle} */
    let size = Black.instance.viewport.size;
    let width = this.mWidth;
    let height = this.mHeight;

    if (size.width <= size.height) {
      width = this.mHeight;
      height = this.mWidth;
    }

    /** @type {number} */
    let scaleX = size.width / width;

    /** @type {number} */
    let scaleY = size.height / height;

    this.mScale = Math.min(scaleX, scaleY);
    this.mInvScale = 1 / this.mScale;

    this.gameObject.scaleX = this.gameObject.scaleY = this.mScale;
    this.gameObject.x = (size.width / 2) - (width / 2) * this.mScale;
    this.gameObject.y = (size.height / 2) - (height / 2) * this.mScale;
  }

  onAdded() {
    this.updateLayout();
  }

  get isLandscape() {
    let size = Black.instance.viewport.size;
    return size.width >= size.height;
  }

  get isPortrait() {
    return !this.isLandscape;
  }
}
