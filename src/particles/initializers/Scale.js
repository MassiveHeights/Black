/**
 * Sets particle's starting scale.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Scale extends Initializer {
  /**
   * Creates new Scale instance.
   *
   * @param {...(number)|FloatScatter} floatScatter The min-max range for starting scale.
   */
  constructor(...values) {
    super();

    /**
     * The min-max range for starting scale.
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
    particle.scale = this.scatter.getValue();
  }
}
