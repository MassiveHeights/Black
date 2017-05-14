/**
 * Sets particle's starting velocity.
 *
 * @category particles.initializers
 * @extends Initializer
 * @class
 */
/* @echo EXPORT */
class Velocity extends Initializer {
  /**
   * constructor - Description
   *
   * @param {VectorScatter} vectorScatter Description
   *
   * @return {void} Description
   */
  constructor(vectorScatter) {
    super();

    /** @type {VectorScatter} */
    this.scatter = vectorScatter;
  }

  /**
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
