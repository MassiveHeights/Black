import { Modifier } from "../Modifier";
import { ColorScatter } from "../../scatters/ColorScatter";

/**
 * Sets particle's color value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class ColorOverLife extends Modifier {
  /**
   * Creates new ColorOverLife instance.
   *
   * @param {...(number|black-engine~ColorScatterBase)} values A starting and ending values of color property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~ColorScatterBase} Modifier's object to get values from.  */
    this.scatter = ColorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.color = this.scatter.getValueAt(particle.energy);
  }
}
