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
   * @param {FloatScatter} floatScatter The min-max range for starting rotation.
   */
  constructor(floatScatter) {
    super();

    /**
     * The min-max range for starting rotation
     * @type {FloatScatter}
     */
    this.scatter = floatScatter;
  }

  /**
   * @inheritDoc
   * @override
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    particle.r = this.scatter.getValue();
  }
}
