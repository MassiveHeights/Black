import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle life value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class InitialLife extends Modifier {
  /**
   * Creates new InitialLife instance.
   *
   * @param {...(number|FloatScatterBase)} values Min and max values in seconds.
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
    particle.life = this.scatter.getValue();
  }
}