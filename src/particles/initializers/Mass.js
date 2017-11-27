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
   * @param {FloatScatter} floatScatter
   */
  constructor(floatScatter) {
    super();

    this.scatter = floatScatter;
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
