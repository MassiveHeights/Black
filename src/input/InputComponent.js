import { Component } from "../core/Component";

/**
 * This component will allow you to subscribe for some input messages.
 *
 * @cat input
 * @extends black-engine~Component
 */
export class InputComponent extends Component {
  /**
   * @return {void}
   */
  constructor() {
    super();

    /** @type {boolean} Specifies whether the component is active. */
    this.touchable = true;

    /* INTERNAL */
    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.mPointerInDispatched = false;
  }
}
