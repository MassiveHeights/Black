/**
 * Sets particle's starting scale.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Scale extends Initializer {
  /**
   * Creates new Scale instance.
   *
   * @param {FloatScatter} floatScatter The min-max range for starting scale.
   */
  constructor(floatScatter) {
    super();

    /**
     * The min-max range for starting scale.
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
    particle.scale = this.scatter.getValue();
  }
}
