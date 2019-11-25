import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle mass value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class InitialMass extends Modifier {
  /**
   * Creates new InitialMass instance.
   *
   * @param {...(number|Fblack-engine~loatScatterBase)} values Min and max values.
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
    particle.mass = this.scatter.getValue();
  }
}