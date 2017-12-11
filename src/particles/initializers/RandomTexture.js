/**
 * Sets particle's texture.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class RandomTexture extends Initializer {
  /**
   * Creates new RandomTexture instance.
   *
   * @param {...(number)|FloatScatter} values The min/max range.
   */
  constructor(...values) {
    super();

    /**
     * The float scatter defines the index of the texture. All values will be
     * rounded.
     * 
     * @type {...(number)|FloatScatter}
     */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.textureIndex = Math.round(this.scatter.getValue());
  }
}
