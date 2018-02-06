/**
 * Basic FPS component. Shows frame rate.
 *
 * @cat components
 * @extends Component
 */
/* @echo EXPORT */
class FPSComponent extends Component  {
  constructor() {
    super();

    /**
     * @private
     * @type {TextField}
     */
    this.txtFPS = null;
  }

  /**
   * @inheritDoc
   */
  onAdded() {
    this.txtFPS = new TextField('FPS: 0');
    this.txtFPS.x = 0;
    this.txtFPS.y = 0;
    this.gameObject.addChild(this.txtFPS);
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    this.txtFPS.text = 'FPS: ' + Black.instance.FPS;
  }
}
