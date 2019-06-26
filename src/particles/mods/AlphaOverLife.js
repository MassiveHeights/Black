import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets particle's alpha value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class AlphaOverLife extends Modifier {
  /**
   * Creates new AlphaOverLife instance.
   *
   * @param {...(number|FloatScatter)} values A starting and ending values of alpha property.
   */
  constructor(...values) {
    super(false);

    /** @type {FloatScatter} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.alpha = this.scatter.getValueAt(particle.energy);
  }
}
