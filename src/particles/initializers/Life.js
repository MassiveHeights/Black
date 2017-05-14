/**
 * Sets particle's life.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Life extends Initializer {
  /**
   * constructor - Description
   *
   * @param {FloatScatter} floatScatter Description
   *
   * @return {void} Description
   */
  constructor(floatScatter) {
    super();

    /** @type {FloatScatter} */
    this.scatter = floatScatter;
  }

  /**
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.life = this.scatter.getValue();
  }
}
