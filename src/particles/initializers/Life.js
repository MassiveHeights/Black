/**
 * Sets starting particle's life.
 *
 * @cat particles.initializers
 * @extends Initializer
 */
/* @echo EXPORT */
class Life extends Initializer {
  /**
   * Creates new LIfe instance.
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
    particle.life = this.scatter.getValue();
  }
}
