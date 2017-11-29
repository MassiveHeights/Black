/**
 * Adds acceleration to particles along given direction.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class Acceleration extends Action {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number)|VectorScatter} values An VectorScatter which defines acceleration direction.
   */
  constructor(...values) {
    super();

    /**
     * @private
     * @type {...(number)|VectorScatter}
     */
    this.mScatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    let v = this.mScatter.getValue();
    
    particle.ax += v.x;
    particle.ay += v.y;
  }

  /**
   * Returns VectorScatter object that defines acceleration direction.
   * @member {VectorScatter}
   * @return {VectorScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}
