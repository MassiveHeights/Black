/**
 * Sets particle's scale value according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class ScaleOverLife extends Action {
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
    particle.scale = this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines scale value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}
