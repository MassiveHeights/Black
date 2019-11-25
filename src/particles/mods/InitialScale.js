import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle scale value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class InitialScale extends Modifier {
  /**
   * Creates new InitialScale instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max values.
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
    particle.scaleX = particle.scaleY = this.scatter.getValue();
  }
}
