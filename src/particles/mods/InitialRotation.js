import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle rotation value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class InitialRotation extends Modifier {
  /**
   * Creates new InitialRotation instance.
   *
   * @param {...(number|FloatScatter)} values Min and max values in radians.
   */
  constructor(...values) {
    super();

    /** @type {FloatScatter} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = this.scatter.getValue();
  }
}
