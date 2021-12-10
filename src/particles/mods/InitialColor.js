import { Modifier } from "../Modifier";
import { ColorScatter } from "../../scatters/ColorScatter";

/**
 * Sets initial particle color value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class InitialColor extends Modifier {
  /**
   * Creates new InitialLife instance.
   *
   * @param {...(number|ColorScatterBase)} values Two color values.
   */
  constructor(...values) {
    super();

    /** @type {ColorScatterBase} Modifier's object to get values from.  */
    this.scatter = ColorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.color = this.scatter.getValue();
  }
}