/**
 * This component will allow you to subscribe for some input messages.
 *
 * @cat input
 * @extends Component
 */
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
    this.mPointerInDispatched = false;
  }
}
