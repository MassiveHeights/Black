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
   * @param {VectorScatter} vectorScatter The min-max range for starting velocity.
   */
  constructor(vectorScatter) {
    super();

    /**
     * The min-max range for starting velocity.
     * @type {VectorScatter}
     */
    this.scatter = vectorScatter;
  }

  /**
   * @inheritdoc
   * @override
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
