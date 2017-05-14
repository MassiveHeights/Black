/**
 * Sets particle's default rotation.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Rotation extends Initializer {
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
    particle.r = this.scatter.getValue();
  }
}
