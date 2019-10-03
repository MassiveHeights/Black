import { Modifier } from "../Modifier";
import { VectorScatter } from "../../scatters/VectorScatter";

/**
 * Sets initial particle position.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class InitialPosition extends Modifier {
  /**
   * Creates new InitialPosition instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values Rectangle coordinates, its width and height.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    let v = this.scatter.getValue();
    particle.x = v.x;
    particle.y = v.y;
  }
}