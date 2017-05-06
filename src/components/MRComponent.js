/* @echo EXPORT */
class MRComponent extends Component {

  /**
   * constructor - Description
   *
   * @param {number} [width=960]  Description
   * @param {number} [height=640] Description
   */
  constructor(width = 960, height = 640) {
    super();

    /** @type {number} */
    this.mWidth = width;

    /** @type {number} */
    this.mHeight = height;

    /** @type {number} */
    this.mScale = 0;

    /** @type {number} */
    this.mInvScale = 0;

    /** @type {number} */
    this.mAspect = 0;

    Black.instance.viewport.on('resize', this.__onResize, this);
  }

  __onResize(msg, rect) {
    this.setSize(this.mWidth, this.mHeight);
  }

  /**
   * setSize - description
   *
   * @param  {number} width = 960  description
   * @param  {number} height = 640 description
   * @return {void}              description
   */
  setSize(width = 960, height = 640){
    this.mWidth = width;
    this.mHeight = height;

    this.updateLayout();
  }

  /**
   * updateLayout - description
   *
   * @return {void}  description
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

  onAdded(){
    this.updateLayout();
  }

  onRemoved(){
  }

  onUpdate(){
  }
}
