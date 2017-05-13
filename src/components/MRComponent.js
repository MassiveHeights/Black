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

    Black.instance.viewport.on('resize', this.__onResize, this);
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

    /** @type {number} */
    let scaleX = size.width / this.mWidth;

    /** @type {number} */
    let scaleY = size.height / this.mHeight;

    this.mScale = Math.min(scaleX, scaleY);
    this.mInvScale = 1 / this.mScale;

    this.gameObject.scaleX = this.gameObject.scaleY = this.mScale;
    this.gameObject.x = (size.width / 2) - (this.mWidth / 2) * this.mScale;
    this.gameObject.y = (size.height / 2) - (this.mHeight / 2) * this.mScale;
  }

  onAdded() {
    this.updateLayout();
  }
}
