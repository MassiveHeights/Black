/**
 * Sets particle's starting velocity.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Velocity extends Initializer {
  /**
   * Creates new Velocity instance.
   *
   * @param {...(number)|VectorScatter} values The min-max range for starting velocity.
   */
  constructor(...values) {
    super();

    /**
     * The min-max range for starting velocity.
     * @type {...(number)|VectorScatter}
     */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   * @param {Particle} particle
   *
   * @return {void}
   */
  initialize(particle) {
    // TODO: optimize!
    let v = this.scatter.getValue();
    particle.vx = v.x;
    particle.vy = v.y;
  }
}
