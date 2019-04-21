import { Modifier } from "../Modifier";
import { ColorScatter } from "../../scatters/ColorScatter";

/**
 * Sets particle's color value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class ColorOverLife extends Modifier {
  /**
   * Creates new ColorOverLife instance.
   *
   * @param {...(number|ColorScatter)} values A starting and ending values of color property.
   */
  constructor(...values) {
    super(false);

    /** @type {ColorScatter} Modifier's object to get values from.  */
    this.scatter = ColorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.color = this.scatter.getValueAt(particle.energy);
  }
}
