/**
 * Sets particle's texture.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class RandomTexture extends Initializer {
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
    particle.textureIndex = ~~this.scatter.getValue();
  }
}
