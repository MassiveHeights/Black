/**
 * Sets particle's scale value according to its energy value.
 *
 * @cat particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class ScaleOverLife extends Action {
  /**
   * Creates new ScaleOverTime instance.
   *
   * @param {...(number)|FloatScatter} values A starting and ending values of scale property.
   */
  constructor(...values) {
    super();

    /**
     * @private
     * @type {...(number)|FloatScatter}
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
