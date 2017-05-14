/**
 * Sets particle's texture according to its energy value.
 * 
 * @category particles.actions
 * @extends Action
 * @class
 */
/* @echo EXPORT */
class TextureOverLife extends Action {
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
    particle.textureIndex = ~~this.mScatter.getValueAt(particle.energy);
  }

  /**
   * Returns FloatScatter object that defines texture value over particle life.
   * @member {FloatScatter}
   * @return {FloatScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}
