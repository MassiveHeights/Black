import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets particle's scale value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class ScaleOverLife extends Modifier {
  /**
   * Creates new ScaleOverTime instance.
   *
   * @param {...(number|FloatScatterBase)} values A starting and ending values of scale property.
   */
  constructor(...values) {
    super(false);

    /** @type {FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.scaleX = particle.scaleY = this.scatter.getValueAt(particle.energy);
  }
}
