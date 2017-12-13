/**
 * Sets particle's default rotation.
 *
 * @cat particles.initializers
 * @extends Initializer
 */
/* @echo EXPORT */
class Rotation extends Initializer {
  /**
   * Creates new Rotation instance.
   *
   * @param {...(number|FloatScatter)} values The min/max range.
   */
  constructor(...values) {
    super();

    /**
     * The min-max range.
     * @type {...(number|FloatScatter)}
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
    particle.r = this.scatter.getValue();
  }
}
