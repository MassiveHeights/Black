/**
 * Sets particle's rotation value according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class RotationOverLife extends Action {
  constructor(floatScatter) {
    super();

    /**
     * @private
     * @type {FloatScatter}
     */
    this.mScatter = floatScatter;
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
    particle.r = this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines rotation value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}
