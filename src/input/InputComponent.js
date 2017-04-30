/* @echo EXPORT */
class InputComponent extends Component {
  /**
   * @return {void}
   */
  constructor() {
    super();

    /** @type {boolean} */
    this.touchable = true;

    /* INTERNAL */

    /** @type {boolean} */
    this.mPointerInside = false;
  }
}
