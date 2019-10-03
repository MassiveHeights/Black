import { Modifier } from "../Modifier";
import { VectorScatter } from "../../scatters/VectorScatter";

/**
 * Changes particle alpha according to its life.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class AnchorOverLife extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values An VectorScatterBase which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValueAt(particle.energy);

    particle.anchorX = this.scatter.value.x;
    particle.anchorY = this.scatter.value.y;
  }
}