import { Modifier } from "../Modifier";
import { VectorScatter } from "../../scatters/VectorScatter";

/**
 * Sets initial particle velocity vector.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
export class InitialVelocity extends Modifier {
  /**
   * Creates new InitialVelocity instance.
   *
   * @param {...(number|VectorScatterBase)} values Min and max vectors.
   */
  constructor(...values) {
    super();

    /** @type {VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValue();

    particle.vx = this.scatter.value.x;
    particle.vy = this.scatter.value.y;
  }
}
