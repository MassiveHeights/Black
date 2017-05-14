/**
 * Sets particle's mass.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Mass extends Initializer {

  /**
   * constructor - Description
   *
   * @param {number} mass Description
   *
   * @return {void} Description
   */
  constructor(mass) {
    super();

    /** @type {number} */
    this.mass = mass;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.mass = this.mass;
  }
}
