/**
 * Sets starting particle's position.
 *
 * @cat particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Position extends Initializer {
  /**
   * Creates new Position instance.
   *
   * @param {...(number)|VectorScatter} values The min/max range.
   */
  constructor(...values) {
    super();

    /**
     * The min-max range for position distribution.
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
    particle.x = v.x;
    particle.y = v.y;
  }
}
