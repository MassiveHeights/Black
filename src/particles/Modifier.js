/**
 * A base utility class used by particle systems. Must be extended.
 *
 * @cat particles
 */
export class Modifier {
  /**
   * Creates new instance.
   *
   * @param {boolean} isInitializer Indicates whenever this modifier will be applied to particle during initialization stage or particle lifetime.
   */
  constructor(isInitializer = true) {
    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsInitializer = isInitializer;

    /** 
     * Modifier's object to get values from. 
     * @type {Scatter}
     */
    this.scatter = null;

    /**
     * Indicates whenever this modifier is active or not.
     * @type {boolean}
     */
    this.isActive = true;
  }

  /**
   * Called on each Emitter's update before `Modifier.update`
   *
   * @protected
   * @param {number} dt Time since last update.
   * @return {void}
   */
  preUpdate(dt) { }

  /**
   * Called on each Emitter's update for each particle.
   *
   * @protected
   * @param {Emitter} emitter Emitter this modifier attached to.
   * @param {Particle} particle Instance of `Particle`.
   * @param {number} dt Time since last update.
   * @return {void}
   */
  update(emitter, particle, dt) { }

  /**
   * Called on each Emitter's update after `Modifier.update`
   *
   * @protected
   * @param {number} dt Time since last update.
   * @return {void}
   */
  postUpdate(dt) { }

  /**
   * Specifies if the modifier is initializer or action.
   *
   * @readonly
   * @returns {boolean}
   */
  get isInitializer() {
    return this.mIsInitializer;
  }
}