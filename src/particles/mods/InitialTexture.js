import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets initial particle texture.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class InitialTexture extends Modifier {
  /**
   * Creates new InitialTexture instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max indexes from texture list.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.textureIndex = Math.round(this.scatter.getValue());
  }
}