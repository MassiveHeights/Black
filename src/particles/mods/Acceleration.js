import { Modifier } from "../Modifier";
import { VectorScatter } from "../../scatters/VectorScatter";

/**
 * Adds acceleration to particles along given direction.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class Acceleration extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values An VectorScatterBase which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /** 
     * @type {black-engine~VectorScatterBase} Modifier's object to get values from.
     */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValue();
    
    particle.ax += this.scatter.value.x;
    particle.ay += this.scatter.value.y;
  }
}
