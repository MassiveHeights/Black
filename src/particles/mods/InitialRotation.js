import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle rotation value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class InitialRotation extends Modifier {
  /**
   * Creates new InitialRotation instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max values in radians.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = this.scatter.getValue();
  }
}
