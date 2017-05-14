/**
 * Adds acceleration to particles along given direction.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class Acceleration extends Action {
  /**
   * Creates new Acceleration instance.
   *
   * @param {VectorScatter} vectorScatter An VectorScatter which defines acceleration direction.
   */
  constructor(vectorScatter) {
    super();

    /**
     * @private
     * @type {VectorScatter}
     */
    this.mScatter = vectorScatter;
  }

  /**
   * @ignore
   * @override
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {
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
