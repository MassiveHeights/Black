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
   * @param {VectorScatter} vectorScatter The min/max range.
   */
  constructor(vectorScatter) {
    super();

    /**
     * The min-max range for position distribution.
     * @type {VectorScatter}
     */
    this.scatter = vectorScatter;
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
