import { Modifier } from "../Modifier";
import { ColorScatter } from "../../scatters/ColorScatter";

/**
 * Sets initial particle color value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class InitialColor extends Modifier {
  /**
   * Creates new InitialLife instance.
   *
   * @param {...(number|black-engine~ColorScatterBase)} values Two color values.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~ColorScatterBase} Modifier's object to get values from.  */
    this.scatter = ColorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.color = this.scatter.getValue();
  }
}