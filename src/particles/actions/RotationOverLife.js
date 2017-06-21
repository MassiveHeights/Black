/**
 * Sets particle's rotation value according to its energy value.
 *
 * @cat particles.actions
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
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
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
