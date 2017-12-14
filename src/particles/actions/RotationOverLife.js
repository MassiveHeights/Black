/**
 * Sets particle's rotation value according to its energy value.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class RotationOverLife extends Action {
  /**
   * Creates new RotationOverLife instance.
   *
   * @param {...(number|FloatScatter)} values A starting and ending values of alpha property.
   */
  constructor(...values) {
    super();

    /**
     * @private
     * @type {...(number|FloatScatter)}
     */
    this.mScatter = FloatScatter.fromObject(...values);
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
