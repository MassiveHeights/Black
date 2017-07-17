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
   * @param {FloatScatter} floatScatter The min/max range.
   */
  constructor(floatScatter) {
    super();

    /**
     * The min-max range.
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
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
