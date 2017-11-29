/**
 * Sets starting particle's mass.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Mass extends Initializer {
  /**
   * Creates new Mass instance.
   *
   * @param {...(number)|FloatScatter} values The min/max range.
   */
  constructor(...values) {
    super();

    /**
     * The min-max range.
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
    particle.mass = this.scatter.getValue();
  }
}
