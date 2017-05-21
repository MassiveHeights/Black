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
   * @param {number} mass The mass.
   */
  constructor(mass) {
    super();

    /**
     * The mass value.
     * @type {number}
     */
    this.mass = mass;
  }

  /**
   * @inheritDoc
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.mass = this.mass;
  }
}
