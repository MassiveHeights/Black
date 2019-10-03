import { Modifier } from "../Modifier";
import { FloatScatter } from "../../scatters/FloatScatter";

/**
 * Sets particle's texture according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
export class TextureOverLife extends Modifier {
  /**
   * Creates new TextureOverLife instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values A starting and ending values of textureIndex property.
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
    particle.textureIndex = Math.round(this.scatter.getValueAt(particle.energy));
  }
}
