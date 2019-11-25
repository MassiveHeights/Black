import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets particle's rotation value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class RotationOverLife extends Modifier {
  /**
   * Creates new RotationOverLife instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values A starting and ending values of alpha property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = this.scatter.getValueAt(particle.energy);
  }
}
