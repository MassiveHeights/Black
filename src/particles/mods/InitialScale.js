import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle scale value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class InitialScale extends Modifier {
  /**
   * Creates new InitialScale instance.
   *
   * @param {...(number|FloatScatterBase)} values Min and max values.
   */
  constructor(...values) {
    super();

    /** @type {FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.scaleX = particle.scaleY = this.scatter.getValue();
  }
}
